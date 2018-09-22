from hashlib import blake2b, sha3_512

from base import Component


class Hash(Component):
    NORMAL_DIGEST = 64
    VIEW_DIGEST = 4

    def hex(self, size, *args):
        if size == self.NORMAL_DIGEST:
            hexhash = sha3_512()
        else:
            hexhash = blake2b(digest_size=size)
        for arg in args:
            hexhash.update(str(arg).encode('utf-8'))
        return hexhash.hexdigest()
