import re
from datetime import datetime, timedelta


class Target:
    def __init__(self, image, wiki, logger, keepers):
        self._image = image
        self._wiki = wiki
        self._logger = logger
        self._keepers = keepers

    def process(self):
        items, processed, skipped = self._fetchItems(), [], []
        totalCount, startTimestamp = len(items), datetime.today().timestamp()
        fromWiki, fromTarget, fromSource, result = 0, 0, None, None

        self._logger.info('''
            ==================================================
                            PROCESSING START
            ==================================================
        ''')
        for index in range(0, totalCount):
            self._logger.info('''
                ==================================================
                ==================================================
                ==================================================
            ''')

            try:
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
                fromSource = 'wiki'
                fromWiki += 1
                if result is None:
                    fromWiki -= 1
                    result = self._fetchFromTarget(
                        item['url'],
                        item['title'],
                        item['category'],
                        item['parentCategory']
                    )
                    fromSource = 'target'
                    fromTarget += 1
                if result is None:
                    fromSource = None
                    fromTarget -= 1
                    skipped.append(item)
                    self._logger.info('''
                        target skipped item has no result
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

                result['subjects'] = self._image.fetch(
                    self._image.TYPE_GET,
                    result['name']
                )
                if len(result['subjects']) == 0:
                    if fromSource == 'wiki':
                        fromWiki -= 1
                    elif fromSource == 'target':
                        fromTarget -= 1
                    fromSource = None

                    skipped.append(item)
                    self._logger.info('''
                        target skipped item has no subjects
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
            except Exception as exception:
                self._logger.error(str(exception))

        self._logger.info('''
            ==================================================
                            PROCESSING FINISHED
            ==================================================
        ''')
        self.__keep(processed)

    def __keep(self, processed):
        self._logger.info('''
            start keeping
        ''')
        try:
            for keeper in self._keepers:
                keeper.write(processed)
            self._logger.info('''
                keep done successfully
            ''')
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
        totalRatio = 0.0 if totalCount == 0 \
            else (processedCount + skippedCount) / totalCount
        remainingTime = 0.0 if totalRatio == 0.0 \
            else timeDelta / totalRatio - timeDelta
        print(re.sub('\s+', ' ', '''
            target {0} total {1} processed {2} skipped {3}
            wiki {4} target {5}
        '''.format(
            self.__class__.__name__,
            totalCount,
            processedCount,
            skippedCount,
            fromWiki,
            fromTarget,
        ), flags=re.DOTALL | re.IGNORECASE).strip())
        print(re.sub('\s+', ' ', '''
            total percent {0:.2f}%
            processed percent {1:.2f}%
            skipped percent {2:.2f}%
            wiki percent {3:.2f}%
            target percent {4:.2f}%
        '''.format(
            totalRatio * 100,
            0.0 if totalCount == 0 else processedCount / totalCount * 100,
            0.0 if totalCount == 0 else skippedCount / totalCount * 100,
            0.0 if processedCount == 0 else fromWiki / processedCount * 100,
            0.0 if processedCount == 0 else fromTarget / processedCount * 100,
        ), flags=re.DOTALL | re.IGNORECASE).strip())
        print(re.sub('\s+', ' ', '''
            running time {0} approximately remaining time {1}
        '''.format(
            str(timedelta(seconds=int(timeDelta))),
            str(timedelta(seconds=int(remainingTime))),
        ), flags=re.DOTALL | re.IGNORECASE).strip())
        print('\n')

    def _deadFetch(self, query, params={}):
        tryCount = 1
        response = self._fetcher.fetch(
            self._fetcher.TYPE_GET,
            query,
            params,
        )
        while tryCount < self.MAX_TRY and \
                (response is None or response.status_code != 200):
            if callable(getattr(self._fetcher, 'rotate', None)):
                self._fetcher.rotate()
            response = self._fetcher.fetch(
                self._fetcher.TYPE_GET,
                query,
                params,
            )
            tryCount += 1
        return response

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
            'category': {
                'name': category,
                'parentName': parentCategory,
            }
        }
