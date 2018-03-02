from binascii import hexlify
from os import path, urandom
from io import BytesIO
from PIL import Image as PImage

from base import Fetcher, Constants
from .proxy import Proxy


class Image(Fetcher):
    def __init__(self, logger):
        super().__init__(logger, False)
        self.__dir = path.join(Constants.DUMP_PATH, 'images')
        self.__proxy = Proxy(logger, False)

    def fetch(self, htype, query, params={}):
        try:
            self._logger.info('''
                image start fetching from {0}
            '''.format(query))
            if htype == self.TYPE_GET:
                response = self.__proxy.fetch(htype, query)
                image = PImage.open(BytesIO(response))
            else:
                raise Exception('''
                    image doesn\'t supply htype {0}
                '''.format(htype))
            width, height = image.size
            self._logger.info('''
                fetching done successfully
            ''')
            self._logger.info('''
                image size {0} x {1}
            '''.format(width, height))
        except Exception as exception:
            self._logger.error(str(exception))
            return None

        if (not self.__check(image)):
            self._logger.warning('''
                image doesn't pass check
            ''')
            return None
        else:
            return {'url': query, 'file': self.__save(image)}

    def __check(self, image):
        width, height = image.size
        return \
            width > 256 and height > 256 and \
            width < 4096 and height < 4096 and \
            (width / height) < 5.0 and (height / width) < 5.0

    def __save(self, image):
        width, height = image.size
        newWidth = 1024
        percent = (newWidth / float(width))
        newHeight = int((float(height) * float(percent)))
        image = image.resize((newWidth, newHeight), PImage.ANTIALIAS)

        fileName = hexlify(urandom(16)).decode() + '.png'
        fullName = path.join(self.__dir, fileName)
        while path.isfile(fullName):
            fileName = hexlify(urandom(16)).decode() + '.png'
            fullName = path.join(self.__dir, fileName)

        image.save(path.join(self.__dir, fileName), 'PNG')
        self._logger.info('''
            image saved as {0}
        '''.format(fileName))
        return fileName
