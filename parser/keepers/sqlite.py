import sqlite3

from base import Keeper


class Sqlite(Keeper):
    def __init__(self, session, fileName):
        super().__init__(session)
        self.__connection = sqlite3.connect(fileName)
        self.__cursor = None
        self.__schema()

    def write(self, items):
        self.__open()
        data = super().write(items)
        self.__pushSession(data['session'])
        for item in data['items']:
            categoryId = self.__pushCategory(
                item['category']['name'],
                item['category']['parentName']
            )
            optionId = self.__pushOption(
                item['name'],
                categoryId,
                item['description'],
                item['source'],
                item['link']
            )
            for subject in item['subjects']:
                self.__pushSubject(
                    subject['link'],
                    subject['source'],
                    optionId
                )
        self.__close()

    def __schema(self):
        self.__open()
        self.__cursor.execute('''
          CREATE TABLE IF NOT EXISTS session (
            guid VARCHAR(256) NOT NULL UNIQUE PRIMARY KEY
          );
        ''')
        self.__cursor.execute('''
          CREATE TABLE IF NOT EXISTS category (
            id INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(256) NOT NULL UNIQUE,
            parent_category_id INT DEFAULT NULL
                REFERENCES category (id) ON DELETE CASCADE
          );
        ''')
        self.__cursor.execute('''
            CREATE TABLE IF NOT EXISTS option (
              id INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
              name VARCHAR(256) NOT NULL,
              description VARCHAR(1024) DEFAULT NULL,
              source VARCHAR(256) DEFAULT NULL,
              link VARCHAR(256) DEFAULT NULL,
              category_id INT NOT NULL
                REFERENCES category (id) ON DELETE CASCADE
            );
        ''')
        self.__cursor.execute('''
          CREATE TABLE IF NOT EXISTS subject (
            id INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
            link VARCHAR(256) NOT NULL UNIQUE,
            source VARCHAR(256) NOT NULL,
            option_id INT NOT NULL
                REFERENCES option (id) ON DELETE CASCADE
          );
        ''')
        self.__cursor.execute('''
          INSERT OR IGNORE INTO category (name) VALUES ('fictional character');
        ''')
        self.__close()

    def __pushSession(self, session):
        self.__cursor.execute('''
            INSERT INTO session (guid)
            VALUES (?);
        ''', (session,))
        self.__commit()

    def __pushCategory(self, category, parentCategory=None):
        if (parentCategory is None):
            self.__cursor.execute('''
                INSERT OR IGNORE INTO category (name) VALUES (?);
            ''', (category,))
        else:
            self.__cursor.execute('''
                INSERT OR IGNORE INTO category
                (name, parent_category_id) VALUES
                (?, (SELECT id FROM category WHERE name = ?));
            ''', (category, parentCategory))
        self.__commit()

        self.__cursor.execute('''
            SELECT id FROM category WHERE name = ?;
        ''', (category,))
        return self.__cursor.fetchone()[0]

    def __pushOption(self, name, categoryId, description, source, link):
        self.__cursor.execute('''
            INSERT OR IGNORE INTO option (
                name,
                category_id,
                description,
                source,
                link
            ) VALUES (?, ?, ?, ?, ?);
        ''', (name, categoryId, description, source, link))
        self.__commit()

        self.__cursor.execute('''
            SELECT last_insert_rowid() FROM option;
        ''')
        return self.__cursor.fetchone()[0]

    def __pushSubject(self, link, source, optionId):
        self.__cursor.execute('''
            INSERT OR IGNORE INTO subject (link, source, option_id) VALUES
            (?, ?, ?);
        ''', (link, source, optionId))
        self.__commit()

        self.__cursor.execute('''
            SELECT last_insert_rowid() FROM subject;
        ''')
        return self.__cursor.fetchone()[0]

    def __open(self):
        if self.__cursor is None:
            self.__cursor = self.__connection.cursor()

    def __close(self):
        if self.__cursor is not None:
            self.__connection.commit()
            self.__cursor.close()
            self.__cursor = None

    def __commit(self):
        self.__connection.commit()
