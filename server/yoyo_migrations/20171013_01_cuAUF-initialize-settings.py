from binascii import hexlify
from os import urandom
from yoyo import step

__depends__ = {}

steps = [
    step(
        '''
          INSERT INTO setting (name, value) VALUES
          ('option-count', '3'), ('effect-count', '2'),
          ('choose-period', '30'), ('identity-secret-key', '{}');
        '''.format(hexlify(urandom(16)).decode())
    )
]
