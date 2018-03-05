from binascii import hexlify
from os import path, urandom
from io import BytesIO
from PIL import ImageFile, Image as PImage

from base import Fetcher, Constants
from .plain import Plain


class Image(Fetcher):
    DESIRE_WIDTH = 1366
    DESIRE_HEIGHT = 768

    MAX_DISPROPORTION = 2.0
    MAX_SIZE = 2056
    MIN_SIZE = 256

    def __init__(self, logger):
        ImageFile.LOAD_TRUNCATED_IMAGES = True
        super().__init__(logger)
        self.__dir = path.join(Constants.DUMP_PATH, 'images')
        self.__plain = Plain(logger)

    def fetch(self, htype, query, params={}):
        try:
            self._logger.info('''
                image start fetching from {0}
            '''.format(query))
            if htype == self.TYPE_GET:
                response = self.__plain.fetch(
                    self.TYPE_GET,
                    query,
                    params,
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
                image {0}
            '''.format(str(size)))
        except Exception as exception:
            self._logger.error(str(exception))
            return None

        if not self.__check(image, size):
            self._logger.warning('''
                image doesn't pass check
            ''')
            return None
        else:
            result = self.__save(image, size)
            return {
                'link': result,
                'source': query,
            }

    def __check(self, image, size):
        width, height = size
        return \
            width >= self.MIN_SIZE and height >= self.MIN_SIZE and \
            width <= self.MAX_SIZE and height <= self.MAX_SIZE and \
            (width / height) < self.MAX_DISPROPORTION and \
            (height / width) < (self.MAX_DISPROPORTION / 2.0)

    def __crop(self, image, size):
        width, height = size
        ratioWidth = self.DESIRE_WIDTH / width
        ratioHeight = self.DESIRE_HEIGHT / height
        if ratioWidth > ratioHeight:
            newSize = (self.DESIRE_WIDTH, int(height * ratioWidth))
        else:
            newSize = (int(width * ratioHeight), self.DESIRE_HEIGHT)
        image = image.resize(newSize, PImage.ANTIALIAS)
        left = int((newSize[0] - self.DESIRE_WIDTH) / 2.0)
        top = int((newSize[1] - self.DESIRE_HEIGHT) / 2.0)
        right = int((newSize[0] + self.DESIRE_WIDTH) / 2.0)
        bottom = int((newSize[1] + self.DESIRE_HEIGHT) / 2.0)
        image = image.crop((left, top, right, bottom))
        self._logger.info('''
            image resized to {0}, than cropped
        '''.format(str(newSize)))
        return image

    def __save(self, image, size):
        image = self.__crop(image, size)
        fileName = '{0}.png'.format(hexlify(urandom(16)).decode())
        fullName = path.join(self.__dir, fileName)
        while path.isfile(fullName):
            fileName = '{0}.png'.format(hexlify(urandom(16)).decode())
            fullName = path.join(self.__dir, fileName)
        image.convert('RGB').save(
            path.join(self.__dir, fileName),
            'PNG',
            optimize=True,
        )
        self._logger.info('''
            image saved as {0}
        '''.format(fileName))
        return fileName
