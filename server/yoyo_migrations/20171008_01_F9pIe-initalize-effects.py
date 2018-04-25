import json
from yoyo import step

import sys
import os
sys.path.insert(0, os.path.abspath('shaders'))

from composer import compose

__depends__ = {}


def steps(conn):
    cursor = conn.cursor()
    for shader in [
        compose('brighter', 'brightness', {
            'scale': 0.5,
        }),
        compose('darker', 'brightness', {
            'scale': -0.5,
        }),
        compose('inverse', 'inverse', {}),
        compose('sepia', 'sepia', {}),
        compose('bleached', 'saturation', {
            'saturation': 0.0,
        }),
        compose('oversaturated', 'saturation', {
            'saturation': 25.0,
        }),
        compose('posterize', 'posterize', {}),
        compose('blur-horizontal', 'blur', {
            'orientation': True,
            'iterations': 50.0,
            'sigma': 10.0,
        }),
        compose('blur-vertical', 'blur', {
            'orientation': False,
            'iterations': 50.0,
            'sigma': 10.0,
        }),
        compose('wave-horizontal', 'wave', {
            'orientation': True,
            'frequency': 50,
            'amplitude': 0.25,
        }),
        compose('wave-vertical', 'wave', {
            'orientation': False,
            'frequency': 50,
            'amplitude': 0.25,
        }),
        compose('ripple', 'ripple', {
            'frequency': 25,
            'amplitude': 0.1,
        }),
        compose('funnel', 'funnel', {}),
        compose('pixelation', 'pixelation', {
            'scale': 10.0,
        }),
        compose('crosshatch', 'crosshatch', {}),
        compose('fisheye', 'fisheye', {
            'scale': 0.25,
        }),
        compose('emboss', 'emboss', {}),
        compose('twist', 'twist', {
            'rotation': 4.0,
        }),
        compose('tornado', 'twist', {
            'rotation': 8.0,
        }),
    ]:
        cursor.execute('''
            INSERT INTO effect (name, shader, uniform) VALUES
            ('{}', '{}', '{}')
        '''.format(
            shader['name'],
            json.dumps(shader['shader']),
            json.dumps(shader['uniform']),
        ))


step(steps)
