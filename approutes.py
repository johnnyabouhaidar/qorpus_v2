from flask import Blueprint
from flask import Flask,Blueprint, render_template, url_for,redirect, flash,send_file, jsonify,request,session
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin,login_user,LoginManager,login_required,logout_user,current_user

import json

approutes = Blueprint('approutes',__name__)


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

def get_types_data():
    facturationtypels = db.engine.execute("""Select *,'Facturation' as 'Name' from facturationtype""")
    facturationtypejson = convert_list_to_json(facturationtypels)

    paymenttypels = db.engine.execute("""Select *, 'Paiement' as 'Name' from paymenttype""")
    paymenttypejson = convert_list_to_json(paymenttypels)

    retrocessiontypels = db.engine.execute("""Select *,'Retrocession' as 'Name' from retrocessiontype""")
    retrocessiontypejson = convert_list_to_json(retrocessiontypels)

    dentisterietypels = db.engine.execute("""Select *,'Dentisterie' as 'Name' from dentisterietype""")
    dentisterietypejson = convert_list_to_json(dentisterietypels)

    return (facturationtypejson+paymenttypejson+retrocessiontypejson+dentisterietypejson)
    

@approutes.route('/get_types_data')
@login_required
def gettypesdata():
    return jsonify(get_types_data())

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
    return(jsonify({"Status":"OK"}))    

@approutes.route('/edit_user',methods=["POST"])
@login_required
def edit_user():
    
    try:    
        newaccess = ' '.join(request.json["access"])
        
        newrole = "admin" if request.json["isAdmin"]==True else "user"
        
        db.engine.execute("""UPDATE "user"
        SET username = '{0}', password = '{1}', role='{2}',access='{3}'
        WHERE id={4}; """.format(request.json["username"],request.json["password"],newrole,newaccess,request.json["id"]))
    except:
        return(jsonify({"Status":"Could not edit record"}))        
   
    return(jsonify({"Status":"OK"}))    
    