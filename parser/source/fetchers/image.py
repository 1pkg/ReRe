from warnings import catch_warnings, filterwarnings
from binascii import hexlify
from os import path, urandom, remove
from io import BytesIO
from PIL import ImageFile, Image as PImage

from base import Fetcher
from .plain import Plain


class Image(Fetcher):
    MIN_SIDE_MEASURE = 512
    DESIRE_LARGE_MEASURE = 1920
    DESIRE_SMALL_MEASURE = 1080

    MINIMAL_FILE_SIZE = 50000
    MAXIMAL_FILE_SIZE = 1000000

    MAX_SIDE_DISPROPORTION = 2.5

    RESULT_IMAGE_QUALITY = 75

    def __init__(self, logger, path):
        ImageFile.LOAD_TRUNCATED_IMAGES = True
        ImageFile.MAXBLOCK = self.DESIRE_LARGE_MEASURE * self.DESIRE_SMALL_MEASURE
        super().__init__(logger)
        self.__dir = path
        self.__plain = Plain(logger)

    def fetch(self, htype, query, params={}):
        try:
            self._logger.info(f'image start fetching from {query}')
            if htype == self.TYPE_GET:
                response = self.__plain.fetch(
                    self.TYPE_GET,
                    query,
                    params,
                )
                if response is None:
                    self._logger.warning('image get empty response')
                    return None

                with catch_warnings():
                    filterwarnings('ignore')
                    stream = BytesIO(response.content)
                    stream.seek(0)
                    image = PImage.open(stream)
            else:
                raise Exception(f'image doesn\'t supply htype {htype}')
            self._logger.info('fetching done successfully')
            self._logger.info(f'image {image.size}')
        except Exception as exception:
            self._logger.error(str(exception))
            return None

        if not self.__check(image):
            self._logger.warning('image doesn\'t pass width height check')
            return None

        image = self.__crop(image)
        result = self.__save(image)
        if result is not None:
            orientation = 'landscape' if image.size[0] > image.size[1] else 'portrait'
            return {
                'link': result,
                'source': query,
                'orientation': orientation,
            }
        return None

    def __check(self, image):
        width, height = image.size
        return \
            width >= self.MIN_SIDE_MEASURE \
            and height >= self.MIN_SIDE_MEASURE and \
            (width / height) <= (self.MAX_SIDE_DISPROPORTION) and \
            (height / width) <= (self.MAX_SIDE_DISPROPORTION)

    def __crop(self, image):
        self._logger.info('image start resizing and cropping')
        width, height = image.size
        if width >= height:
            desire_width = self.DESIRE_LARGE_MEASURE
            desire_height = self.DESIRE_SMALL_MEASURE
        else:
            desire_height = self.DESIRE_LARGE_MEASURE
            desire_width = self.DESIRE_SMALL_MEASURE

        ratio_width = desire_width / width
        ratio_height = desire_height / height
        if ratio_width > ratio_height:
            new_size = (desire_width, int(height * ratio_width))
        else:
            new_size = (int(width * ratio_height), desire_height)

        image = image.resize(new_size, PImage.ANTIALIAS)
        left = int((new_size[0] - desire_width) / 2.0)
        top = int((new_size[1] - desire_height) / 2.0)
        right = int((new_size[0] + desire_width) / 2.0)
        bottom = int((new_size[1] + desire_height) / 2.0)

        try:
            image = image.crop((left, top, right, bottom))
            self._logger.info(f'image resized and cropped {str(new_size)}')
            return image
        except Exception as exception:
            self._logger.error(str(exception))
            return None

    def __save(self, image):
        file_name = f'{hexlify(urandom(16)).decode()}.jpeg'
        full_name = path.join(self.__dir, file_name)
        while path.isfile(full_name):
            file_name = f'{hexlify(urandom(16)).decode()}.jpeg'
            full_name = path.join(self.__dir, file_name)

        with catch_warnings():
            filterwarnings('ignore')
            try:
                image = image.convert('RGB')
                image.save(
                    full_name,
                    'JPEG',
                    quality=self.RESULT_IMAGE_QUALITY,
                    optimize=True,
                    progressive=True,
                )
                file_size = path.getsize(full_name)
                if file_size > self.MAXIMAL_FILE_SIZE \
                        or file_size < self.MINIMAL_FILE_SIZE:
                    raise Exception(
                        f'image doesn\'t pass size check {file_size}b',
                    )
                self._logger.info(
                    f'image saved as {file_name} with size {file_size}b',
                )
                return file_name
            except Exception as exception:
                if path.exists(full_name):
                    remove(full_name)
                self._logger.error(str(exception))
                return None
