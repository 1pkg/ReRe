"""
initialize settings
"""

from yoyo import step

__depends__ = {'20170911_01_GGaYi-initialalize-structure'}

steps = [
    step(
        """
          INSERT INTO setting (name, value) VALUES
          ('option-count', '3'), ('effect-count', '3'),
          ('session-expire', '3600'), ('identity-expire', '30'),
          ('identity-secret-key', 'key');
        """
    )
]
