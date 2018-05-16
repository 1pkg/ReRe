from base64 import b64encode, b64decode
from binascii import a2b_hex
from Crypto.Cipher import AES

from base import Component


class Crypto(Component):
    def encrypt(self, key, data):
        data = self.__pad(data)
        iv = a2b_hex(self.__iv(key))
        key = a2b_hex(key)
        cipher = AES.new(key, AES.MODE_CBC, iv, segment_size=128)
        data = cipher.encrypt(data)
        data = b64encode(data)
        return data.decode('utf-8')

    def decrypt(self, key, data):
        iv = a2b_hex(self.__iv(key))
        key = a2b_hex(key)
        data = b64decode(data)
        cipher = AES.new(key, AES.MODE_CBC, iv, segment_size=128)
        data = cipher.decrypt(data)
        return self.__unpad(data)

    @staticmethod
    def __iv(key, size=32):
        return key[::-1][:size]

    @staticmethod
    def __pad(data, size=16):
        length = len(data)
        padsize = size - (length % size)
        return data.ljust(length + padsize, chr(padsize))

    @staticmethod
    def __unpad(data, size=16):
        return data[:len(data) - data[-1]]
