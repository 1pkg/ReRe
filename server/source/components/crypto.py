import base64
import hashlib
from Crypto import Random
from Crypto.Cipher import AES

from base import Component


class Crypto(Component):
    def encrypt(self, key, data):
        data = self.__pad(data)
        iv = Random.new().read(AES.block_size)
        key = hashlib.sha256(key.encode()).digest()
        cipher = AES.new(key, AES.MODE_CBC, iv)
        return base64.b64encode(iv + cipher.encrypt(data)).decode('ascii')

    def decrypt(self, key, data):
        data = base64.b64decode(data)
        iv = data[:AES.block_size]
        key = hashlib.sha256(key.encode()).digest()
        cipher = AES.new(key, AES.MODE_CBC, iv)
        data = cipher.decrypt(data[AES.block_size:])
        return self.__unpad(data).decode('utf-8')

    @staticmethod
    def __pad(data):
        return data + (32 - len(data) % 32) * chr(32 - len(data) % 32)

    @staticmethod
    def __unpad(data):
        return data[:-ord(data[len(data) - 1:])]
