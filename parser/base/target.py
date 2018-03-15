import re
from datetime import datetime, timedelta


class Target:
    def __init__(self, image, wiki, logger, keepers):
        self._image = image
        self._wiki = wiki
        self._logger = logger
        self._keepers = keepers

    def process(self):
        items, processed, skipped, result = self._fetchItems(), [], [], None
        totalCount, startTimestamp = len(items), datetime.today().timestamp()

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
                if result is None:
                    result = self._fetchFromTarget(
                        item['url'],
                        item['title'],
                        item['category'],
                        item['parentCategory']
                    )
                if result is None:
                    skipped.append(item)
                    self._logger.warning('''
                        target skipped item has no result
                    ''')
                    self._stats(
                        result,
                        processed,
                        skipped,
                        totalCount,
                        startTimestamp
                    )
                    continue

                result['subjects'] = self._image.fetch(
                    self._image.TYPE_GET,
                    result['name']
                )
                if len(result['subjects']) == 0:
                    skipped.append(item)
                    self._logger.warning('''
                        target skipped item has no subjects
                    ''')
                    self._stats(
                        result,
                        processed,
                        skipped,
                        totalCount,
                        startTimestamp
                    )
                    continue

                processed.append(result)
                self._logger.info('''
                    target processed item {0}
                '''.format(str(result)))
                self._stats(
                    result,
                    processed,
                    skipped,
                    totalCount,
                    startTimestamp
                )
            except Exception as exception:
                skipped.append(item)
                self._logger.error(str(exception))

        self._logger.info('''
            ==================================================
                            PROCESSING FINISHED
            ==================================================
        ''')
        self._keep(processed)

    def _keep(self, processed):
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

    def _stats(
        self,
        result,
        processed,
        skipped,
        totalCount,
        startTimestamp
    ):
        processedCount, skippedCount = len(processed), len(skipped)
        timeDelta = datetime.today().timestamp() - startTimestamp
        totalRatio = 0.0 if totalCount == 0 \
            else (processedCount + skippedCount) / totalCount
        remainingTime = 0.0 if totalRatio == 0.0 \
            else timeDelta / totalRatio - timeDelta
        self._logger.info(re.sub('\s+', ' ', '''
            total {0} processed {1} skipped {2}
        '''.format(
            totalCount,
            processedCount,
            skippedCount,
        ), flags=re.IGNORECASE).strip())
        self._logger.info(re.sub('\s+', ' ', '''
            total percent {0:.2f}%
            processed percent {1:.2f}%
            skipped percent {2:.2f}%
        '''.format(
            totalRatio * 100,
            0.0 if totalCount == 0 else processedCount / totalCount * 100,
            0.0 if totalCount == 0 else skippedCount / totalCount * 100,
        ), flags=re.IGNORECASE).strip())
        self._logger.info(re.sub('\s+', ' ', '''
            running time {0} approximately remaining time {1}
        '''.format(
            str(timedelta(seconds=int(timeDelta))),
            str(timedelta(seconds=int(remainingTime))),
        ), flags=re.IGNORECASE).strip())

    def _deadFetch(self, query, params={}):
        tryCount, response = 1, None
        while tryCount < self.MAX_TRY and \
                (response is None or response.status_code != 200):
            try:
                tryCount += 1
                response = self._fetcher.fetch(
                    self._fetcher.TYPE_GET,
                    query,
                    params,
                )
            except Exception as exception:
                self._logger.error(str(exception))
            finally:
                if response is None or response.status_code != 200 and \
                        callable(getattr(self._fetcher, 'rotate', None)):
                    self._fetcher.rotate()
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
