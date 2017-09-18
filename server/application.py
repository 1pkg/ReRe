import flask

from injector import *

application = flask.Flask(__name__)
application.config.from_object('conf.Development')

pool = {}
injector = Injector(application.config)
injector.register(pool)

@application.route("/fetch-task")
def main():
    global pool
    return flask.jsonify(pool['fetch-task']())

@application.after_request
def cors(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response
