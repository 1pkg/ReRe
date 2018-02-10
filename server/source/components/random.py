import random

from base import Component


class Random(Component):
    def number(self, limit):
        return random.SystemRandom().randint(0, limit - 1)

    def roll(self, percent):
        return random.SystemRandom().random() < percent
