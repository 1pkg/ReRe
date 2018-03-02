import re
from datetime import datetime, timedelta


class Target:
    def __init__(self, image, wiki, logger, keepers):
        self._image = image
        self._wiki = wiki
        self._logger = logger
        self._name = self.__class__.__name__.lower()
        self._keepers = keepers

    def process(self):
        items, processed, skipped = self._fetchItems(), [], []
        totalCount, startTimestamp = len(items), datetime.today().timestamp()

        self._logger.info('''
            ==================================================
        ''')
        for item in items:

            self._logger.info('''
                target processing item {0} {1}
            '''.format(item['title'], item['url']))
            result = self._fetchFromWiki(
                item['title'],
                item['category'],
                item['parentCategory']
            )
            if (result is None):
                result = None
                # result = self._fetchFromTarget(
                #     item['url'],
                #     item['category'],
                #     item['parentCategory']
                # )
            if (result is None):
                skipped.append(item)
                self._logger.info('''
                    target skipped item
                ''')
            else:
                processed.append(result)
                self._logger.info('''
                    target processed item
                ''')

            processedCount, skippedCount = len(processed), len(skipped)
            timeDelta = datetime.today().timestamp() - startTimestamp
            totalRatio = (processedCount + skippedCount) / totalCount
            print(re.sub('\s+', ' ', '''
                target {0} total {1} processed {2} skipped {3}
            '''.format(
                self._name,
                totalCount,
                processedCount,
                skippedCount,
            )).strip())
            print(re.sub('\s+', ' ', '''
                total percent {0:.2f}%
                processed percent {1:.2f}%
                skipped percent {2:.2f}%
            '''.format(
                totalRatio * 100,
                processedCount / totalCount * 100,
                skippedCount / totalCount * 100,
            )).strip())
            print(re.sub('\s+', ' ', '''
                running time {0} approximately remaining time {1}
            '''.format(
                str(timedelta(seconds=timeDelta)),
                str(timedelta(seconds=timeDelta / totalRatio - timeDelta)),
            )).strip())
            print("\n")
        self._logger.info('''
            ==================================================
        ''')

        for keeper in self._keepers:
            keeper.write(processed)

    def _fetchItems(self):
        return NotImplemented

    def _fetchFromTarget(self, url, category, parentCategory):
        return NotImplemented

    def _fetchFromWiki(self, title, category, parentCategory):
        response = self._wiki.fetch(
            self._wiki.TYPE_WIKI,
            title,
        )
        if (response is None):
            return None

        images = []
        for wikiImage in response.filter_images:
            image = self._image.fetch(
                self._image.TYPE_GET,
                wikiImage,
            )
            if (image is not None):
                images.append(image)

        return {
            'name': response.title,
            'description': response.summary,
            'link': response.url,
            'images': images,
            'category': {'name': category, 'parentName': parentCategory}
        }
