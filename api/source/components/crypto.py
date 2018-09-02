from functools import reduce
from base64 import b64encode, b64decode
from binascii import a2b_hex
from Crypto.Cipher import AES

from base import Component


class Crypto(Component):
    KEY_SIZE = 32

    def encrypt(self, key, data):
        data = self.__pad(data)
        key = self.__merge(key)
        iv = a2b_hex(self.__iv(key))
        key = a2b_hex(key)
        cipher = AES.new(key, AES.MODE_CBC, iv, segment_size=128)
        data = cipher.encrypt(data)
        data = b64encode(data)
        return data.decode('utf-8')

    def decrypt(self, key, data):
        key = self.__merge(key)
        iv = a2b_hex(self.__iv(key))
        key = a2b_hex(key)
        data = b64decode(data)
        cipher = AES.new(key, AES.MODE_CBC, iv, segment_size=128)
        data = cipher.decrypt(data)
        return self.__unpad(data)

    @staticmethod
    def __merge(key, size=4):
        chunks = [
            int(key[i:i+size], 16)
            for i in range(0, len(key), size)
        ]
        while len(chunks) > Crypto.KEY_SIZE / size:
            for i in range(0, int(len(chunks) / 2)):
                chunks[i] = chunks[i * 2] ^ chunks[i * 2 + 1]
            chunks = chunks[:int(len(chunks) / 2)]
        return reduce(
            lambda accum, chunk: accum + hex(chunk)[2:],
            chunks,
            '',
        )[:Crypto.KEY_SIZE].ljust(Crypto.KEY_SIZE, 'f')

    @staticmethod
    def __iv(key):
        return key[::-1][:Crypto.KEY_SIZE]

    @staticmethod
    def __pad(data, size=16):
        length = len(data)
        padsize = size - (length % size)
        return data.ljust(length + padsize, chr(padsize))

    @staticmethod
    def __unpad(data, size=16):
        return data[:len(data) - data[-1]]
