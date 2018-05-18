from os import path
from re import sub


def __parse(shader):
    filename = path.join(path.dirname(__file__), f'{shader}.frag')
    with open(filename, 'r') as frag:
        frag = frag.read().strip().replace('\n', ' ')
        frag = sub('\s+', ' ', frag)
        return {'frag': frag}


def compose(name, shader, uniform):
    return {
        'name': name,
        'shader': __parse(shader),
        'uniform': uniform,
    }
