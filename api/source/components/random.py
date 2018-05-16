from os import urandom
from random import SystemRandom
from binascii import hexlify

from base import Component


class Random(Component):
    def number(self, limit):
        return SystemRandom().randint(0, limit - 1)

    def roll(self, percent):
        return SystemRandom().random() < percent

    def salt(self):
        return hexlify(urandom(32))
