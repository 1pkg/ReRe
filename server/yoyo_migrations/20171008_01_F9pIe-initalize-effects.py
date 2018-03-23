"""
initalize effects
"""

from yoyo import step

__depends__ = {}

steps = [
    step(
        """
          INSERT INTO effect (name) VALUES
          ('bleached'), ('bloom'), ('blur-horizontal'),
          ('blur-vertical'), ('crosshatch'), ('funnel'),
          ('pixelation'), ('ripple'), ('sepia'),
          ('wave-horizontal'), ('wave-vertical');
        """
    )
]
