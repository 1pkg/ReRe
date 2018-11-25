from .base_case import BaseCase

from actions import Handshake


class HandshakeCase(BaseCase):
    def test_bad_alias(self):
        return NotImplemented

    def test_bad_uuid(self):
        return NotImplemented

    def test_bad_digest(self):
        return NotImplemented

    def test_bad_device(self):
        return NotImplemented

    def test_bad_user_agent(self):
        return NotImplemented

    def test_bad_user_ip(self):
        return NotImplemented

    def test_new_account(self):
        return NotImplemented

    def test_existed_account(self):
        return NotImplemented

    def test_freebie_gift(self):
        return NotImplemented

    def test_overwhelm(self):
        return NotImplemented
