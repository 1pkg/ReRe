import os
import sys
import re
import json

from yoyo import step


def parse(shadersPath, shaderFiles):
    fragShaders = {}
    for shaderFile in shaderFiles:
        path = os.path.join(shadersPath, '{}.frag'.format(shaderFile))
        with open(path, 'r') as frag:
            frag = frag.read().strip().replace('\n', ' ')
            frag = re.sub('\s+', ' ', frag)
            fragShaders[shaderFile] = {'frag': frag}
    return fragShaders


def steps(conn):
    cursor = conn.cursor()
    for shader in shaders:
        cursor.execute('''
            INSERT INTO effect (name, shader, uniform) VALUES
            ('{}', '{}', '{}')
        '''.format(
            shader['name'],
            json.dumps(shader['shader']),
            json.dumps(shader['uniform']),
        ))


currentPath = os.path.dirname(sys.argv[0])
shadersPath = os.path.join(currentPath, '..', '..', 'shaders')
fragShaders = parse(shadersPath, [
    'bloom',
    'blur',
    'crosshatch',
    'funnel',
    'pixelation',
    'ripple',
    'saturation',
    'sepia',
    'wave',
])
shaders = [
    {
        'name': 'bleached',
        'shader': fragShaders['saturation'],
        'uniform': {'factor': 0.0},
    },
    {
        'name': 'bloom',
        'shader': fragShaders['bloom'],
        'uniform': {'factor': 50.0},
    },
    {
        'name': 'blur-horizontal',
        'shader': fragShaders['blur'],
        'uniform': {'factor': 60.0, 'sigma': 20.0, 'orientation': 1},
    },
    {
        'name': 'blur-vertical',
        'shader': fragShaders['blur'],
        'uniform': {'factor': 60.0, 'sigma': 20.0, 'orientation': 0},
    },
    {
        'name': 'crosshatch',
        'shader': fragShaders['crosshatch'],
        'uniform': {},
    },
    {
        'name': 'funnel',
        'shader': fragShaders['funnel'],
        'uniform': {},
    },
    {
        'name': 'pixelation',
        'shader': fragShaders['pixelation'],
        'uniform': {'factor': 10.0},
    },
    {
        'name': 'ripple',
        'shader': fragShaders['ripple'],
        'uniform': {},
    },
    {
        'name': 'sepia',
        'shader': fragShaders['sepia'],
        'uniform': {},
    },
    {
        'name': 'wave-horizontal',
        'shader': fragShaders['wave'],
        'uniform': {'orientation': 1},
    },
    {
        'name': 'wave-vertical',
        'shader': fragShaders['wave'],
        'uniform': {'orientation': 0},
    },
]


__depends__ = {}

step(steps)
