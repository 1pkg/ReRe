from urllib import request
from hashlib import blake2b
import datetime
import random
import os


class Image:
    @staticmethod
    def fetch(url):
        ext = url.split('.')[-1]
        if (ext != 'png' and ext != 'jpeg' and ext != 'jpg'):
            return None

        print("Image Fetch {0}".format(url))
        dir = os.path.abspath(
            os.path.join(
                __file__, '..', '..', 'dump', 'images'
            )
        )
        timestamp = datetime.datetime.today().timestamp()
        hash = blake2b()
        hash.update(str(timestamp).encode('utf-8'))
        hash.update(str(random.getrandbits(128)).encode('utf-8'))
        fileName = hash.hexdigest() + '.' + url.split('.')[-1]
        file = open(os.path.join(dir, fileName), 'wb')
        file.write(request.urlopen(url).read())
        file.close()
        return fileName
