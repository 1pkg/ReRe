import sqlite3

from base import Keeper


class Sqlite(Keeper):
    def __init__(self, file_name):
        self.__connection = sqlite3.connect(file_name)
        self.__cursor = None
        self.__schema()

    def write(self, items):
        self.__open()
        for item in super()._prepare(items):
            option_id = self.__option(
                item['name'],
                item['description'],
                item['source'],
                item['link'],
            )
            for subject in item['subjects']:
                self.__subject(
                    subject['link'],
                    subject['source'],
                    subject['orientation'],
                    option_id,
                )
        self.__close()

    def __schema(self):
        self.__open()
        self.__cursor.execute('''
            CREATE TABLE IF NOT EXISTS option (
              id INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL UNIQUE,
              description TEXT NOT NULL,
              source TEXT NOT NULL,
              link TEXT NOT NULL
            );
        ''')
        self.__cursor.execute('''
          CREATE TABLE IF NOT EXISTS subject (
            id INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
            link TEXT NOT NULL UNIQUE,
            source TEXT NOT NULL,
            orientation TEXT NOT NULL,
            option_id INT NOT NULL REFERENCES option (id) ON DELETE CASCADE
          );
        ''')
        self.__close()

    def __option(self, name, description, source, link):
        self.__cursor.execute('''
            INSERT OR IGNORE INTO option (
                name,
                description,
                source,
                link
            ) VALUES (?, ?, ?, ?);
        ''', (name, description, source, link))
        self.__commit()

        self.__cursor.execute('''
            SELECT id FROM option WHERE name = ? AND link = ?;
        ''', (name, link))
        return self.__cursor.fetchone()[0]

    def __subject(self, link, source, orientation, option_id):
        self.__cursor.execute('''
            INSERT OR IGNORE INTO subject (
                link,
                source,
                orientation,
                option_id
            ) VALUES (?, ?, ?, ?);
        ''', (link, source, orientation, option_id))
        self.__commit()

        self.__cursor.execute('''
            SELECT id FROM subject WHERE link = ?
        ''', (link,))
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
