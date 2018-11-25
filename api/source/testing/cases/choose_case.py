from .base_case import BaseCase

from actions import Choose


class ChooseCase(BaseCase):
    def test_bad_option(self):
        return NotImplemented

    def test_choose_wrong_result(self):
        return NotImplemented

    def test_choose_correct_result(self):
        return NotImplemented
