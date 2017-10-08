"""
initalize effects
"""

from yoyo import step

__depends__ = {'20170911_01_GGaYi-initialalize-structure'}

steps = [
        step(
            """
              INSERT INTO effect (name) VALUES
              ('bleached'), ('bloom'), ('blur-horizontal'), ('blur-vertical'), ('crosshatch'), ('funnel'),
              ('pixelation'), ('ripple'), ('sepia'), ('wave-horizontal'), ('wave-vertical');
            """
        )
]
