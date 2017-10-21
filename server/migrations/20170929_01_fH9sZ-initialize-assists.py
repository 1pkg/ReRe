"""
initialize assists
"""

from yoyo import step

__depends__ = {'20170911_01_GGaYi-initialalize-structure'}

steps = [
    step(
        """
          INSERT INTO assist (name) VALUES
          ('redo'), ('infinite'), ('reduce'), ('statistic'), ('skip'), ('help');  
        """
    )
]
