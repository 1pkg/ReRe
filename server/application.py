import flask

from injector import *

application = flask.Flask(__name__)
application.config.from_object('conf.Development')

pool = {}
injector = Injector(application.config)
injector.register(pool)

@application.route("/fetch-task", methods=["GET"])
def f1():
    global pool
    return flask.jsonify(pool['fetch-task'](flask.request.args))

@application.route("/option-chose", methods=["GET"])
def f2():
    global pool
    return flask.jsonify(pool['option-chose'](flask.request.args))

@application.after_request
def cors(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response
