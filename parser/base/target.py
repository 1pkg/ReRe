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
        fromWiki, fromTarget = 0, 0

        self._logger.info('''
            ==================================================
                            {0} PROCESSING START
            ==================================================
        '''.format(self._name))
        for index in range(0, totalCount):
            self._logger.info('''
                ==================================================
                ==================================================
            ''')

            item = items[index]
            self._logger.info('''
                target processing item {0} {1} index {2}
            '''.format(
                item['title'],
                item['url'],
                index,
            ))
            result = self._fetchFromWiki(
                item['title'],
                item['category'],
                item['parentCategory']
            )
            fromWiki += 1
            if result is None:
                fromWiki -= 1
                result = self._fetchFromTarget(
                    item['url'],
                    item['title'],
                    item['category'],
                    item['parentCategory']
                )
                fromTarget += 1
            if result is None:
                fromTarget -= 1
                skipped.append(item)
                self._logger.info('''
                    target skipped item
                ''')
                self.__print(
                    result,
                    processed,
                    skipped,
                    fromWiki,
                    totalCount,
                    fromTarget,
                    startTimestamp
                )
                continue

            result['images'] = self._image.fetch(
                self._image.TYPE_GET,
                item['title']
            )
            if len(result['images']) == 0:
                fromTarget -= 1
                skipped.append(item)
                self._logger.info('''
                    target skipped item
                ''')
                self.__print(
                    result,
                    processed,
                    skipped,
                    fromWiki,
                    totalCount,
                    fromTarget,
                    startTimestamp
                )
                continue

            processed.append(result)
            self._logger.info('''
                target processed item {0}
            '''.format(str(result)))
            self.__print(
                result,
                processed,
                skipped,
                fromWiki,
                totalCount,
                fromTarget,
                startTimestamp
            )

        self._logger.info('''
            ==================================================
                            {0} PROCESSING FINISHED
            ==================================================
        '''.format(self._name))
        self.__keep(processed)

    def __keep(self, processed):
        self._logger.info('''
            target {0} start keeping
        '''.format(self._name))
        try:
            for keeper in self._keepers:
                keeper.write(processed)
            self._logger.info('''
                target {0} keep done successfully
            '''.format(self._name))
        except Exception as exception:
            self._logger.error(str(exception))

    def __print(
        self,
        result,
        processed,
        skipped,
        fromWiki,
        totalCount,
        fromTarget,
        startTimestamp
    ):
        if result is not None:
            print(str(result))
            print('\n')

        processedCount, skippedCount = len(processed), len(skipped)
        timeDelta = datetime.today().timestamp() - startTimestamp
        totalRatio = (processedCount + skippedCount) / totalCount
        remainingTime = timeDelta / totalRatio - timeDelta
        print(re.sub('\s+', ' ', '''
            target {0} total {1} processed {2} skipped {3}
            wiki {4} target {5}
        '''.format(
            self._name,
            totalCount,
            processedCount,
            skippedCount,
            fromWiki,
            fromTarget,
        )).strip())
        print(re.sub('\s+', ' ', '''
            total percent {0:.2f}%
            processed percent {1:.2f}%
            skipped percent {2:.2f}%
            wiki percent {3:.2f}%
            target percent {4:.2f}%
        '''.format(
            totalRatio * 100,
            processedCount / totalCount * 100,
            skippedCount / totalCount * 100,
            fromWiki / processedCount * 100,
            fromTarget / processedCount * 100,
        )).strip())
        print(re.sub('\s+', ' ', '''
            running time {0} approximately remaining time {1}
        '''.format(
            str(timedelta(seconds=int(timeDelta))),
            str(timedelta(seconds=int(remainingTime))),
        )).strip())
        print('\n')

    def _fetchItems(self):
        return NotImplemented

    def _fetchFromTarget(self, url, title, category, parentCategory):
        return NotImplemented

    def _fetchFromWiki(self, title, category, parentCategory):
        response = self._wiki.fetch(
            self._wiki.TYPE_WIKI,
            title,
        )
        if response is None:
            return None

        return {
            'name': title,
            'description': response.summary,
            'link': response.url,
            'source': 'wiki',
            'category': {'name': category, 'parentName': parentCategory}
        }
