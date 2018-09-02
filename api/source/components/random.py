from os import urandom
from random import SystemRandom
from binascii import hexlify
from random import shuffle

from base import Component


class Random(Component):
    def choose(self, sequence, length=None):
        length = len(sequence) if length is None else length
        if length > 0:
            return sequence[self.number(length)]
        return None

    def number(self, limit):
        return SystemRandom().randint(0, limit - 1)

    def roll(self, percent):
        return SystemRandom().random() < percent

    def shuffle(self, sequence):
        shuffle(sequence)
        return sequence

    def salt(self):
        return hexlify(urandom(64))
