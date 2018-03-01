class Target:
    def __init__(self, image, wiki, logger, keepers):
        self._image = image
        self._wiki = wiki
        self._logger = logger
        self._name = self.__class__.__name__.lower()
        self._keepers = keepers

    def process(self):
        self._logger.info('==================================================')
        items, processed = self._fetchItems(), []
        for item in items:
            print(
                'processing {0} total {0} processed {1} percent {2:.2f}%'.format(
                    self._name, len(items), len(processed),
                    len(processed) / len(items)
                )
            )

            self._logger.info('start processing item: {0}'.format(item['title']))
            try:
                result = self._fetchFromWiki(
                    item['title'],
                    item['category'],
                    item['parentCategory']
                )
                if (result is None):
                    self._logger.warning('wiki issues skip element')
                    continue
                processed.append(result)
            except Exception as exception:
                self._logger.error(str(exception))
                continue
            self._logger.info('finish processing item: {0}'.format(item['title']))

        for keeper in self._keepers:
            keeper.write(processed)
        self._logger.info('==================================================')

    def _fetchItems(self):
        return NotImplemented

    def _fetchFromWiki(self, title, category, parentCategory):
        wikiQuery = '{0} ({1})'.format(title, category)
        page = self._wiki.fetch(wikiQuery)
        if (page is None):
            return

        wikiImages, images = page.images, []
        for image in wikiImages:
            if (len(images) >= 3):
                break

            result = self._image.fetch(image)
            if (result is not None):
                images.append(result)

        return {
            'name': page.title,
            'description': page.summary,
            'link': page.url,
            'images': images,
            'category': {'name': category, 'parentName': parentCategory, }
        }
