import requests
from datetime import datetime
from os import path, urandom
from hashlib import blake2b
from io import BytesIO
from PIL import Image as PImage

from base import Fetcher, Constants


class Image(Fetcher):
    def __init__(self, logger):
        super().__init__(logger)
        self.__dir = path.join(Constants.DUMP_PATH, 'images')

    def fetch(self, query):
        try:
            self._logger.info('image start fetching from {0}'.format(query))
            image = PImage.open(BytesIO(requests.get(query).content))
            width, height = image.size
            self._logger.info('fetching done successfully')
            self._logger.info('image size {0} x {1}'.format(width, height))
        except Exception as exception:
            self._logger.error(str(exception))
            return None

        if (not self.__check(image)):
            self._logger.warning('image doesn\'t pass check')
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

        fileName = Image.__makeImageName()
        fullName = path.join(self.__dir, fileName)
        while path.isfile(fullName):
            fileName = Image.__makeImageName()
            fullName = path.join(self.__dir, fileName)

        image.save(path.join(self.__dir, fileName), 'PNG')
        self._logger.info('image saved as {0}'.format(fileName))
        return fileName

    @staticmethod
    def __makeImageName():
        timestamp = datetime.today().timestamp()
        hash = blake2b()
        hash.update(str(timestamp).encode('utf-8'))
        hash.update(str(urandom(32)).encode('utf-8'))
        return hash.hexdigest() + '.png'
