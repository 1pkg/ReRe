import random

import base

class OptionChose(base.Action):
    def __init__(self, act):
        self.__act = act

    def _process(self, params):
        index = self.__act.chose(params['index'])
        return {'correctoption': index}
