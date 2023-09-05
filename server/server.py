from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS


from api.db_utils import *
from api.game_api import *

app = Flask(__name__) # create Flask instance

CORS(app)  # Enable CORS for Flask

api = Api(app) # api router

api.add_resource(GameApi,'/game_api')

if __name__ == '__main__':
    print("Loading db")
    exec_sql_file('gamedata.sql')
    print("Starting flask")
    app.run(debug=True, port=4999),  # starts Flask



