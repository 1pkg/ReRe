import os
import re


def __parse(shader):
    path = os.path.join(os.path.dirname(__file__), '{}.frag'.format(shader))
    with open(path, 'r') as frag:
        frag = frag.read().strip().replace('\n', ' ')
        frag = re.sub('\s+', ' ', frag)
        return {'frag': frag}


def compose(name, shader, uniform):
    return {
        'name': name,
        'shader': __parse(shader),
        'uniform': uniform,
    }
