from datetime import datetime, timedelta
from re import sub


class Target:
    MIN_DESCRIPTION_LENGTH = 50
    MIN_DESCRIPTION_WORDS = 7

    IMAGE_QUERY_WORDS_COUNT = 7

    DEAD_FETCH_TRY_COUNT = 10

    USE_WIKI = True

    def __init__(self, image, wiki, logger, keepers, limit):
        limit = limit if limit is not None else self.DEFAULT_LIMIT
        self._image = image
        self._wiki = wiki
        self._logger = logger
        self._keepers = keepers
        self._limit = limit

    def process(self):
        items, processed, skipped, result = self._get_items(), {}, [], None
        total_count, start_timestamp = len(items), datetime.today().timestamp()

        self._logger.info('''
            ==================================================
                            PROCESSING START
            ==================================================
        ''')
        for index, item in enumerate(items):
            self._logger.info('''
                ==================================================
                ==================================================
                ==================================================
            ''')
            self._stats(processed, skipped, total_count, start_timestamp)
            try:
                self._logger.info(f'''
                    target processing item
                    {item['title']} {item['url']} {item['category']}
                    on index {index}
                ''')

                item['title'] = f'{item["title"]} ({item["category"]})' \
                    if '(' not in item['title'] else item['title']

                result = self._from_target(item['url'], item['title'])
                if result is None:
                    result = self._from_wiki(item['title'])
                result = self._fix_option(result)

                if result is None:
                    skipped.append(item)
                    self._logger.warning('target skipped item has no result')
                    continue

                result['category'] = item['category']
                if result['name'] in processed:
                    skipped.append(item)
                    self._logger.warning(
                        f'target skipped item dublicated {result["name"]}',
                    )
                    continue

                result['subjects'] = self._image.fetch(
                    self._image.TYPE_GET,
                    sub('(.*?)\s*\(Other\)', '\\1', result['name']),
                )
                if len(result['subjects']) == 0:
                    skipped.append(item)
                    self._logger.warning('target skipped item has no subjects')
                    continue

                processed[result['name']] = result
                self._logger.info(f'target processed item {result}')
            except Exception as exception:
                skipped.append(item)
                self._logger.error(str(exception))

        self._logger.info('''
            ==================================================
                            PROCESSING FINISHED
            ==================================================
        ''')
        self._stats(processed, skipped, total_count, start_timestamp)
        self._keep(processed)

    def _keep(self, processed):
        self._logger.info('target start keeping')
        try:
            for keeper in self._keepers:
                keeper.write(list(processed.values()))
            self._logger.info('keep done successfully')
        except Exception as exception:
            self._logger.error(str(exception))

    def _stats(self, processed, skipped, total_count, start_timestamp):
        processed_count, skipped_count = len(processed), len(skipped)
        time_delta = datetime.today().timestamp() - start_timestamp
        if (total_count != 0):
            processed_ratio = processed_count / total_count
            skipped_ratio = skipped_count / total_count
            total_ratio = processed_ratio + skipped_ratio
            remaining_time = \
                0.0 if total_ratio == 0.0 \
                else time_delta / total_ratio - time_delta
        else:
            processed_ratio = 0.0
            skipped_ratio = 0.0
            total_ratio = 0.0
            remaining_time = 0.0

        self._logger.info(f'''
            total {total_count}
            processed {processed_count}
            skipped {skipped_count}
        ''')
        self._logger.info(f'''
            total percent {total_ratio * 100:.2f}%
            processed percent {processed_ratio * 100:.2f}%
            skipped percent {skipped_ratio * 100:.2f}%
        ''')
        self._logger.info(f'''
            running time {str(timedelta(seconds=int(time_delta)))}
            remaining time {str(timedelta(seconds=int(remaining_time)))}
        ''')

    def _dead_fetch(self, query, params={}):
        try_count, response, status = 0, None, False
        while try_count < self.DEAD_FETCH_TRY_COUNT and not status:
            try:
                try_count += 1
                response = self._fetcher.fetch(
                    self._fetcher.TYPE_GET,
                    query,
                    params,
                )
                status = response is not None and response.status_code == 200
            except Exception as exception:
                self._logger.error(str(exception))
            finally:
                rotate = getattr(self._fetcher, 'rotate', None)
                if not status and callable(rotate):
                    self._fetcher.rotate()
        return response

    def _get_items(self):
        return NotImplemented

    def _from_target(self, url, title):
        return NotImplemented

    def _from_wiki(self, title):
        response = self._wiki.fetch(None, title)
        if response is not None:
            return {
                'name': title,
                'description': response.summary,
                'link': response.url,
                'source': 'wiki',
            }
        return None

    def _fix_option(self, option):
        if option is None or \
                option['name'] is None or \
                option['name'] is '' or \
                option['description'] is None or \
                option['description'] is '':
            return None

        self._logger.info('target start fixing option')
        option['name'] = sub('\s+', ' ', option['name'])
        option['name'] = sub(
            '(.*?)\s*\(.*?\)\s*(\(.*?\))',
            '\\1 \\2',
            option['name'],
        ).strip()
        option['description'] = sub('\[.*?\]', '', option['description'])
        option['description'] = sub(
            '\s+([:;,.!?])',
            '\\1',
            option['description'],
        )
        option['description'] = sub('\s+', ' ', option['description']).strip()
        option['description'] = \
            option['description'][:1].upper() + option['description'][1:]
        if not option['description'].endswith('.'):
            option['description'] += '.'

        if len(option['description']) >= self.MIN_DESCRIPTION_LENGTH and \
                len(option['description'].split(' ')) >= self.MIN_DESCRIPTION_WORDS:
            return option
        return None
