import flask
import psycopg2
import psycopg2.extras

application = flask.Flask(__name__)
application.config['DEBUG'] = True
connection = psycopg2.connect("host='localhost' dbname='wit' user='postgres' password='123'")
cursor = connection.cursor(cursor_factory = psycopg2.extras.RealDictCursor)

def sanitalize(object):
    if isinstance(object, dict):
        try:
            del object['id']
            del object['description']
            del object['time_stamp']
        except:
            pass
    return object


def fetchRandomTask() :
    cursor.execute("""
        SELECT option.id as id, option.name as name, category.name as category FROM option
        INNER JOIN category ON option.category_id = category.id
        ORDER BY RANDOM() LIMIT 3
    """)
    temp = cursor.fetchall()
    id = temp[0]['id']
    options = []
    for option in temp:
        option['references'] = []
        options.append(sanitalize(option))

    cursor.execute("""
        SELECT image.source_link as sourceLink, image.source_alt as sourceAlt FROM subject
        INNER JOIN image ON image.id = subject.object_id AND subject.type = %s
        WHERE option_id = %s LIMIT 1
    """, ('image', id))
    subject = cursor.fetchall()
    subject = sanitalize(subject[0])

    return {
        'options': options,
        'subject': subject,
        'correctOption': 0,
    }

@application.route("/")
def main():
    return flask.jsonify(fetchRandomTask())

@application.after_request
def cors(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response
