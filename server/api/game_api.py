import json
from flask_restful import Resource
from flask_restful import request
from flask_restful import reqparse
from .db_utils import *

class GameApi(Resource):
    def get(self):
       return exec_get_all("""
        SELECT id
            FROM game_data
            ORDER BY id DESC
        """)
