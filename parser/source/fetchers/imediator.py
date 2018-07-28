from os import path as paths, remove
from fuzzywuzzy import fuzz

from base import Fetcher
from .duckduckgo import DuckDuckGo
from .qwant import Qwant
from .image import Image


class IMediator(Fetcher):
    MAX_IMAGE_COUNT = 5
    MIN_IMAGE_COUNT = 3

    ALL_SOURCES = set()

    def __init__(self, logger, path):
        super().__init__(logger)
        self.__duck_duck_go = DuckDuckGo(logger)
        self.__qwant = Qwant(logger)
        self.__image = Image(logger, path)
        self.__dir = path

    def fetch(self, htype, query, params={}):
        sources_qwant = self.__qwant.fetch(htype, query, params)
        sources_duck_duck_go = self.__duck_duck_go.fetch(htype, query, params)
        sources = self.__merge_unique(
            query,
            sources_qwant,
            sources_duck_duck_go,
        )
        self._logger.info(f'imediator filtered sources count {len(sources)}')
        images = []
        for source in sources:
            image = self.__image.fetch(self.TYPE_GET, source)
            if image is not None:
                images.append(image)
                if (len(images) >= self.MAX_IMAGE_COUNT):
                    break

        self._logger.info(f'imediator fetched images count {len(images)}')
        if len(images) >= self.MIN_IMAGE_COUNT:
            self.__release(images[self.MAX_IMAGE_COUNT:])
            return images[:self.MAX_IMAGE_COUNT]
        else:
            self.__release(images)
            return []

    def __release(self, images):
        for image in images:
            link = image['link']
            full_name = paths.join(self.__dir, link)
            self._logger.info(f'imediator release {link}')
            if paths.exists(full_name):
                remove(full_name)

    def __merge_unique(self, query, *args):
        merged, unique = [], []
        list_lens = [len(one_list) for one_list in args]
        list_lens.sort(reverse=True)
        for index in range(0, list_lens[0]):
            for one_list in args:
                if len(one_list) > index:
                    merged.append(one_list[index])

        self._logger.info(f'imediator total sources count {len(merged)}')
        for source in merged:
            if source not in unique and source not in IMediator.ALL_SOURCES:
                unique.append(source)
                IMediator.ALL_SOURCES.add(source)
        return unique
