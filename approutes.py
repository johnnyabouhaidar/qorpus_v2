from flask import Blueprint
from flask import Flask,Blueprint, render_template, url_for,redirect, flash,send_file, jsonify,request,session
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin,login_user,LoginManager,login_required,logout_user,current_user

import json

approutes = Blueprint('approutes',__name__)

'''


def convert_list_to_json(inputlist):
    returnedjson = []
    for item in inputlist:
        line = {}
        for idx,value in enumerate(item):
            line[idx]=value
        #print(item)
        #print(json.dumps(item))
        returnedjson.append(line)
    #print(returnedjson)
    return returnedjson

def get_users_data():
    userlist=db.engine.execute("""Select * from [Flask_DataEntry_DB].[dbo].[user]""")
    userlistjson=convert_list_to_json(userlist)
    return (userlistjson)

@approutes.route('/get_users_data')
@login_required
def getusersdata():   
    return jsonify(get_users_data())

@approutes.route('/delete_user',methods=["POST"])
@login_required
def delete_users():
    #db.engine.execute("""Delete from "user" where id = {0}""".format(2012))
    try:
        for id in request.json["ids"]:
            #print(id)
            db.engine.execute("""Delete from "user" where id = {0}""".format(id))
    except:
        return(jsonify({"Status":"Not all records were deleted"}))    
    return(jsonify({"Status":"OK"}))'''