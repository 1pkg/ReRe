from binascii import hexlify
from os import path, urandom
from io import BytesIO
from PIL import ImageFile, Image as PImage

from base import Fetcher, Constants
from .plain import Plain


class Image(Fetcher):
    DESIRE_WIDTH = 1366
    DESIRE_HEIGHT = 768

    MAX_DISPROPORTION = 5.0
    MAX_SIZE = 8192
    MIN_SIZE = 256

    def __init__(self, logger):
        ImageFile.LOAD_TRUNCATED_IMAGES = True
        super().__init__(logger, False)
        self.__dir = path.join(Constants.DUMP_PATH, 'images')
        self.__plain = Plain(logger, False)

    def fetch(self, htype, query, params={}):
        try:
            self._logger.info('''
                image start fetching from {0}
            '''.format(query))
            if htype == self.TYPE_GET:
                response = self.__plain.fetch(
                    self.TYPE_GET,
                    query
                )
                if response is None:
                    self._logger.warning('''
                        image get empty response
                    ''')
                    return None
                image = PImage.open(BytesIO(response.content))
            else:
                raise Exception('''
                    image doesn\'t supply htype {0}
                '''.format(htype))
            size = image.size
            self._logger.info('''
                fetching done successfully
            ''')
            self._logger.info('''
                image size {0} x {1}
            '''.format(size[0], size[1]))
        except Exception as exception:
            self._logger.error(str(exception))
            return None

        if (not self.__check(image, size)):
            self._logger.warning('''
                image doesn't pass check
            ''')
            return None
        else:
            result = self.__save(image, size)
            return {'original': query, 'link': result}

    def __check(self, image, size):
        width, height = size
        return \
            width >= self.MIN_SIZE and height >= self.MIN_SIZE and \
            width <= self.MAX_SIZE and height <= self.MAX_SIZE and \
            (width / height) < self.MAX_DISPROPORTION and \
            (height / width) < self.MAX_DISPROPORTION

    def __crop(self, image, size):
        width, height = size
        ratioWidth = self.DESIRE_WIDTH / width
        ratioHeight = self.DESIRE_HEIGHT / height
        if (ratioWidth > ratioHeight):
            newSize = (self.DESIRE_WIDTH, int(height * ratioWidth))
        else:
            newSize = (int(width * ratioHeight), self.DESIRE_HEIGHT)
        image = image.resize(newSize, PImage.ANTIALIAS)
        image = image.crop((0, 0, self.DESIRE_WIDTH, self.DESIRE_HEIGHT))
        self._logger.info('''
            image resized to {0}, than cropped
        '''.format(str(newSize)))
        return image

    def __save(self, image, size):
        image = self.__crop(image, size)
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
