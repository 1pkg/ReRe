import flask

from injector import *

application = flask.Flask(__name__)
application.config.from_object('conf.Development')

pool = {}
injector = Injector(application.config)
injector.register(pool)

@application.route("/start", methods=["GET"])
def start():
    global pool
    return flask.jsonify(pool['start'](flask.request))

@application.route("/initialalize", methods=["GET"])
def initialalize():
    global pool
    return flask.jsonify(pool['initialalize'](flask.request))

@application.route("/fetch", methods=["GET"])
def fetch():
    global pool
    return flask.jsonify(pool['fetch'](flask.request))

@application.route("/chose", methods=["GET"])
def chose():
    global pool
    return flask.jsonify(pool['chose'](flask.request))

@application.after_request
def cors(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response
