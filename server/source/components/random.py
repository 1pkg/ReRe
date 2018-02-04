import string
import random


class Random:
    def number(self, limit):
        return random.SystemRandom().randint(0, limit - 1)

    def roll(self, percent):
        return random.SystemRandom().random() < percent

    def salt(self, size=32):
        return str(random.SystemRandom().getrandbits(size))

    def label(self, size=32):
        hexDigits = [random.SystemRandom().choice(string.hexdigits)
                     for fake in range(size)]
        return ''.join(hexDigits)
