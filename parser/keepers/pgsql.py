import psycopg2

from base import Keeper


class PGSql(Keeper):
    def __init__(self, configs):
        self.__dbConnection = psycopg2.connect(
            'host={} dbname={} user={} password={}'.format(
                configs['host'],
                configs['dbname'],
                configs['user'],
                configs['password'],
            ), cursor_factory=psycopg2.extras.RealDictCursor
        )
        self.__open()

    def read(self):
        self.__cursor.execute('''
            SELECT
                option.id,
                option.name,
                option.description,
                option.link,
                category.name as category_name,
                parent_cattegory.name as parent_category_name,
            FROM option
            INNER JOIN category on category.id = option.category_id
            LEFT JOIN category as parent_cattegory
                on parent_cattegory.id = category.parent_cattegory_id
        ''')
        options = self.__cursor.fetchall()
        for option in options:
            self.__cursor.execute('''
                SELECT link FROM subject
                WHERE option_id = %(optionId)s
            ''', {'optionId': option['id']})
            option['subjects'] = self.__cursor.fetchall()
        self.__close()

        return map(
            lambda option: {
                'name': option['name'],
                'description': option['description'],
                'link': option['link'],
                'subjects': (item['link'] for item in option['subjects']),
                'category': {
                    'name': option['category_name'],
                    'parent_name': option['parent_category_name'],
                }
            },
            options
        )

    def write(self, data):
        for item in data:
            categoryId = self.__pushCategory(
                item['category']['name'],
                item['category']['parent_name']
            )
            optionId = self.__pushOption(
                item['name'],
                categoryId,
                item['description'],
                item['link']
            )
            for subject in item['subjects']:
                self.__pushSubject(
                    subject['link'],
                    optionId
                )
        self.__close()

    def __pushCategory(self, category, parentCategory=None):
        if (parentCategory is None):
            self.__cursor.execute('''
                INSERT IGNORE INTO category (name)
                VALUES (%(name)s)
                RETURNING id
            ''', {'name': category})
        else:
            self.__cursor.execute('''
                INSERT IGNORE INTO category
                (name, SELECT id FROM category WHERE name = %(parentName)s)
                VALUES (%(name)s)
                RETURNING id
            ''', {'name': category, 'parentName': parentCategory, })
        return self.__cursor.fetchone()['id']

    def __pushOption(self, name, categoryId, description=None, link=None):
        self.__cursor.execute('''
            INSERT IGNORE INTO option (name, category_id, description, link)
            VALUES (%(name)s, %('category_id')s, %('description')s, %('link')s)
            RETURNING id
        ''', {
            'name': name,
            'category_id': categoryId,
            'description': description,
            'link': link,
        })
        return self.__cursor.fetchone()['id']

    def __pushSubject(self, link, optionId):
        self.__cursor.execute('''
            INSERT IGNORE INTO subject (link, option_id)
            VALUES (%(link)s, %('option_id')s)
            RETURNING id
        ''', {
            'link': link,
            'option_id': optionId,
        })
        return self.__cursor.fetchone()['id']

    def __open(self):
        if self.__cursor is None:
            self.__cursor = self.__connection.cursor()

    def __close(self):
        if self.__cursor is not None:
            self.__connection.commit()
            self.__cursor.close()
            self.__cursor = None
