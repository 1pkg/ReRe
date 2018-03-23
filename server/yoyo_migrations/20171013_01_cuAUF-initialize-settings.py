"""
initialize settings
"""

from yoyo import step

__depends__ = {}

steps = [
    step(
        """
          INSERT INTO setting (name, value) VALUES
          ('option-count', '3'), ('effect-count', '3'),
          ('choose-period', '30'), ('identity-secret-key', '');
        """
    )
]
