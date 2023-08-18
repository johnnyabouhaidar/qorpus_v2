from flask import Blueprint
from flask import Flask,Blueprint, render_template, url_for,redirect, flash,send_file, jsonify,request,session
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin,login_user,LoginManager,login_required,logout_user,current_user

import json

approutes = Blueprint('approutes',__name__)

   
    