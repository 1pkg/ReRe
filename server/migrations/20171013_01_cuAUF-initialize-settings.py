"""
initialize settings
"""

from yoyo import step

__depends__ = {'20170911_01_GGaYi-initialalize-structure'}

steps = [
    step(
        """
          INSERT INTO setting (name, value) VALUES
          ('assists-count', '2'), ('options-count', '3'), ('effects-count', '3'),
          ('timestamp-duration', '30');
        """
    )
]
