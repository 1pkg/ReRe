from hashlib import blake2b

from base import Component


class Hash(Component):
    LONG_DIGEST = 16
    SHORT_DIGEST = 4

    def hex(self, size, *args):
        hexhash = blake2b(digest_size=size)
        for arg in args:
            hexhash.update(str(arg).encode('utf-8'))
        return hexhash.hexdigest()
