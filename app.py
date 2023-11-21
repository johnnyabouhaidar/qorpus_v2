from DB_layer import *
from flask import Flask,Blueprint, render_template, url_for,redirect, flash,send_file, jsonify,request,session
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin,login_user,LoginManager,login_required,logout_user,current_user
from flask_wtf import FlaskForm
from wtforms import StringField,PasswordField,SubmitField,Label,BooleanField
from wtforms.validators import InputRequired,Length,ValidationError,DataRequired
from flask_bcrypt import Bcrypt
from forms import *
import datetime
#from report import *
#from doctor_report import *
import pandas as pd
from datetime import timedelta,date
from dateutil import relativedelta
import urllib.parse
import json
from flask_cors import CORS
from approutes import approutes
from flask_babel import Babel




#from UserClass import *


app = Flask(__name__)
app.config['BABEL_DEFAULT_LOCALE']='fr'
babel = Babel(app)



@babel.localeselector
def get_locale():
    if request.args.get('language'):
        session['language'] = request.args.get('language')
    return session.get('language', 'fr')

@app.route('/language=<language>')
def set_language(language=None):
    session['language'] = language
    
    return redirect(request.referrer)
       
    
app.jinja_env.globals['get_locale'] = get_locale

CORS(app, support_credentials=True)


file_download_location= r"C:\Users\Public\Documents"

db=SQLAlchemy(app)
bcrypt = Bcrypt(app)
#app.config['SQLALCHEMY_DATABASE_URI']='mssql+pyodbc://johnny:pass123456@localhost\SQLEXPRESS02/Flask_DataEntry_DB?driver=sql+server?trusted_connection=yes'



f = open('db_creds.json')
data = json.load(f)
sql_username = data["username"]
sql_password = data["password"]
sql_databasename = data["databasename"]
sql_instancename = data["instancename"]
sql_servername = data["servername"]
 

f.close()

#app.config['SQLALCHEMY_DATABASE_URI']=f"mssql+pyodbc://flask1:flaskPass@localhost\SQLEXPRESS/Flask_DataEntry_DB?driver=ODBC+Driver+17+for+SQL+Server"
app.config['SQLALCHEMY_DATABASE_URI']=f"mssql+pyodbc://{sql_username}:{sql_password}@{sql_servername}\{sql_instancename}/{sql_databasename}?driver=ODBC+Driver+17+for+SQL+Server"

db.init_app(app)
app.config['SECRET_KEY']='thisisasecretkeyjohnny'


login_manager=LoginManager()
login_manager.init_app(app)
login_manager.login_view="login"

app.register_blueprint(approutes)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String(50),nullable=False, unique=True)
    password = db.Column(db.String(80),nullable=False)
    role = db.Column(db.String(50),nullable=False)
    access=db.Column(db.String(500),nullable=False)



class medicalperson(db.Model):
    medid=db.Column(db.Integer,primary_key=True)
    mednom=db.Column(db.String(80),nullable=False)
    medspeciality=db.Column(db.String(80),nullable=False)
    medtype=db.Column(db.String(80),nullable=False)
    medpourcentage = db.Column(db.Float,nullable=False)
    medchargesociales=db.Column(db.Float,nullable=False)
    medsurfaceaccordee = db.Column(db.Float,nullable=False)
    medsalaire = db.Column(db.Float)
    mednombremoissalaireparan = db.Column(db.Float)
    medsecretaire = db.Column(db.String(80))
    medpourcentagesecretaire = db.Column(db.Float)
    medlogiciels = db.Column(db.String(500))
    medtelephone = db.Column(db.String(100))
    medaddress=db.Column(db.String(400))
    medemail=db.Column(db.String(200))
    medcoordonneebanc=db.Column(db.String(200))
    mednoavs=db.Column(db.Integer)
    medstartdate=db.Column(db.Date,nullable=False)
    medenddate=db.Column(db.Date)
    isemployee=db.Column(db.String(80),nullable=False)

class employee(db.Model):
    empid = db.Column(db.Integer,primary_key=True)
    empnom = db.Column(db.String(80),nullable=False)
    empaddress = db.Column(db.String(400))
    emptelephone = db.Column(db.String(80))
    empemail = db.Column(db.String(80))
    empcoordonnebanc = db.Column(db.String(80))
    empnoavs = db.Column(db.Integer)
    emppole = db.Column(db.String(40))
    empintituleposte = db.Column(db.String(50),nullable=False)
    empdatedebut = db.Column(db.Date,nullable=False)
    empdatefin = db.Column(db.Date)

class empsalaire(db.Model):
    salaireid = db.Column(db.Integer,primary_key=True)
    empnom=db.Column(db.String(100),nullable=False)
    salaire=db.Column(db.Float)
    fromdate=db.Column(db.Date)
    todate=db.Column(db.Date)
    monthsnumbers=db.Column(db.Integer)



class medsalaire(db.Model):
    salaireid=db.Column(db.Integer,primary_key=True)
    mednom=db.Column(db.String(100),nullable=False)
    salaire=db.Column(db.Float)
    fromdate=db.Column(db.Date)
    todate=db.Column(db.Date)
    monthsnumbers=db.Column(db.Integer)

class EmployeePercentageactivity(db.Model):
    activiteId=db.Column(db.Integer,primary_key=True)
    employee=db.Column(db.String(80),nullable=False)
    fonction=db.Column(db.String(80))
    docteur=db.Column(db.String(80))
    pourcentages=db.Column(db.Float)
    fromdate=db.Column(db.Date)
    todate=db.Column(db.Date)


class Percentageactivity(db.Model):
    activiteId=db.Column(db.Integer,primary_key=True)
    docteur=db.Column(db.String(80),nullable=False)
    de=db.Column(db.Integer,nullable=False)
    a=db.Column(db.Integer,nullable=False)
    pourcentages=db.Column(db.Float,nullable=False)    


class Doctor(db.Model):
    doctorid=db.Column(db.Integer,primary_key=True)
    doctorname=db.Column(db.String(80),nullable=False,unique=True)
    doctorspeciality=db.Column(db.String(80),nullable=False)
    isActive = db.Column(db.Boolean,nullable=False)
    percentageShare = db.Column(db.Float,nullable=False)
    conditionsfinanciers=db.Column(db.String(250),nullable=False)

    pourcentagesalaire=db.Column(db.Float)
    pourcentagechargessociales=db.Column(db.Float)
    surfacecentremedical = db.Column(db.Float)
    surfacecommunes=db.Column(db.Float)
    loyermensuel=db.Column(db.Float)
    surfaceaccordee=db.Column(db.Float)
    nettoyage=db.Column(db.Float)
    conciergerie=db.Column(db.Float)
    salairepersonnel=db.Column(db.Float)
    telephonieinternet=db.Column(db.Float)
    logicielaxenita=db.Column(db.Float)
    nbmedicins=db.Column(db.Float)
    assurances =db.Column(db.Float)
    blanchisserieleman=db.Column(db.Float)
    informatique=db.Column(db.Float)
    nblocaux=db.Column(db.Float)
    nbmedicinsrepartirfrais=db.Column(db.Float)
    receptionniste=db.Column(db.Float)
    Apprentie=db.Column(db.Float)
    simplify=db.Column(db.Float)
    steriswiss=db.Column(db.Float)


class Paymenttype(db.Model):
    paiementstypeid = db.Column(db.Integer,primary_key=True)
    paiementsType = db.Column(db.String(80),nullable=False)  


class Payment(db.Model):
    paiementsId = db.Column(db.Integer,primary_key=True)
    paiementsType = db.Column(db.String(80),nullable=False)
    paiementsNom = db.Column(db.String(80),nullable=False)
    somme = db.Column(db.Float,nullable=False)
    comment = db.Column(db.String(250))
    date = db.Column(db.Date,nullable=False)

class Salairetype(db.Model):
    salairetypeid = db.Column(db.Integer,primary_key=True)
    salaireType = db.Column(db.String(80),nullable=False)  

"""ALTER TABLE payment
        ADD Valide nvarchar(50) NULL --Or NOT NULL.
 
    DEFAULT ('pasvalide')--Optional Default-Constraint.
WITH VALUES --Add if Column is Nullable and you want the Default Value for Existing Records."""
class Salaire(db.Model):
    salaireId = db.Column(db.Integer,primary_key=True)
    salaireType = db.Column(db.String(80),nullable=False)
    salaireNom = db.Column(db.String(80),nullable=False)
    somme = db.Column(db.Float,nullable=False)
    comment = db.Column(db.String(250))
    date = db.Column(db.Date,nullable=False)    

class Facturationtype(db.Model):
    facturationtypeid = db.Column(db.Integer,primary_key=True)
    facturationType = db.Column(db.String(80),nullable=False)
    EstRetrocession = db.Column(db.String(30),nullable=False)

class Facturation(db.Model):
    facturationId = db.Column(db.Integer,primary_key=True)
    facturationType = db.Column(db.String(80),nullable=False)
    facturationNom = db.Column(db.String(80),nullable=False)
    somme = db.Column(db.Float,nullable=False)
    comment = db.Column(db.String(250))
    date = db.Column(db.Date,nullable=False)

class Retrocessiontype(db.Model):
    retrocessiontypeid = db.Column(db.Integer,primary_key=True)
    retrocessionType = db.Column(db.String(80),nullable=False)
    pnl_included = db.Column(db.String(80),nullable=True)
    

class Retrocession(db.Model):
    retrocessionId = db.Column(db.Integer,primary_key=True)
    retrocessionType = db.Column(db.String(80),nullable=False)
    retrocessionNom = db.Column(db.String(80),nullable=False)
    somme = db.Column(db.Float,nullable=False)
    comment = db.Column(db.String(250))
    date = db.Column(db.Date,nullable=False)  
    Valide= db.Column(db.String(30),nullable=False)  


class Dentisterietype(db.Model):
    dentisterietypeId=db.Column(db.Integer,primary_key=True)
    dentisterietype = db.Column(db.String(80),nullable=False)

class Dentisterie(db.Model):
    dentisterieId = db.Column(db.Integer,primary_key=True)
    dentisterieType = db.Column(db.String(80),nullable=False)
    dentisterieNom = db.Column(db.String(80),nullable=False)
    somme=db.Column(db.Float,nullable=False)
    date=db.Column(db.Date,nullable=False)

class Encaissement(db.Model):
    encaissementId=db.Column(db.Integer,primary_key=True)
    encaissementNom=db.Column(db.String(80),nullable=False)
    encaissementDate=db.Column(db.Date,nullable=False)
    montant=db.Column(db.Float,nullable=False)
    banque=db.Column(db.String(80),nullable=False)
    comment = db.Column(db.String(250))


class Doctorpayment(db.Model):
    doctorpaiementId=db.Column(db.Integer,primary_key=True)
    doctorname=db.Column(db.String(80),nullable=False)
    paimentnom=db.Column(db.String(80),nullable=False)
    doctorpaiementsomme=db.Column(db.Float,nullable=False)
    date=db.Column(db.Date,nullable=False)

class Fraismaterieltype(db.Model):
    fraismaterieltypeId=db.Column(db.Integer,primary_key=True)
    fraismaterieltype = db.Column(db.String(80),nullable=False)

class Fraismateriel(db.Model):
    fraismaterielId=db.Column(db.Integer,primary_key=True)
    fraismaterieltype=db.Column(db.String(80),nullable=False)
    fraismaterielnom=db.Column(db.String(80),nullable=False)
    fraismaterielsomme=db.Column(db.Float,nullable=False)
    fraismaterieldate=db.Column(db.Date,nullable=False)
    comment=db.Column(db.String(250))

class Leasing(db.Model):
    LeasingId=db.Column(db.Integer,primary_key=True)
    locationNom=db.Column(db.String(80),nullable=False)
    docteur=db.Column(db.String(80),nullable=False)
    debut=db.Column(db.Date,nullable=False)
    finPrevue=db.Column(db.Date,nullable=False)
    paiement=db.Column(db.Float,nullable=True)
    paiementinitial=db.Column(db.Float,nullable=True)




class Setting(db.Model):
    settingsid=db.Column(db.Integer,primary_key=True)
    moisavant=db.Column(db.Integer,nullable=False)
    moislimit=db.Column(db.Integer,nullable=False)


class Constants(db.Model):
    constantsid=db.Column(db.Integer,primary_key=True)
    nbdentistehygieniste=db.Column(db.Float,nullable=False)
    nbmedecins=db.Column(db.Float,nullable=False)
    nbept=db.Column(db.Float,nullable=False)
    nbemployes=db.Column(db.Float,nullable=False)
    year=db.Column(db.Integer,nullable=False)


@app.route('/')
def home():
    
    return redirect(url_for('login'))

@app.route('/login',methods=['GET','POST'])
def login():
    form=LoginForm()
    
    if form.validate_on_submit():
        user=User.query.filter_by(username=form.username.data).first()
        if user:
            if user.password==form.password.data:
                login_user(user)
                return redirect(url_for('dashboard'))
            else:
                flash("Incorrect credentials")
        else:
            flash("Incorrect credentials")
    return render_template("login.html",form=form)





def get_ls_for_dashboard(query):
    encaissementgraphlist=db.engine.execute(query)
    encaissementgraphdf=convert_list_to_dataframe(encaissementgraphlist)
    encaissementgraphdf=encaissementgraphdf.round(2)
    
    if len(encaissementgraphdf)==0:
        encaissementgraphdf = pd.DataFrame(data=[["Pas de données disponibles".upper(),0.000001]], columns=['Pas de données disponibles', 'somme'])

    ls=encaissementgraphdf.values.tolist()
    ls.insert(0,encaissementgraphdf.columns.tolist())
    total = encaissementgraphdf["somme"].sum()
    #total = '{:0,.2f}'.format(total)

    return ls,total


@app.route('/dashboard',methods=['GET','POST'])
#@app.route('/dashboard/fromdate=<fromdate>/todate=<todate>',methods=['GET','POST'])
@login_required
def dashboard():
    print(request.args)
    '''fromm=request.args["fromdate"]
    too=request.args["todate"]'''
    try:
        encls,enctotal = get_ls_for_dashboard("""select banque, SUM(montant) AS somme from encaissement where Valide='valide' and encaissementDate BETWEEN '{0}' and '{1}'  group by banque""".format(request.args["fromdate"],request.args["todate"]))
        paymentls,paysum = get_ls_for_dashboard("""Select paiementstype as PaiementType, SUM(somme)  as somme from payment where Valide='valide' and date BETWEEN '{0}' and '{1}' group by paiementsType """.format(request.args["fromdate"],request.args["todate"]))
        facturationls,facturationsum = get_ls_for_dashboard("""select facturation.facturationtype as FacturationType, Sum(somme) as somme from facturation inner join facturationtype on facturation.facturationtype=facturationtype.facturationtype where Valide='valide' and EstRetrocession=0 and date BETWEEN '{0}' and '{1}' group by facturation.facturationType""".format(request.args["fromdate"],request.args["todate"]))
        #retrocessionls,retrocessionsum = get_ls_for_dashboard("""select facturation.facturationtype as FacturationType, Sum(somme) as somme from facturation inner join facturationtype on facturation.facturationtype=facturationtype.facturationtype where Valide='valide' and EstRetrocession=1 and date BETWEEN '{0}' and '{1}' group by facturation.facturationType""".format(request.args["fromdate"],request.args["todate"]))
        retrocessionls,retrocessionsum = get_ls_for_dashboard("""select retrocession.retrocessiontype as RetrocessionType, Sum(somme) as somme from retrocession  where Valide='valide' and date BETWEEN '{0}' and '{1}' group by retrocession.retrocessionType""".format(request.args["fromdate"],request.args["todate"]))
        retrocessionlsEXCLUDINGPNL,retrocessionsumEXCLUDINGPNL = get_ls_for_dashboard("""select retrocession.retrocessiontype as RetrocessionType, Sum(somme) as somme from retrocession inner join retrocessiontype on retrocession.retrocessionType=retrocessiontype.retrocessionType  where Valide='valide' and date BETWEEN '{0}' and '{1}' and retrocessionType.pnl_included=1 group by retrocession.retrocessionType""".format(request.args["fromdate"],request.args["todate"]))
        fraisls,fraissum = get_ls_for_dashboard("""Select fraismaterieltype as FraisMaterielType, SUM(fraismaterielsomme)  as somme from fraismateriel where Valide='valide' and fraismaterieldate BETWEEN '{0}' and '{1}' group by fraismaterielType""".format(request.args["fromdate"],request.args["todate"]))
        
    except:
        encls,enctotal = get_ls_for_dashboard("""select banque, SUM(montant) AS somme from encaissement where Valide='valide' and YEAR(encaissementDate)={0}  group by banque""".format(datetime.datetime.now().year))
        paymentls,paysum = get_ls_for_dashboard("""Select paiementstype as PaiementType, SUM(somme)  as somme from payment where Valide='valide' and YEAR(date)={0} group by paiementsType """.format(datetime.datetime.now().year))
        facturationls,facturationsum = get_ls_for_dashboard("""select facturation.facturationtype as FacturationType, Sum(somme) as somme from facturation inner join facturationtype on facturation.facturationtype=facturationtype.facturationtype where Valide='valide' and YEAR(date)={0} and EstRetrocession=0 group by facturation.facturationType""".format(datetime.datetime.now().year))
        #retrocessionls,retrocessionsum = get_ls_for_dashboard("""select facturation.facturationtype as FacturationType, Sum(somme) as somme from facturation inner join facturationtype on facturation.facturationtype=facturationtype.facturationtype where Valide='valide' and YEAR(date)={0} and EstRetrocession=1 group by facturation.facturationType""".format(datetime.datetime.now().year))
        retrocessionls,retrocessionsum = get_ls_for_dashboard("""select retrocession.retrocessiontype as RetrocessionType, Sum(somme) as somme from retrocession  where Valide='valide' and YEAR(date)={0}  group by retrocession.retrocessionType""".format(datetime.datetime.now().year))
        retrocessionlsEXCLUDINGPNL,retrocessionsumEXCLUDINGPNL = get_ls_for_dashboard("""select retrocession.retrocessiontype as RetrocessionType, Sum(somme) as somme from retrocession  inner join retrocessiontype on retrocession.retrocessionType=retrocessiontype.retrocessionType where Valide='valide' and YEAR(date)={0} and retrocessiontype.pnl_included=1  group by retrocession.retrocessionType""".format(datetime.datetime.now().year))
        fraisls,fraissum = get_ls_for_dashboard("""Select fraismaterieltype as FraisMaterielType, SUM(fraismaterielsomme)  as somme from fraismateriel where Valide='valide' and YEAR(fraismaterieldate)={0} group by fraismaterielType""".format(datetime.datetime.now().year))
    pnl=enctotal-(paysum+retrocessionsumEXCLUDINGPNL)
    paysum = '{:0,.2f}'.format(paysum)
    '''paysum=paysum.replace('.','|')
    paysum=paysum.replace(',','.')
    paysum=paysum.replace('|',',') '''
    fraissum='{:0,.2f}'.format(fraissum)
    retrocessionsum='{:0,.2f}'.format(retrocessionsum)
    pnl= '{:0,.2f}'.format(pnl)


    facturationsum='{:0,.2f}'.format(facturationsum)
    enctotal='{:0,.2f}'.format(enctotal)
    try:
        dterngeForm=DateRangeForm(startdate=datetime.datetime.strptime(request.args["fromdate"],'%Y-%m-%d'),enddate=datetime.datetime.strptime(request.args["todate"],'%Y-%m-%d'))
    except:
        dterngeForm=DateRangeForm()

    if dterngeForm.validate_on_submit():
        return redirect(url_for('dashboard',fromdate=dterngeForm.startdate.data,todate=dterngeForm.enddate.data))


    return render_template('app.html',content='widget',username=(current_user.username).title(),user_role=current_user.role,encdf=encls,paymentgrph=paymentls,paysum=paysum,pnl=pnl,facturationgraph=facturationls,facturationsum=facturationsum,enctotal=enctotal,fraissum=fraissum,retrocessionsum=retrocessionsum,dterngeForm=dterngeForm)


@app.route('/doctorpayment',methods=['GET','POST'])
@app.route('/doctorpayment/search=<search>',methods=['GET','POST'])
@login_required
def doctorpayment(search=""):
    try:
        #print(request.args["validfilter"])
        validfilter_var=request.args["validfilter"]
    except:
        validfilter_var=""    
    try:
        fromdate_var=request.args["fromdate"]
        fromdte=True
        #print(fromdate_var)
    except:
        fromdate_var="1990-1-1"
        fromdte=False
    
    try:
        todate_var=request.args["todate"]
        todte=True
    except:
        curryear=datetime.datetime.now().year
        todate_var="{0}-1-1".format(str(curryear+200))
        todte=False    
    try:
        amountfrom_var=request.args["amountfrom"]
    except:
        amountfrom_var=None
    try:
        amountto_var=request.args["amountto"]
    except:
        amountto_var=None            
    filtervalid_form=FilterNonValidItemsForm(validity=validfilter_var,fromdate=datetime.datetime.strptime(fromdate_var,'%Y-%m-%d') if fromdte!=False else None,todate=datetime.datetime.strptime(todate_var,'%Y-%m-%d') if todte!=False else None,amountfrom=amountfrom_var,amountto=amountto_var)    
    form=AddDoctorPaymentForm()
    searchform=SearchForm(searchstring=search)
    choices=[]
    #choices.append(("---","---"))
    choices=choices+[(doctor.doctorname,doctor.doctorname)for doctor in db.engine.execute("select doctorname from doctor").fetchall()]   
    form.doctorname.choices=choices

    paymentchoices=[]
    paymentchoices.append(("addnew","Ajouter Nouveau ?"))
    paymentchoices=paymentchoices+[(doctorpay.paimentnom,doctorpay.paimentnom)for doctorpay in db.engine.execute("select DISTINCT paimentnom   from doctorpayment").fetchall()]
    form.paimentnom.choices=paymentchoices


    DoctorPayments=db.engine.execute("select * from DoctorPayment where paimentnom LIKE '%{0}%' and Valide LIKE '{1}%' and date BETWEEN '{2}' and '{3}'  and doctorpaiementsomme BETWEEN '{4}' and '{5}' order by doctorpaiementId DESC".format(search,validfilter_var,fromdate_var,todate_var,0 if amountfrom_var==None else amountfrom_var,99999999 if amountto_var==None else amountto_var))
    DoctorPaymentitems=DoctorPayments.fetchall()
    headersDoctorPayment=DoctorPayments.keys()

    DoctorPaymentitems_disp=[]
    
    for item in DoctorPaymentitems:
        itemtmp=list(item)
        s = '{:0,.2f}'.format(float(item[3]))

        
        itemtmp[3]=s
        DoctorPaymentitems_disp.append(itemtmp)
    
    if filtervalid_form.is_submitted() and filtervalid_form.sub.data:
        
        return redirect(url_for('doctorpayment',validfilter=filtervalid_form.validity.data,fromdate=filtervalid_form.fromdate.data,todate=filtervalid_form.todate.data,amountfrom=filtervalid_form.amountfrom.data,amountto=filtervalid_form.amountto.data))          



    if searchform.validate_on_submit() and searchform.searchsubmit.data:
        if searchform.searchstring.data !="":
            return redirect(url_for('doctorpayment',search=searchform.searchstring.data))
        else:
            return redirect(url_for('doctorpayment'))    
    else:
        print(searchform.errors)

    if form.validate_on_submit():
        qry = Setting.query.filter().first()
        monthdelta=(date.today().year - form.date.data.year) * 12 + date.today().month - form.date.data.month
        print(monthdelta,qry.moisavant)
        if monthdelta<qry.moisavant  and monthdelta>qry.moislimit*-1:        
            if form.paimentnom.data=="addnew":
                new_doctorpayment = Doctorpayment(doctorname=form.doctorname.data,paimentnom=form.paimentnomALT.data,doctorpaiementsomme=form.doctorpaiementsomme.data,date=form.date.data)
            else:
                new_doctorpayment = Doctorpayment(doctorname=form.doctorname.data,paimentnom=form.paimentnom.data,doctorpaiementsomme=form.doctorpaiementsomme.data,date=form.date.data)
            if isinstance(form.doctorpaiementsomme.data, int) or isinstance(form.doctorpaiementsomme.data, float) and form.is_submitted():
                db.session.add(new_doctorpayment)
                db.session.commit()
                return redirect(url_for('doctorpayment'))
            else:
                flash("Données invalides. Veuillez revérifier et soumettre à nouveau")
        else:
            flash("Vous ne pouvez pas entrer de données à partir de cette date!")            
    else:
        #flash("Invalid Data: ",form.errors)
        pass

    if "paiement_medecin" in current_user.access or current_user.access=="all":
        return render_template('generalform.html',forms=[form],hasDynamicSelector=False,table=DoctorPaymentitems_disp,headers=headersDoctorPayment,dbtable="doctorpayment",dbtableid="doctorpaiementId",user_role=current_user.role,searchform=searchform,module_name="Frais d'installation",filtervalid_form=filtervalid_form)
    else:
        return render_template('NOT_AUTHORIZED.html')

@app.route('/encaissement',methods=['GET','POST'])
@app.route('/encaissement/search=<search>',methods=['GET','POST'])
@login_required
def encaissement(search=""):
    try:
        #print(request.args["validfilter"])
        validfilter_var=request.args["validfilter"]
    except:
        validfilter_var=""    
    try:
        fromdate_var=request.args["fromdate"]
        fromdte=True
        #print(fromdate_var)
    except:
        fromdate_var="1990-1-1"
        fromdte=False
    
    try:
        todate_var=request.args["todate"]
        todte=True
    except:
        curryear=datetime.datetime.now().year
        todate_var="{0}-1-1".format(str(curryear+200))
        todte=False     
    try:
        amountfrom_var=request.args["amountfrom"]
    except:
        amountfrom_var=None
    try:
        amountto_var=request.args["amountto"]
    except:
        amountto_var=None           
    filtervalid_form=FilterNonValidItemsForm(validity=validfilter_var,fromdate=datetime.datetime.strptime(fromdate_var,'%Y-%m-%d') if fromdte!=False else None,todate=datetime.datetime.strptime(todate_var,'%Y-%m-%d') if todte!=False else None,amountfrom=amountfrom_var,amountto=amountto_var)      
    form = AddEncaissementForm()
    export2excel_frm=Export_to_excel()
    searchform=SearchForm(searchstring=search)
    encaissementnameschoices = []
    encaissementnameschoices.append(("addnew","Ajouter Nouveau ?"))
    for encname in db.engine.execute("select * from encaissement").fetchall():
        if not any(obj[0] == encname.encaissementNom for obj in encaissementnameschoices):
            encaissementnameschoices.append((encname.encaissementNom,encname.encaissementNom))

    form.encaissementNom.choices = encaissementnameschoices
    encaissements=db.engine.execute("select * from encaissement where encaissementNom LIKE '%{0}%' and Valide LIKE '{1}%' and encaissementDate BETWEEN '{2}' and '{3}'  and montant BETWEEN '{4}' and '{5}'  order by encaissementId DESC".format(search,validfilter_var,fromdate_var,todate_var,0 if amountfrom_var==None else amountfrom_var,99999999 if amountto_var==None else amountto_var))
    encaissementitems=encaissements.fetchall()
    headersencaissement=encaissements.keys()

    encaissementitems_disp=[]
    
    for item in encaissementitems:
        itemtmp=list(item)
        s = '{:0,.2f}'.format(float(item[3]))

        
        itemtmp[3]=s
        encaissementitems_disp.append(itemtmp)
    


    if filtervalid_form.is_submitted() and filtervalid_form.sub.data:
        
        return redirect(url_for('encaissement',validfilter=filtervalid_form.validity.data,fromdate=filtervalid_form.fromdate.data,todate=filtervalid_form.todate.data,amountfrom=filtervalid_form.amountfrom.data,amountto=filtervalid_form.amountto.data))          
        

    if searchform.validate_on_submit() and searchform.searchsubmit.data:
        if searchform.searchstring.data !="":
            return redirect(url_for('encaissement',search=searchform.searchstring.data))
        else:
            return redirect(url_for('encaissement'))    
    else:
        print(searchform.errors)

    if form.is_submitted() and request.method=='POST' and form.submit.data:
        qry = Setting.query.filter().first()
        monthdelta=(date.today().year - form.encaissementDate.data.year) * 12 + date.today().month - form.encaissementDate.data.month
        print(monthdelta,qry.moisavant)
        if monthdelta<qry.moisavant  and monthdelta>qry.moislimit*-1:        
            if form.encaissementNom.data!="addnew":
                new_encaissement = Encaissement(encaissementNom=form.encaissementNom.data,encaissementDate=form.encaissementDate.data,montant=form.montant.data,banque=form.banque.data,comment=form.comment.data) 
            else:
                new_encaissement = Encaissement(encaissementNom=form.encaissementNomALT.data,encaissementDate=form.encaissementDate.data,montant=form.montant.data,banque=form.banque.data,comment=form.comment.data) 
            if isinstance(form.montant.data,int) or isinstance(form.montant.data,float):
                db.session.add(new_encaissement)
                db.session.commit()
                return redirect(url_for('encaissement'))
            else:
                flash("Données invalides. Veuillez revérifier et soumettre à nouveau")
        else:
            flash("Vous ne pouvez pas entrer de données à partir de cette date!")        

    encaissementdf=pd.DataFrame(encaissementitems,columns=headersencaissement)
    if export2excel_frm.validate_on_submit() and export2excel_frm.export_submit.data:
        current_date=datetime.datetime.now()
        current_num_timestamp="{0}{1}{2}_{3}{4}{5}".format(current_date.year,current_date.month,current_date.day,current_date.hour,current_date.minute,current_date.second)
        excel_report_path=r"{0}\reporting_temporary\ENCAISSEMENT_{1}.xlsx".format(file_download_location,current_num_timestamp)
        encaissementdf.to_excel(excel_report_path,index=False)

        return send_file(excel_report_path)

    if "encaissement" in current_user.access or current_user.access=="all":
        return render_template('app.html',content='encaissement',username=(current_user.username).title(),forms=[form],hasDynamicSelector=True,table=encaissementitems_disp,headers=headersencaissement,dbtable="encaissement",dbtableid="encaissementId",user_role=current_user.role,searchform=searchform,module_name="Encaissement-Avance",export_form=export2excel_frm,filtervalid_form=filtervalid_form)
    else:
        return render_template('NOT_AUTHORIZED.html')


@app.route('/dentisterie',methods=['GET','POST'])
@app.route('/dentisterie/search=<search>',methods=['GET','POST'])
@login_required
def dentisterie(search=""):
    try:
        #print(request.args["validfilter"])
        validfilter_var=request.args["validfilter"]
    except:
        validfilter_var=""  
    try:
        fromdate_var=request.args["fromdate"]
        fromdte=True
        #print(fromdate_var)
    except:
        fromdate_var="1990-1-1"
        fromdte=False
    
    try:
        todate_var=request.args["todate"]
        todte=True
    except:
        curryear=datetime.datetime.now().year
        todate_var="{0}-1-1".format(str(curryear+200))
        todte=False          
    try:
        amountfrom_var=request.args["amountfrom"]
    except:
        amountfrom_var=None
    try:
        amountto_var=request.args["amountto"]
    except:
        amountto_var=None        
    filtervalid_form=FilterNonValidItemsForm(validity=validfilter_var,fromdate=datetime.datetime.strptime(fromdate_var,'%Y-%m-%d') if fromdte!=False else None,todate=datetime.datetime.strptime(todate_var,'%Y-%m-%d') if todte!=False else None,amountfrom=amountfrom_var,amountto=amountto_var)    
    form=AddDentistryInfoForm()
    searchform=SearchForm(searchstring=search)
    choices=[]
    choices.append(("---","---"))
    choices=choices+[(denttype.dentisterietype,denttype.dentisterietype)for denttype in db.engine.execute("select * from dentisterietype").fetchall()]   
    form.dentisterieType.choices=choices
    form.dentisterieNom.choices= [(dentname.dentisterieId,dentname.dentisterieNom) for dentname in Dentisterie.query.filter_by(dentisterieType='---').all()]
    dentisterie=db.engine.execute("select dentisterieId as ID,dentisterieType as Type,dentisterieNom as Nom,somme as Somme,date as Date,Valide as Valide from dentisterie where dentisterieNom LIKE '%{0}%' and Valide LIKE '{1}%' and date BETWEEN '{2}' and '{3}'  and somme BETWEEN '{4}' and '{5}' order by dentisterieId DESC".format(search,validfilter_var,fromdate_var,todate_var,0 if amountfrom_var==None else amountfrom_var,99999999 if amountto_var==None else amountto_var))
    dentisterieitems=dentisterie.fetchall()
    headersdentisterie=dentisterie.keys()

    dentisterieitems_disp=[]
    
    for item in dentisterieitems:
        itemtmp=list(item)
        s = '{:0,.2f}'.format(float(item[3]))

        
        itemtmp[3]=s
        dentisterieitems_disp.append(itemtmp)
    

    if filtervalid_form.is_submitted() and filtervalid_form.sub.data:
        
        return redirect(url_for('dentisterie',validfilter=filtervalid_form.validity.data,fromdate=filtervalid_form.fromdate.data,todate=filtervalid_form.todate.data,amountfrom=filtervalid_form.amountfrom.data,amountto=filtervalid_form.amountto.data))          
    



    if searchform.validate_on_submit() and searchform.searchsubmit.data:
        if searchform.searchstring.data !="":
            return redirect(url_for('dentisterie',search=searchform.searchstring.data))
        else:
            return redirect(url_for('dentisterie'))    
    else:
        print(searchform.errors)

    if form.is_submitted() and request.method=='POST':
        qry = Setting.query.filter().first()
        monthdelta=(date.today().year - form.date.data.year) * 12 + date.today().month - form.date.data.month
        print(monthdelta,qry.moisavant)
        if monthdelta<qry.moisavant  and monthdelta>qry.moislimit*-1:
            if form.dentisterieNom.data!="addnew":
                new_dentisterie =Dentisterie(dentisterieType=form.dentisterieType.data,dentisterieNom=form.dentisterieNom.data,somme=form.somme.data,date=form.date.data)
            else:
                new_dentisterie =Dentisterie(dentisterieType=form.dentisterieType.data,dentisterieNom=form.dentisterieNomALT.data,somme=form.somme.data,date=form.date.data)
            if isinstance(form.somme.data, int) or isinstance(form.somme.data, float):
                db.session.add(new_dentisterie)
                db.session.commit()
                return redirect(url_for('dentisterie'))
            else:
                flash("Données invalides. Veuillez revérifier et soumettre à nouveau")
        else:
            flash("Vous ne pouvez pas entrer de données à partir de cette date!")                
    
    if "dentisterie" in current_user.access or current_user.access=="all":
        return render_template('generalform.html',forms=[form],hasDynamicSelector=True,table=dentisterieitems_disp,headers=headersdentisterie,dbtable="dentisterie",dbtableid="dentisterieId",user_role=current_user.role,searchform=searchform,module_name="Dentisterie",filtervalid_form=filtervalid_form)
    else:
        return render_template('NOT_AUTHORIZED.html')    

@app.route('/dentisterienames/<dentisterietype>')
def dentisterienames(dentisterietype):
    dentisterieType_dec= urllib.parse.unquote(dentisterietype.replace("*","%"))
    dentisterienames = Dentisterie.query.filter_by(dentisterieType=dentisterieType_dec).all()
    doctornames=Doctor.query.all()
    
    Arry=[]
    for dentisterie in dentisterienames:
        
        if not any(obj['name'] == dentisterie.dentisterieNom for obj in Arry):
            
            dentisterieObj={}
            dentisterieObj['id']=dentisterie.dentisterieId
            dentisterieObj['name']=dentisterie.dentisterieNom
            Arry.append(dentisterieObj)
    for doctor in doctornames:
            if not any(obj['name'] == doctor.doctorname for obj in Arry):
                docObj={}
                docObj['id']=doctor.doctorid
                docObj['name']=doctor.doctorname
                Arry.append(docObj)
            

    return jsonify({'dentisterienames':Arry})


@app.route('/facturation',methods=['GET','POST'])
@app.route('/facturation/search=<search>',methods=['GET','POST'])
@login_required
def facturation(search=""):
    try:
        #print(request.args["validfilter"])
        validfilter_var=request.args["validfilter"]
    except:
        validfilter_var=""  
    try:
        fromdate_var=request.args["fromdate"]
        fromdte=True
        #print(fromdate_var)
    except:
        fromdate_var="1990-1-1"
        fromdte=False
    
    try:
        todate_var=request.args["todate"]
        todte=True
    except:
        curryear=datetime.datetime.now().year
        todate_var="{0}-1-1".format(str(curryear+200))
        todte=False  
    try:
        amountfrom_var=request.args["amountfrom"]
    except:
        amountfrom_var=None
    try:
        amountto_var=request.args["amountto"]
    except:
        amountto_var=None

    filtervalid_form=FilterNonValidItemsForm(validity=validfilter_var,fromdate=datetime.datetime.strptime(fromdate_var,'%Y-%m-%d') if fromdte!=False else None,todate=datetime.datetime.strptime(todate_var,'%Y-%m-%d') if todte!=False else None,amountfrom=amountfrom_var,amountto=amountto_var)    
    form = AddFacturationForm()
    export2excel_frm=Export_to_excel()
    searchform=SearchForm(searchstring=search)
    choices=[]
    choices.append(("---","---"))
    choices=choices+[(facttype.facturationType,facttype.facturationType)for facttype in db.engine.execute("select * from facturationtype").fetchall()]
    form.facturationType.choices = choices
    form.facturationNom.choices= [(factname.facturationId,factname.facturationNom) for factname in Facturation.query.filter_by(facturationType='---').all()]
    facturations=db.engine.execute("select facturationId as ID,facturationType as Type,facturationNom as Nom,somme as Somme,date as Date,comment as Comment,Valide as Valide from facturation where facturationnom LIKE '%{0}%' and Valide LIKE '{1}%' and date BETWEEN '{2}' and '{3}'  and somme BETWEEN '{4}' and '{5}' order by facturationId DESC".format(search,validfilter_var,fromdate_var,todate_var,0 if amountfrom_var==None else amountfrom_var,99999999 if amountto_var==None else amountto_var))
    facturationsitems=facturations.fetchall()
    headersfacturations=facturations.keys()

    facturationdf=pd.DataFrame(facturationsitems,columns=headersfacturations)

    facturationsitems_disp=[]
    
    for item in facturationsitems:
        itemtmp=list(item)
        s = '{:0,.2f}'.format(float(item[3]))

        
        itemtmp[3]=s
        facturationsitems_disp.append(itemtmp)

    if filtervalid_form.is_submitted() and filtervalid_form.sub.data:
        
        return redirect(url_for('facturation',validfilter=filtervalid_form.validity.data,fromdate=filtervalid_form.fromdate.data,todate=filtervalid_form.todate.data,amountfrom=filtervalid_form.amountfrom.data,amountto=filtervalid_form.amountto.data))          
        

    if export2excel_frm.validate_on_submit() and export2excel_frm.export_submit.data:
        current_date=datetime.datetime.now()
        current_num_timestamp="{0}{1}{2}_{3}{4}{5}".format(current_date.year,current_date.month,current_date.day,current_date.hour,current_date.minute,current_date.second)
        excel_report_path=r"{0}\reporting_temporary\FACTURATION_{1}.xlsx".format(file_download_location,current_num_timestamp)
        facturationdf.to_excel(excel_report_path,index=False)

        return send_file(excel_report_path)

    if searchform.validate_on_submit() and searchform.searchsubmit.data:
        if searchform.searchstring.data !="":
            return redirect(url_for('facturation',search=searchform.searchstring.data))
        else:
            return redirect(url_for('facturation'))    
    else:
        print(searchform.errors)

    if form.is_submitted() and request.method=='POST' and form.submit.data:
        qry = Setting.query.filter().first()
        monthdelta=(date.today().year - form.date.data.year) * 12 + date.today().month - form.date.data.month
        print(monthdelta,qry.moisavant)
        if monthdelta<qry.moisavant  and monthdelta>qry.moislimit*-1:
            if form.facturationNom.data!="addnew":
                new_facturation =Facturation(facturationType=form.facturationType.data,facturationNom=form.facturationNom.data,somme=form.somme.data,comment=form.comment.data,date=form.date.data)
            else:
                new_facturation =Facturation(facturationType=form.facturationType.data,facturationNom=form.facturationNomALT.data,somme=form.somme.data,comment=form.comment.data,date=form.date.data)
            if isinstance(form.somme.data, int) or isinstance(form.somme.data, float):
                db.session.add(new_facturation)
                db.session.commit()
                return redirect(url_for('facturation'))
            else:
                flash("Données invalides. Veuillez revérifier et soumettre à nouveau")
        else:
            flash("Vous ne pouvez pas entrer de données à partir de cette date!")        
    

    if "facturation" in current_user.access or current_user.access=="all":
        return render_template('app.html',content='facturation',username=(current_user.username).title(),forms=[form],hasDynamicSelector=True,table=facturationsitems_disp,headers=headersfacturations,dbtable="facturation",dbtableid="facturationId",user_role=current_user.role,searchform=searchform,module_name="Facturation",export_form=export2excel_frm,filtervalid_form=filtervalid_form)
    else:
        return render_template('NOT_AUTHORIZED.html')

@app.route('/facturationnames/<facturationtype>')
def facturationnames(facturationtype):
    facturationtype_dec= urllib.parse.unquote(facturationtype.replace("*","%").replace("~","/"))
    facturationnames = Facturation.query.filter_by(facturationType=facturationtype_dec).all()
    doctornames=Doctor.query.all()
    
    Arry=[]
    for facturation in facturationnames:
        
        if not any(obj['name'] == facturation.facturationNom for obj in Arry):
            
            facturationObj={}
            facturationObj['id']=facturation.facturationId
            facturationObj['name']=facturation.facturationNom
            Arry.append(facturationObj)
    for doctor in doctornames:
            if not any(obj['name'] == doctor.doctorname for obj in Arry):
                docObj={}
                docObj['id']=doctor.doctorid
                docObj['name']=doctor.doctorname
                Arry.append(docObj)
            

    return jsonify({'facturationnames':Arry})

@app.route('/retrocession',methods=['GET','POST'])
@app.route('/retrocession/search=<search>',methods=['GET','POST'])
@login_required
def retrocession(search=""):
    try:
        #print(request.args["validfilter"])
        validfilter_var=request.args["validfilter"]
    except:
        validfilter_var=""  
    try:
        fromdate_var=request.args["fromdate"]
        fromdte=True
        #print(fromdate_var)
    except:
        fromdate_var="1990-1-1"
        fromdte=False
    
    try:
        todate_var=request.args["todate"]
        todte=True
    except:
        curryear=datetime.datetime.now().year
        todate_var="{0}-1-1".format(str(curryear+200))
        todte=False  
    try:
        amountfrom_var=request.args["amountfrom"]
    except:
        amountfrom_var=None
    try:
        amountto_var=request.args["amountto"]
    except:
        amountto_var=None        
    filtervalid_form=FilterNonValidItemsForm(validity=validfilter_var,fromdate=datetime.datetime.strptime(fromdate_var,'%Y-%m-%d') if fromdte!=False else None,todate=datetime.datetime.strptime(todate_var,'%Y-%m-%d') if todte!=False else None,amountfrom=amountfrom_var,amountto=amountto_var)    
    form = AddRetrocessionForm()
    export2excel_frm=Export_to_excel()
    searchform=SearchForm(searchstring=search)
    choices=[]
    choices.append(("---","---"))
    choices=choices+[(facttype.retrocessionType,facttype.retrocessionType)for facttype in db.engine.execute("select * from retrocessiontype").fetchall()]
    form.retrocessionType.choices = choices
    form.retrocessionNom.choices= [(factname.retrocessionId,factname.retrocessionNom) for factname in Retrocession.query.filter_by(retrocessionType='---').all()]
    retrocessions=db.engine.execute("select retrocessionId as ID,retrocessionType as Type,retrocessionNom as Nom,somme as Somme,date as Date,comment as Comment,Valide as Valide from retrocession where retrocessionnom LIKE '%{0}%' and Valide LIKE '{1}%' and date BETWEEN '{2}' and '{3}'  and somme BETWEEN '{4}' and '{5}' order by retrocessionId DESC".format(search,validfilter_var,fromdate_var,todate_var,0 if amountfrom_var==None else amountfrom_var,99999999 if amountto_var==None else amountto_var))
    retrocessionsitems=retrocessions.fetchall()
    headersretrocessions=retrocessions.keys()

    retrocessiondf=pd.DataFrame(retrocessionsitems,columns=headersretrocessions)

    retrocessionsitems_disp=[]
    
    for item in retrocessionsitems:
        itemtmp=list(item)
        s = '{:0,.2f}'.format(float(item[3]))

        
        itemtmp[3]=s
        retrocessionsitems_disp.append(itemtmp)

    if filtervalid_form.is_submitted() and filtervalid_form.sub.data:
        
        return redirect(url_for('retrocession',validfilter=filtervalid_form.validity.data,fromdate=filtervalid_form.fromdate.data,todate=filtervalid_form.todate.data,amountfrom=filtervalid_form.amountfrom.data,amountto=filtervalid_form.amountto.data))          
        

    if export2excel_frm.validate_on_submit() and export2excel_frm.export_submit.data:
        current_date=datetime.datetime.now()
        current_num_timestamp="{0}{1}{2}_{3}{4}{5}".format(current_date.year,current_date.month,current_date.day,current_date.hour,current_date.minute,current_date.second)
        excel_report_path=r"{0}\reporting_temporary\RETROCESSION_{1}.xlsx".format(file_download_location,current_num_timestamp)
        retrocessiondf.to_excel(excel_report_path,index=False)

        return send_file(excel_report_path)

    if searchform.validate_on_submit() and searchform.searchsubmit.data:
        if searchform.searchstring.data !="":
            return redirect(url_for('retrocession',search=searchform.searchstring.data))
        else:
            return redirect(url_for('retrocession'))    
    else:
        print(searchform.errors)

    if form.is_submitted() and request.method=='POST' and form.submit.data:
        qry = Setting.query.filter().first()
        monthdelta=(date.today().year - form.date.data.year) * 12 + date.today().month - form.date.data.month
        print(monthdelta,qry.moisavant)
        if monthdelta<qry.moisavant  and monthdelta>qry.moislimit*-1:
            if form.retrocessionNom.data!="addnew":
                new_retrocession =Retrocession(retrocessionType=form.retrocessionType.data,retrocessionNom=form.retrocessionNom.data,somme=form.somme.data,comment=form.comment.data,date=form.date.data,Valide="pasvalide")
            else:
                new_retrocession =Retrocession(retrocessionType=form.retrocessionType.data,retrocessionNom=form.retrocessionNomALT.data,somme=form.somme.data,comment=form.comment.data,date=form.date.data,Valide="pasvalide")
            if isinstance(form.somme.data, int) or isinstance(form.somme.data, float):
                db.session.add(new_retrocession)
                db.session.commit()
                return redirect(url_for('retrocession'))
            else:
                flash("Données invalides. Veuillez revérifier et soumettre à nouveau")
        else:
            flash("Vous ne pouvez pas entrer de données à partir de cette date!")        
    

    if "retrocession" in current_user.access or current_user.access=="all":
        return render_template('app.html',content='retrocession',username=(current_user.username).title(),forms=[form],hasDynamicSelector=True,table=retrocessionsitems_disp,headers=headersretrocessions,dbtable="retrocession",dbtableid="retrocessionId",user_role=current_user.role,searchform=searchform,module_name="Retrocession",export_form=export2excel_frm,filtervalid_form=filtervalid_form)
    else:
        return render_template('NOT_AUTHORIZED.html')




@app.route('/retrocessionnames/<retrocessiontype>')
def retrocessionnames(retrocessiontype):
    retrocessiontype_dec= urllib.parse.unquote(retrocessiontype.replace("*","%").replace("~","/"))
    retrocessionnames = Retrocession.query.filter_by(retrocessionType=retrocessiontype_dec).all()
    doctornames=Doctor.query.all()
    
    Arry=[]
    for retrocession in retrocessionnames:
        
        if not any(obj['name'] == retrocession.retrocessionNom for obj in Arry):
            
            retrocessionObj={}
            retrocessionObj['id']=retrocession.retrocessionId
            retrocessionObj['name']=retrocession.retrocessionNom
            Arry.append(retrocessionObj)
    for doctor in doctornames:
            if not any(obj['name'] == doctor.doctorname for obj in Arry):
                docObj={}
                docObj['id']=doctor.doctorid
                docObj['name']=doctor.doctorname
                Arry.append(docObj)
            

    return jsonify({'retrocessionnames':Arry})

def change_format_for_displayed_table(df,idcol_name):
    
    pass

@app.route('/salaire',methods=['GET','POST'])
@app.route('/salaire/search=<search>',methods=['GET','POST'])
#@app.route('/salaire/validfilter=<validfilter>',methods=['GET','POST'])
@login_required
def salaire(search=""):
    try:
        #print(request.args["validfilter"])
        validfilter_var=request.args["validfilter"]
    except:
        validfilter_var=""
        
    try:
        fromdate_var=request.args["fromdate"]
        fromdte=True
        #print(fromdate_var)
    except:
        fromdate_var="1990-1-1"
        fromdte=False
    
    try:
        todate_var=request.args["todate"]
        todte=True
    except:
        curryear=datetime.datetime.now().year
        todate_var="{0}-1-1".format(str(curryear+200))
        todte=False
    try:
        amountfrom_var=request.args["amountfrom"]
    except:
        amountfrom_var=None
    try:
        amountto_var=request.args["amountto"]
    except:
        amountto_var=None

    form=AddsalaireForm()
    export2excel_frm=Export_to_excel()
    searchform=SearchForm(searchstring=search)
    
    filtervalid_form=FilterNonValidItemsForm(validity=validfilter_var,fromdate=datetime.datetime.strptime(fromdate_var,'%Y-%m-%d') if fromdte!=False else None,todate=datetime.datetime.strptime(todate_var,'%Y-%m-%d') if todte!=False else None,amountfrom=amountfrom_var,amountto=amountto_var)
    
    choices=[]
    choices.append(("---","---"))
    choices=choices+[(paytype.salaireType,paytype.salaireType)for paytype in db.engine.execute("select * from salairetype").fetchall()]
    #choices.append((paytype.salaireType,paytype.salaireType)for paytype in db.engine.execute("select * from salairetype").fetchall())
    
    form.salaireType.choices = choices
    form.salaireNom.choices= [(payname.salaireId,payname.salaireNom) for payname in Salaire.query.filter_by(salaireType='---').all()]
    #searchform.searchfilter.choices=[(paytype.salaireType,paytype.salaireType)for paytype in db.engine.execute("select * from salairetype").fetchall()]


    salaire=db.engine.execute("select salaireId as ID,salaireType as Type, salaireNom as Nom,somme as Somme,date as Date,comment as Comment,Valide as Valide from salaire where salairenom LIKE '%{0}%' and Valide LIKE '{1}%' and date BETWEEN '{2}' and '{3}' and somme BETWEEN '{4}' and '{5}' order by salaireId DESC".format(search,validfilter_var,str(fromdate_var),str(todate_var),0 if amountfrom_var==None else amountfrom_var,99999999 if amountto_var==None else amountto_var))

    print("select * from salaire where Nom LIKE '%{0}%' and Valide LIKE '{1}%' and Date BETWEEN '{2}' and '{3}'and Somme BETWEEN '{4}'and'{5}' order by ID DESC".format(search,validfilter_var,str(fromdate_var),str(todate_var),amountfrom_var,amountto_var))
    #salaire=db.engine.execute("select * from salaire  order by salaireId DESC")
    salaireitems=salaire.fetchall()
    headerssalaire=salaire.keys()
    salaire_dataframe=pd.DataFrame(salaireitems,columns=headerssalaire)

    salaireitems_disp=[]
    
    for item in salaireitems:
        itemtmp=list(item)
        s = '{:0,.2f}'.format(float(item[3]))

        
        itemtmp[3]=s
        salaireitems_disp.append(itemtmp)
        
    
    
    #print(type(salaireitems_disp[4]))    

    if filtervalid_form.is_submitted() and filtervalid_form.sub.data:
        
        return redirect(url_for('salaire',validfilter=filtervalid_form.validity.data,fromdate=filtervalid_form.fromdate.data,todate=filtervalid_form.todate.data,amountfrom=filtervalid_form.amountfrom.data,amountto=filtervalid_form.amountto.data))          
    

    if searchform.validate_on_submit() and searchform.searchsubmit.data:
        if searchform.searchstring.data !="":
            return redirect(url_for('salaire',search=searchform.searchstring.data))
        else:
            return redirect(url_for('salaire'))    
    else:
        print(searchform.errors)
   
    
    if form.is_submitted() and request.method=='POST' and form.submit.data:
        qry = Setting.query.filter().first()
        monthdelta=(date.today().year - form.date.data.year) * 12 + date.today().month - form.date.data.month
        print(monthdelta,qry.moisavant)
        if monthdelta<qry.moisavant and monthdelta>qry.moislimit*-1:
            if form.salaireNom.data!="addnew":
                new_salaire =Salaire(salaireType=form.salaireType.data,salaireNom=form.salaireNom.data,somme=form.somme.data,date=form.date.data,comment=form.comment.data)
            else:
                new_salaire =Salaire(salaireType=form.salaireType.data,salaireNom=form.salaireNomALT.data,somme=form.somme.data,date=form.date.data,comment=form.comment.data)
            if isinstance(form.somme.data, int) or isinstance(form.somme.data, float) and form.is_submitted():
                db.session.add(new_salaire)
                db.session.commit()
                return redirect(url_for('salaire'))
            else:
                flash("Données invalides. Veuillez revérifier et soumettre à nouveau")
        else:
            flash("Vous ne pouvez pas entrer de données à partir de cette date!")

    if export2excel_frm.validate_on_submit() and export2excel_frm.export_submit.data:
        current_date=datetime.datetime.now()
        current_num_timestamp="{0}{1}{2}_{3}{4}{5}".format(current_date.year,current_date.month,current_date.day,current_date.hour,current_date.minute,current_date.second)
        excel_report_path=r"{0}\reporting_temporary\salaire_{1}.xlsx".format(file_download_location,current_num_timestamp)
        salaire_dataframe.to_excel(excel_report_path,index=False)

        return send_file(excel_report_path)   
        
    

    
    if "salaire" in current_user.access or current_user.access=="all":
        return render_template('app.html',username=(current_user.username).title(),content='salaire',forms=[form],hasDynamicSelector=True,table=salaireitems_disp,headers=headerssalaire,dbtable="salaire",dbtableid="salaireId",user_role=current_user.role,searchform=searchform,module_name="salaire",export_form=export2excel_frm,filtervalid_form=filtervalid_form)
    else:
        return render_template('NOT_AUTHORIZED.html')


@app.route('/salairenames/<salairetype>')
def salairenames(salairetype):
    salairetype_dec= urllib.parse.unquote(salairetype.replace("*","%").replace("~","/"))
    salairenames = Salaire.query.filter_by(salaireType=salairetype_dec).all()
    doctornames = Doctor.query.all()
    
    Arry=[]
    for salaire in salairenames:
        
        if not any(obj['name'] == salaire.salaireNom for obj in Arry):
            
            salaireObj={}
            salaireObj['id']=salaire.salaireId
            salaireObj['name']=salaire.salaireNom
            Arry.append(salaireObj)
    '''
    for doctor in doctornames:
            if not any(obj['name'] == doctor.doctorname for obj in Arry):
                docObj={}
                docObj['id']=doctor.doctorid
                docObj['name']=doctor.doctorname
                Arry.append(docObj)
                '''
                
            

    return jsonify({'salairenames':Arry})


@app.route('/payments',methods=['GET','POST'])
@app.route('/payments/search=<search>',methods=['GET','POST'])
#@app.route('/payments/validfilter=<validfilter>',methods=['GET','POST'])
@login_required
def payment(search=""):
    try:
        #print(request.args["validfilter"])
        validfilter_var=request.args["validfilter"]
    except:
        validfilter_var=""
        
    try:
        fromdate_var=request.args["fromdate"]
        fromdte=True
        #print(fromdate_var)
    except:
        fromdate_var="1990-1-1"
        fromdte=False
    
    try:
        todate_var=request.args["todate"]
        todte=True
    except:
        curryear=datetime.datetime.now().year
        todate_var="{0}-1-1".format(str(curryear+200))
        todte=False
    try:
        amountfrom_var=request.args["amountfrom"]
    except:
        amountfrom_var=None
    try:
        amountto_var=request.args["amountto"]
    except:
        amountto_var=None

    form=AddPaymentForm()
    export2excel_frm=Export_to_excel()
    searchform=SearchForm(searchstring=search)
    
    filtervalid_form=FilterNonValidItemsForm(validity=validfilter_var,fromdate=datetime.datetime.strptime(fromdate_var,'%Y-%m-%d') if fromdte!=False else None,todate=datetime.datetime.strptime(todate_var,'%Y-%m-%d') if todte!=False else None,amountfrom=amountfrom_var,amountto=amountto_var)
    
    choices=[]
    choices.append(("---","---"))
    choices=choices+[(paytype.paiementsType,paytype.paiementsType)for paytype in db.engine.execute("select * from paymenttype").fetchall()]
    #choices.append((paytype.paiementsType,paytype.paiementsType)for paytype in db.engine.execute("select * from paymenttype").fetchall())
    
    form.paiementsType.choices = choices
    form.paiementsNom.choices= [(payname.paiementsId,payname.paiementsNom) for payname in Payment.query.filter_by(paiementsType='---').all()]
    #searchform.searchfilter.choices=[(paytype.paiementsType,paytype.paiementsType)for paytype in db.engine.execute("select * from paymenttype").fetchall()]


    payments=db.engine.execute("select paiementsId as ID,paiementsType as Type, paiementsNom as Nom,somme as Somme,date as Date,comment as Comment,Valide as Valide from payment where paiementsnom LIKE '%{0}%' and Valide LIKE '{1}%' and date BETWEEN '{2}' and '{3}' and somme BETWEEN '{4}' and '{5}' order by paiementsId DESC".format(search,validfilter_var,str(fromdate_var),str(todate_var),0 if amountfrom_var==None else amountfrom_var,99999999 if amountto_var==None else amountto_var))

    print("select * from payment where Nom LIKE '%{0}%' and Valide LIKE '{1}%' and Date BETWEEN '{2}' and '{3}'and Somme BETWEEN '{4}'and'{5}' order by ID DESC".format(search,validfilter_var,str(fromdate_var),str(todate_var),amountfrom_var,amountto_var))
    #payments=db.engine.execute("select * from payment  order by paiementsId DESC")
    paymentitems=payments.fetchall()
    headerspayments=payments.keys()
    payment_dataframe=pd.DataFrame(paymentitems,columns=headerspayments)

    paymentitems_disp=[]
    
    for item in paymentitems:
        itemtmp=list(item)
        s = '{:0,.2f}'.format(float(item[3]))

        
        itemtmp[3]=s
        paymentitems_disp.append(itemtmp)
        
    
    
    #print(type(paymentitems_disp[4]))    

    if filtervalid_form.is_submitted() and filtervalid_form.sub.data:
        
        return redirect(url_for('payment',validfilter=filtervalid_form.validity.data,fromdate=filtervalid_form.fromdate.data,todate=filtervalid_form.todate.data,amountfrom=filtervalid_form.amountfrom.data,amountto=filtervalid_form.amountto.data))          
    

    if searchform.validate_on_submit() and searchform.searchsubmit.data:
        if searchform.searchstring.data !="":
            return redirect(url_for('payment',search=searchform.searchstring.data))
        else:
            return redirect(url_for('payment'))    
    else:
        print(searchform.errors)
   
    
    if form.is_submitted() and request.method=='POST' and form.submit.data:
        qry = Setting.query.filter().first()
        monthdelta=(date.today().year - form.date.data.year) * 12 + date.today().month - form.date.data.month
        print(monthdelta,qry.moisavant)
        if monthdelta<qry.moisavant and monthdelta>qry.moislimit*-1:
            if form.paiementsNom.data!="addnew":
                new_payment =Payment(paiementsType=form.paiementsType.data,paiementsNom=form.paiementsNom.data,somme=form.somme.data,date=form.date.data,comment=form.comment.data)
            else:
                new_payment =Payment(paiementsType=form.paiementsType.data,paiementsNom=form.paiementsNomALT.data,somme=form.somme.data,date=form.date.data,comment=form.comment.data)
            if isinstance(form.somme.data, int) or isinstance(form.somme.data, float) and form.is_submitted():
                db.session.add(new_payment)
                db.session.commit()
                return redirect(url_for('payment'))
            else:
                flash("Données invalides. Veuillez revérifier et soumettre à nouveau")
        else:
            flash("Vous ne pouvez pas entrer de données à partir de cette date!")

    if export2excel_frm.validate_on_submit() and export2excel_frm.export_submit.data:
        current_date=datetime.datetime.now()
        current_num_timestamp="{0}{1}{2}_{3}{4}{5}".format(current_date.year,current_date.month,current_date.day,current_date.hour,current_date.minute,current_date.second)
        excel_report_path=r"{0}\reporting_temporary\PAIEMENTS_{1}.xlsx".format(file_download_location,current_num_timestamp)
        payment_dataframe.to_excel(excel_report_path,index=False)

        return send_file(excel_report_path)   
        
    

    
    if "payments" in current_user.access or current_user.access=="all":
        return render_template('app.html',username=(current_user.username).title(),content='payment',forms=[form],hasDynamicSelector=True,table=paymentitems_disp,headers=headerspayments,dbtable="payment",dbtableid="paiementsId",user_role=current_user.role,searchform=searchform,module_name="Paiement",export_form=export2excel_frm,filtervalid_form=filtervalid_form)
    else:
        return render_template('NOT_AUTHORIZED.html')

@app.route('/paymentnames/<paymenttype>')
def paymentnames(paymenttype):
    paymenttype_dec= urllib.parse.unquote(paymenttype.replace("*","%").replace("~","/"))
    paymentnames = Payment.query.filter_by(paiementsType=paymenttype_dec).all()
    doctornames = Doctor.query.all()
    
    Arry=[]
    for payment in paymentnames:
        
        if not any(obj['name'] == payment.paiementsNom for obj in Arry):
            
            paymentObj={}
            paymentObj['id']=payment.paiementsId
            paymentObj['name']=payment.paiementsNom
            Arry.append(paymentObj)
    '''
    for doctor in doctornames:
            if not any(obj['name'] == doctor.doctorname for obj in Arry):
                docObj={}
                docObj['id']=doctor.doctorid
                docObj['name']=doctor.doctorname
                Arry.append(docObj)
                '''
                
            

    return jsonify({'paymentnames':Arry})

@app.route('/medicins',methods=['GET','POST'])
@login_required
def medicins():
    if "doctors" in current_user.access  or current_user.access=="all":
        return render_template('app.html',content='medicins',username=(current_user.username).title(),form=None,user_role=current_user.role)
    else:
        return render_template('NOT_AUTHORIZED.html')


       

@app.route('/medicinspecs/<medtype>')
def medicinspecs(medtype):
    medtype_dec= urllib.parse.unquote(medtype.replace("*","%").replace("~","/"))
    specs = medicalperson.query.filter_by(medtype=medtype_dec).all()
    #doctornames = Doctor.query.all()
    
    Arry=[]
    for spec in specs:
        
        if not any(obj['spec'] == spec.medspeciality for obj in Arry):
            
            specObj={}
            specObj['id']=spec.medid
            specObj['spec']=spec.medspeciality
            Arry.append(specObj)
   
                
            

    return jsonify({'specs':Arry})


@app.route('/employees',methods=['GET','POST'])
@login_required
def employees():
    if "employees" in current_user.access  or current_user.access=="all":
        return render_template('app.html',content='employees',username=(current_user.username).title(),form=None,user_role=current_user.role)
    else:
        return render_template('NOT_AUTHORIZED.html') 

@app.route('/addemployee',methods=['GET','POST'])
@login_required
def addemployee():
    if "employees" in current_user.access  or current_user.access=="all":
        return render_template('app.html',content='addemployees',username=(current_user.username).title(),form=None,user_role=current_user.role)
    else:
        return render_template('NOT_AUTHORIZED.html')   

@app.route('/editemployee',methods=['GET','POST'])
@login_required
def editemployee():
    if "employees" in current_user.access  or current_user.access=="all":
        return render_template('app.html',content='editemployees',username=(current_user.username).title(),form=None,user_role=current_user.role)
    else:
        return render_template('NOT_AUTHORIZED.html')          

def get_person_related_data(entity,employeename):
    if entity == 'employee':
        returned_data={"salaries":[],"percentages":[]}
        salaries = db.engine.execute("""select salaire from empsalaire where empnom = '{0}'""".format(employeename))
        sals = []
        for sal in salaries:
            sals.append(sal[0])
        returned_data["salaries"]=sals

        percentages = db.engine.execute("""select pourcentages from employee_percentageactivity where employee = '{0}'""".format(employeename))
        percs=[]
        for perc in percentages:
            percs.append(perc[0])
        returned_data["percentages"]=percs
        
        return returned_data


def get_person_data(entity):
    if entity == 'medicins':
        listt=db.engine.execute("""Select * from medicalperson""")
        listjson=convert_list_to_json_meds(listt)
    elif entity == 'employee':
        listt=db.engine.execute("""Select * from employee""")
        listjson=convert_list_to_json_meds(listt)
        for itm in listjson:
            data=get_person_related_data('employee',itm[1])
            sals = data["salaries"]
            percs = data["percentages"]
            finalsal=""
            for sal in sals:
                finalsal +=str(sal)+"<br>" 
            finalperc=""
            for perc in percs:
                finalperc +=str(perc)+"%<br>" 
            itm[99] =finalsal
            itm[100]=finalperc
        
    return (listjson)


@app.route('/get_doctors_list',methods=['GET'])
@login_required
def getdoctorslist():
    final_docs=[]
    docs=db.engine.execute("""SELECT * From medicalperson""")
    for doc in docs:
        final_docs.append(doc[1])
    
    return jsonify(final_docs)

@app.route('/get_last_x_years',methods=['GET'])
@login_required
def getlastxyears():
    x= request.args["x"]
    current_year = datetime.datetime.now().year
    last_five_years = list(range(current_year, current_year - int(x), -1))
    return jsonify(last_five_years)

@app.route('/get_person_additional_data',methods=['GET','POST'])
@login_required
def getpersonadditionaldata():
    entity = request.json["entity"]
    name = request.json["name"]
    return jsonify(get_person_related_data(entity,name))

@app.route('/get_person_data',methods=['GET'])
@login_required
def getpersondata():
    entity = request.args["entity"]
    if entity == 'medicins':   
        return jsonify(get_person_data(entity))
    elif entity == 'employee':
        return jsonify(get_person_data(entity))
    
@app.route('/nouveaumedicins',methods=["POST","GET"])
@login_required
def nouveaumedicins():
    if "doctors" in current_user.access  or current_user.access=="all":
        return render_template('app.html',content='nouveaumedicins',username=(current_user.username).title(),form=None,user_role=current_user.role)
    else:
        return render_template('NOT_AUTHORIZED.html')


@app.route('/addemployeeitems',methods=['POST'])
@login_required
def addemployeeitems():
    empnom=request.json['empnom']
    empaddress=request.json['empaddress']
    emptel=request.json['emptel']
    empemail=request.json['empemail']
    empcoordbanc=request.json['empcoordbanc']
    empnoavs=request.json['empnoavs']
    emppole=request.json['emppole']
    empposte=request.json['empposte']
    empdatedebut=request.json['empdatedebut']

    db.engine.execute("""INSERT INTO employee VALUES ('{0}','{1}','{2}','{3}','{4}',{5},'{6}','{7}','{8}','')""".format(empnom,empaddress,emptel,empemail,empcoordbanc,empnoavs,emppole,empposte,empdatedebut))
    salairies = request.json["empsalaire"]
    percentage_activities_for_current_employee = request.json["percentage_activities_for_current_employee"]
    for sal in salairies:
        db.engine.execute("""INSERT INTO empsalaire VALUES('{0}',{1},'{2}','',{4})""".format(empnom,sal[0],sal[2],sal[3],sal[1]))
    for perc in percentage_activities_for_current_employee:
        db.engine.execute("""INSERT INTO employee_percentageactivity VALUES('{0}','{1}','{2}',{3},'{4}','{5}')""".format(empnom,perc[0],perc[1],perc[2],perc[3],perc[4]))
    
    
    return(jsonify({"Status":"OK"})) 



@app.route('/addmedicinsitems',methods=['POST'])
@login_required
def addmedicinsitems():
    mednom = request.json['mednom']
    medspeciality = request.json['medspeciality']
    medtype = request.json['medtype']
    medpourcentage = request.json['medpourcentage']
    medchargesociales = request.json['medchargesociales']
    medsurfaceaccordee = request.json['medsurfaceaccordee']
    medsalaire = request.json['medsalaire']
    mednombremoissalaireparan = request.json['mednombremoissalaireparan']
    medsecretaire = request.json['medsecretaire']
    medpourcentagesecretaire = request.json['medpourcentagesecretaire']
    medlogiciels = "||".join(request.json['medlogiciels'])
    medtelephone = request.json["medtelephone"]
    medaddress = request.json["medaddress"]
    medemail= request.json["medemail"]
    medcoordonneebanc= request.json["medcoordonneebanc"]
    medavs= request.json["mednoavs"]
    medstartdate= request.json["medstartdate"]
    medenddate= request.json["medenddate"]
    isemployee= request.json["isemployee"]
    percentage_activities_for_current_doctor = request.json["percentage_activities_for_current_doctor"]
    medsalaires=request.json["medsalaires"]

    for perc in percentage_activities_for_current_doctor:
        db.engine.execute("""INSERT INTO percentageactivity VALUES ('{0}',{1},{2},{3})""".format(mednom,perc[0],perc[1],perc[2]))    
    
    for salaire in medsalaires:
        db.engine.execute("""INSERT INTO medsalaire VALUES('{0}',{1},'{2}','{3}',{4})""".format(mednom,salaire[0],salaire[2],salaire[3],salaire[1]))

    db.engine.execute("""INSERT INTO medicalperson VALUES ('{0}','{1}','{2}',{3},{4},{5},{6},{7},'{8}',{9},'{10}','{11}','{12}','{13}','{14}',{15},'{16}','{17}','{18}')""".format(mednom,medspeciality,medtype,medpourcentage,medchargesociales,medsurfaceaccordee,medsalaire,mednombremoissalaireparan,medsecretaire,medpourcentagesecretaire,medlogiciels,medtelephone,medaddress,medemail,medcoordonneebanc,medavs,medstartdate,medenddate,isemployee))
    return(jsonify({"Status":"OK"}))

    
@app.route('/medicinsedit',methods=['POST','GET'])
@login_required
def medicinsedit():
    if "doctors" in current_user.access  or current_user.access=="all":
        return render_template('app.html',content='editmedicins',username=(current_user.username).title(),form=None,user_role=current_user.role)
    else:
        return render_template('NOT_AUTHORIZED.html')


@app.route('/doctors',methods=['GET','POST'])
@login_required
def doctor():
    form=AddDoctorForm()
    doctors=db.engine.execute("select doctorid,doctorname,doctorspeciality,isActive,percentageShare from doctor")
    doctoritems=doctors.fetchall()
    headersdoctors=doctors.keys()
    
    if form.validate_on_submit():
        #boolean = False
        #if form.isActive.data=='True':
            #boolean = True
        new_doctor =Doctor(doctorname=form.doctorname.data,doctorspeciality=form.doctorspeciality.data,isActive=form.isActive.data,percentageShare=form.percentageShare.data,conditionsfinanciers="None")
        try:
            db.session.add(new_doctor)
            db.session.commit()
        except:
            flash("Erreur! Le médecin existe déjà")
        return redirect(url_for('doctor'))

    #return render_template('doctorregisterform.html',form=form,tables=[doctors.to_html(classes='data',index=False)], titles=doctors.columns.values)
    if "doctors" in current_user.access  or current_user.access=="all":
        return render_template('doctor_setup.html',form=form,hasDynamicSelector=False,table=doctoritems,headers=headersdoctors,dbtable="doctor",dbtableid="doctorId",user_role=current_user.role)
    else:
        return render_template('NOT_AUTHORIZED.html')


@app.route('/resetpassword',methods=['GET','POST'])
@login_required
def resetpassword():
    resetpass = ResetPasswordForm()

    if resetpass.validate_on_submit():
        
        print(current_user.password)
        if resetpass.oldpassword.data == current_user.password:
            if resetpass.newpassword.data==resetpass.confirmpassword.data:
                db.engine.execute("""UPDATE "user"
                                    SET password = '{0}'
                                    WHERE username = '{1}'""".format(resetpass.newpassword.data,current_user.username))
                return redirect(url_for('logout'))
            else:
                flash('new password doesnt match confirmed value')    
        else:
            flash('old password not matching current')

    return render_template('app.html',content='resetpassword',form=resetpass,username=(current_user.username).title())


@app.route('/fraismateriel',methods=['GET','POST'])
@app.route('/fraismateriel/search=<search>',methods=['GET','POST'])
@login_required
def fraismateriel(search=""):
    try:
        #print(request.args["validfilter"])
        validfilter_var=request.args["validfilter"]
    except:
        validfilter_var=""    
    try:
        fromdate_var=request.args["fromdate"]
        fromdte=True
        #print(fromdate_var)
    except:
        fromdate_var="1990-1-1"
        fromdte=False
    
    try:
        todate_var=request.args["todate"]
        todte=True
    except:
        curryear=datetime.datetime.now().year
        todate_var="{0}-1-1".format(str(curryear+200))
        todte=False      
    try:
        amountfrom_var=request.args["amountfrom"]
    except:
        amountfrom_var=None
    try:
        amountto_var=request.args["amountto"]
    except:
        amountto_var=None          
    filtervalid_form=FilterNonValidItemsForm(validity=validfilter_var,fromdate=datetime.datetime.strptime(fromdate_var,'%Y-%m-%d') if fromdte!=False else None,todate=datetime.datetime.strptime(todate_var,'%Y-%m-%d') if todte!=False else None,amountfrom=amountfrom_var,amountto=amountto_var)
    form =AddFraismaterielForm()
    export2excel_frm=Export_to_excel()
    searchform=SearchForm(searchstring=search)
    
    fraismateriel=db.engine.execute("select fraismaterielId as ID,fraismaterielType as Type,fraismaterielNom as Nom,fraismaterielsomme as Somme,fraismaterieldate as Date,comment as Comment,Valide as Valide from fraismateriel where fraismaterielnom LIKE '%{0}%' and Valide LIKE '{1}%' and fraismaterieldate BETWEEN '{2}' and '{3}'  and fraismaterielsomme BETWEEN '{4}' and '{5}' order by fraismaterielId DESC".format(search,validfilter_var,fromdate_var,todate_var,0 if amountfrom_var==None else amountfrom_var,99999999 if amountto_var==None else amountto_var))
    fraismaterielitems=fraismateriel.fetchall()
    headersfraismateriel=fraismateriel.keys()

    choices=[]
    choices.append(("---","---"))
    choices=choices+[(fraistype.fraismaterieltype,fraistype.fraismaterieltype)for fraistype in db.engine.execute("select * from fraismaterieltype").fetchall()]
    #choices.append((paytype.paiementsType,paytype.paiementsType)for paytype in db.engine.execute("select * from paymenttype").fetchall())
    
    form.fraismaterieltype.choices = choices
    form.fraismaterielnom.choices= [(fraisname.fraismaterielId,fraisname.fraismaterielnom) for fraisname in Fraismateriel.query.filter_by(fraismaterieltype='---').all()]

    if filtervalid_form.is_submitted() and filtervalid_form.sub.data:
        
        return redirect(url_for('fraismateriel',validfilter=filtervalid_form.validity.data,fromdate=filtervalid_form.fromdate.data,todate=filtervalid_form.todate.data,amountfrom=filtervalid_form.amountfrom.data,amountto=filtervalid_form.amountto.data))   

    if searchform.validate_on_submit() and searchform.searchsubmit.data:
        if searchform.searchstring.data !="":
            return redirect(url_for('fraismateriel',search=searchform.searchstring.data))
        else:
            return redirect(url_for('fraismateriel'))    
    else:
        print(searchform.errors)

    if form.is_submitted() and request.method=='POST' and form.submit.data:
        qry = Setting.query.filter().first()
        monthdelta=(date.today().year - form.fraismaterieldate.data.year) * 12 + date.today().month - form.fraismaterieldate.data.month
        print(monthdelta,qry.moisavant)
        if monthdelta<qry.moisavant  and monthdelta>qry.moislimit*-1:                
            if form.fraismaterielnom.data!="addnew":
                new_fraismateriel =Fraismateriel(fraismaterieltype=form.fraismaterieltype.data,fraismaterielnom=form.fraismaterielnom.data,fraismaterielsomme=form.fraismaterielsomme.data,fraismaterieldate=form.fraismaterieldate.data,comment=form.comment.data)
            else:
                new_fraismateriel =Fraismateriel(fraismaterieltype=form.fraismaterieltype.data,fraismaterielnom=form.fraismaterielnomALT.data,fraismaterielsomme=form.fraismaterielsomme.data,fraismaterieldate=form.fraismaterieldate.data,comment=form.comment.data)
            if isinstance(form.fraismaterielsomme.data, int) or isinstance(form.fraismaterielsomme.data, float) and form.is_submitted():
                db.session.add(new_fraismateriel)
                db.session.commit()
                return redirect(url_for('fraismateriel'))
            else:
                flash("Données invalides. Veuillez revérifier et soumettre à nouveau")
        else:
            flash("Vous ne pouvez pas entrer de données à partir de cette date!")
    
    fraismaterieldf=pd.DataFrame(fraismaterielitems,columns=headersfraismateriel)
    if export2excel_frm.validate_on_submit() and export2excel_frm.export_submit.data:
        current_date=datetime.datetime.now()
        current_num_timestamp="{0}{1}{2}_{3}{4}{5}".format(current_date.year,current_date.month,current_date.day,current_date.hour,current_date.minute,current_date.second)
        excel_report_path=r"{0}\reporting_temporary\FRAIS_MATERIEL_{1}.xlsx".format(file_download_location,current_num_timestamp)
        fraismaterieldf.to_excel(excel_report_path,index=False)

        return send_file(excel_report_path)

    if "fraismateriel" in current_user.access or current_user.access=="all":
        return render_template('generalform.html',forms=[form],hasDynamicSelector=True,table=fraismaterielitems,headers=headersfraismateriel,dbtable="fraismateriel",dbtableid="fraismaterielId",user_role=current_user.role,searchform=searchform,module_name="Frais Materiel",export_form=export2excel_frm,filtervalid_form=filtervalid_form)
    else:
        return render_template('NOT_AUTHORIZED.html')



@app.route('/fraismaterielname/<fraismaterieltype>')
def fraismaterielnames(fraismaterieltype):
    #print(fraismaterieltype.replace("*","%"))
    fraismateriel_dec= urllib.parse.unquote(fraismaterieltype.replace("*","%"))
    #print(fraismateriel_dec)
    fraismaterielnames = Fraismateriel.query.filter_by(fraismaterieltype=fraismateriel_dec).all()
    doctornames = Doctor.query.all()
    
    Arry=[]
    for fraismateriel in fraismaterielnames:
        
        if not any(obj['name'] == fraismateriel.fraismaterielnom for obj in Arry):
            
            fraismaterielObj={}
            fraismaterielObj['id']=fraismateriel.fraismaterielId
            fraismaterielObj['name']=fraismateriel.fraismaterielnom
            Arry.append(fraismaterielObj)
    
    for doctor in doctornames:
            if not any(obj['name'] == doctor.doctorname for obj in Arry):
                docObj={}
                docObj['id']=doctor.doctorid
                docObj['name']=doctor.doctorname
                Arry.append(docObj)
                
    docObj={}
    docObj['test']=fraismaterieltype
    
    Arry.append(docObj)

    return jsonify({'fraismaterielnames':Arry})




@app.route('/load_doctor/tbl=<tbl>/id=<id>',methods=['GET','POST'])
@login_required
def load_doctor(tbl,id):
    if tbl=='doctor':
        session['curr_route']=request.path
        qry = Doctor.query.filter(
            Doctor.doctorid==id).first()
        #doc = qry.first()
        
        form=AddDoctorConstantsForm(obj=qry)
        #subform=AddDoctorConstantsForm(obj=qry)

        leasing_form=LeasingForm()
        leasingdata=db.engine.execute("select LeasingId,LocationNom,debut,finPrevue,paiement,paiementinitial from leasing where docteur='{0}'".format(qry.doctorname))
        leasingdataitems=leasingdata.fetchall()
        headersleasingdata=leasingdata.keys()

        if leasing_form.validate_on_submit() and request.method=='POST' and leasing_form.leasesubmit.data:
            new_leasing=Leasing(locationNom=leasing_form.locationNom.data,docteur=qry.doctorname,debut=leasing_form.debut.data,finPrevue=leasing_form.finPrevue.data,paiement=leasing_form.paiement.data,paiementinitial=leasing_form.paiementinitial.data)
            db.session.add(new_leasing)
            db.session.commit()
            return redirect(request.url)

        perc_act_form=PercentageactivityForm()
        perc_act_data=db.engine.execute("select activiteId,de,a,pourcentages from percentageactivity where docteur='{0}'".format(qry.doctorname))
        perc_act_dataitems=perc_act_data.fetchall()
        headersperc_act_data=perc_act_data.keys()

        if perc_act_form.validate_on_submit() and request.method=='POST' and perc_act_form.submit.data:
            new_perc_act=Percentageactivity(de=perc_act_form.de.data,docteur=qry.doctorname,a=perc_act_form.a.data,pourcentages=perc_act_form.pourcentages.data)
            db.session.add(new_perc_act)
            db.session.commit()
            return redirect(request.url)

        if form.is_submitted() and request.method=='POST' and form.submit.data:
            #qry.doctorid = form.doctorid.data
            qry.doctorname=form.doctorname.data
            qry.isActive = form.isActive.data
            qry.doctorspeciality=form.doctorspeciality.data
            qry.percentageShare=form.percentageShare.data
            qry.conditionsfinanciers="None"
            #qry.conditionsfinanciers=form.conditionsfinanciers.data
            #print(subform.surfacecentremedical.value)

            qry.pourcentagesalaire=form.pourcentagesalaire.data
            qry.pourcentagechargessociales=form.pourcentagechargessociales.data
            qry.surfacecentremedical=form.surfacecentremedical.data
            qry.surfacecommunes=form.surfacecommunes.data
            qry.loyermensuel=form.loyermensuel.data
            qry.surfaceaccordee=form.surfaceaccordee.data
            qry.nettoyage=form.nettoyage.data
            qry.conciergerie=form.conciergerie.data
            qry.salairepersonnel=form.salairepersonnel.data
            qry.telephonieinternet=form.telephonieinternet.data
            qry.logicielaxenita=form.logicielaxenita.data
            qry.nbmedicins=form.nbmedicins.data
            qry.assurances=form.assurances.data
            qry.blanchisserieleman=form.blanchisserieleman.data
            qry.informatique=form.informatique.data
            qry.nblocaux=form.nblocaux.data
            qry.nbmedicinsrepartirfrais=form.nbmedicinsrepartirfrais.data
            qry.receptionniste=form.receptionniste.data
            qry.Apprentie=form.Apprentie.data
            qry.simplify=form.simplify.data
            qry.steriswiss=form.steriswiss.data
            
            #qry=form
            db.session.commit()
            return redirect(url_for('doctor'))    
        else:
            print(form.errors)
    return render_template('edit_doctor.html',form=form,leasingform=leasing_form,perc_act_form=perc_act_form,headers=headersleasingdata,table=leasingdataitems,headersperc_act_data=headersperc_act_data,perc_act_dataitems=perc_act_dataitems,user_role=current_user.role,dbtable="leasing",dbtableid="leasingId",perc_act_dbtable="percentageactivity",perc_act_id="activiteId")


@app.route('/edit_entry/tbl=<tbl>/id=<id>',methods=['GET','POST'])
@login_required
def edit_entry(tbl,id):

    if tbl=='fraismateriel':
        qry=Fraismateriel.query.filter(
            Fraismateriel.fraismaterielId==id
        ).first()



        form=AddFraismaterielForm(obj=qry)
        choices=[]
        choices.append(("---","---"))
        choices=choices+[(fraistype.fraismaterieltype,fraistype.fraismaterieltype)for fraistype in db.engine.execute("select * from fraismaterieltype").fetchall()]
        #choices.append((paytype.paiementsType,paytype.paiementsType)for paytype in db.engine.execute("select * from paymenttype").fetchall())
    
        form.fraismaterieltype.choices = choices
        

        form.fraismaterielnom.choices=[(qry.fraismaterielnom,qry.fraismaterielnom)]

        if form.validate_on_submit()  :
            #qry.doctorid = form.doctorid.data
            qry.fraismaterieltype=form.fraismaterieltype.data
            if form.fraismaterielnomALT.data=="":
                qry.fraismaterielnom = form.fraismaterielnom.data
            else:
                qry.fraismaterielnom = form.fraismaterielnomALT.data
            qry.fraismaterielsomme=form.fraismaterielsomme.data
            qry.fraismaterieldate=form.fraismaterieldate.data
            qry.comment=form.comment.data
            #qry.comment=form.comment.data
            if isinstance(form.fraismaterielsomme.data, int) or isinstance(form.fraismaterielsomme.data, float):
            #qry=form   

                db.session.commit()
                return redirect(url_for('fraismateriel'))
        elif form.is_submitted():
            flash("Invalid Data. Please re-check and submit again") 
            
       

    if tbl=='doctorpayment':
        qry = Doctorpayment.query.filter(
            Doctorpayment.doctorpaiementId==id
        ).first()

        form=AddDoctorPaymentForm(obj=qry)

        choices=[]
        #choices.append(("---","---"))
        choices=choices+[(doctor.doctorname,doctor.doctorname)for doctor in db.engine.execute("select doctorname from doctor").fetchall()]   
        form.doctorname.choices=choices
        
        paymentchoices=[]
        paymentchoices.append(("addnew","Ajouter Nouveau ?"))
        paymentchoices=paymentchoices+[(doctor.paimentnom,doctor.paimentnom)for doctor in db.engine.execute("select DISTINCT paimentnom   from doctorpayment").fetchall()]
        form.paimentnom.choices=paymentchoices
        #form.paimentnom.data=qry.paimentnom 
        

        if form.validate_on_submit():
            #qry.doctorid = form.doctorid.data
            qry.doctorname=form.doctorname.data
            if form.paimentnom.data=="addnew":
                qry.paimentnom=form.paimentnomALT.data
            else:    
                qry.paimentnom=form.paimentnom.data
            qry.doctorpaiementsomme=form.doctorpaiementsomme.data
            qry.date=form.date.data
            
            #qry=form
            db.session.commit()
            return redirect(url_for('doctorpayment'))               

    
    if tbl=='payment':
        qry = Payment.query.filter(
            Payment.paiementsId==id).first()
        #doc = qry.first()
        
        form=AddPaymentForm(obj=qry)
        choices=[(paytype.paiementsType,paytype.paiementsType)for paytype in db.engine.execute("select * from paymenttype").fetchall()]
        form.paiementsType.choices = choices
        
        form.paiementsNom.choices=[(qry.paiementsNom,qry.paiementsNom)]
        
        if form.validate_on_submit():
            #qry.doctorid = form.doctorid.data
            qry.paiementsType=form.paiementsType.data
            if form.paiementsNomALT.data=="":
                qry.paiementsNom = form.paiementsNom.data
            else:
                qry.paiementsNom = form.paiementsNomALT.data
            qry.somme=form.somme.data
            qry.date=form.date.data
            qry.comment=form.comment.data
            
            #qry=form
            db.session.commit()
            return redirect(url_for('payment'))
        elif form.is_submitted():
            flash("Invalid Data. Please re-check and submit again!")
    if tbl=='facturation':
        qry = Facturation.query.filter(
            Facturation.facturationId==id).first()
        #doc = qry.first()
        
        form=AddFacturationForm(obj=qry)
        choices=[(facttype.facturationType,facttype.facturationType)for facttype in db.engine.execute("select * from facturationtype").fetchall()]
        form.facturationType.choices = choices
        
        form.facturationNom.choices=[(qry.facturationNom,qry.facturationNom)]
        
        if form.validate_on_submit():
            #qry.doctorid = form.doctorid.data
            qry.facturationType=form.facturationType.data
            if form.facturationNomALT.data=="":
                qry.facturationNom = form.facturationNom.data
            else:
                qry.facturationNom = form.facturationNomALT.data
            qry.somme=form.somme.data
            qry.date=form.date.data
            qry.comment=form.comment.data
            
            #qry=form
            db.session.commit()
            return redirect(url_for('facturation'))
        elif form.is_submitted():
            flash("Invalid Data. Please re-check and submit again!")
    if tbl=='retrocession':
        qry = Retrocession.query.filter(
            Retrocession.retrocessionId==id).first()
        #doc = qry.first()
        
        form=AddRetrocessionForm(obj=qry)
        choices=[(rettype.retrocessionType,rettype.retrocessionType)for rettype in db.engine.execute("select * from retrocessiontype").fetchall()]
        form.retrocessionType.choices = choices
        
        form.retrocessionNom.choices=[(qry.retrocessionNom,qry.retrocessionNom)]
        
        if form.validate_on_submit():
            #qry.doctorid = form.doctorid.data
            qry.retrocessionType=form.retrocessionType.data
            if form.retrocessionNomALT.data=="":
                qry.retrocessionNom = form.retrocessionNom.data
            else:
                qry.retrocessionNom = form.retrocessionNomALT.data
            qry.somme=form.somme.data
            qry.date=form.date.data
            qry.comment=form.comment.data
            
            #qry=form
            db.session.commit()
            return redirect(url_for('retrocession'))
        elif form.is_submitted():
            flash("Invalid Data. Please re-check and submit again!")            
    if tbl=='dentisterie':
        qry = Dentisterie.query.filter(
            Dentisterie.dentisterieId==id).first()
        #doc = qry.first()
        
        form=AddDentistryInfoForm(obj=qry)
        choices=[(facttype.dentisterietype,facttype.dentisterietype)for facttype in db.engine.execute("select * from dentisterietype").fetchall()]
        form.dentisterieType.choices = choices
        
        form.dentisterieNom.choices=[(qry.dentisterieNom,qry.dentisterieNom)]
        
        if form.validate_on_submit():
            #qry.doctorid = form.doctorid.data
            
            qry.dentisterieType=form.dentisterieType.data
            if form.dentisterieNomALT.data == "":
                qry.dentisterieNom = form.dentisterieNom.data
            else:
                qry.dentisterieNom = form.dentisterieNomALT.data
            qry.somme=form.somme.data
            qry.date=form.date.data
            
            #qry=form
            db.session.commit()
            return redirect(url_for('dentisterie'))
        elif form.is_submitted():
            flash("Invalid Data. Please re-check and submit again!")
    if tbl=="encaissement":
        qry=Encaissement.query.filter(Encaissement.encaissementId==id).first()
        form=AddEncaissementForm(obj=qry,banque=qry.banque.strip())
        encaissementnameschoices = []
        encaissementnameschoices.append(("addnew","Ajouter Nouveau ?"))
        for encname in db.engine.execute("select * from encaissement").fetchall():
            if not any(obj[0] == encname.encaissementNom for obj in encaissementnameschoices):
                encaissementnameschoices.append((encname.encaissementNom,encname.encaissementNom))

        form.encaissementNom.choices = encaissementnameschoices
        if form.validate_on_submit():
            qry.encaissementDate=form.encaissementDate.data
            
            if form.encaissementNom.data!="addnew":
                qry.encaissementNom=form.encaissementNom.data
            else:   
                qry.encaissementNom=form.encaissementNomALT.data 
            qry.montant=form.montant.data
            qry.banque=form.banque.data
            qry.comment=form.comment.data
            db.session.commit()
            return redirect(url_for('encaissement'))
        elif form.is_submitted():
            flash("Invalid Data. Please re-check and submit again!")

    if tbl=='user':
        qry = User.query.filter(
            User.id==id
        ).first()


        
        if qry.role=="admin":
            form=EditRegisterForm(obj=qry,isAdmin=True)
        else:
            form=EditRegisterForm(obj=qry,isAdmin=False)
        form.access.data = qry.access.split(" ")
        if form.validate_on_submit():
            #qry.doctorid = form.doctorid.data
            form.access.data=None
            
            rolesstr=" "
            qry.username=form.username.data
            qry.password = form.password.data
            if form.isAdmin.data:
                qry.role="admin"
            else:
                qry.role="user"

            qry.access=rolesstr.join(request.form.getlist('access'))
            
            #new_user = User(username=form.username.data,password=form.password.data,role="user",access=rolesstr.join(form.access.data))
            #qry=form
            db.session.commit()
            return redirect(url_for('user'))
        else:
            print(form.errors)
        

    return render_template('edititem.html',form=form,tbl=tbl)



@app.route('/delete_entry/tbl=<tbl>/tblid=<tblid>/id=<id>',methods=['GET','POST'])
@login_required
def delete_entry(tbl,tblid,id):
    db.engine.execute("delete from \"{0}\" where {1}={2}".format(tbl,tblid,id))
    db.session.commit()
    if 'type' in tbl:
        return redirect(url_for('setup'))
    elif 'leasing' in tbl:
        current_route=session.get('curr_route',None)
        return redirect(current_route)
    elif 'percentageactivity' in tbl:
        current_route=session.get('curr_route',None)
        return redirect(current_route)
    else:
        return redirect(url_for(tbl))

@app.route('/validate_entry/tbl=<tbl>/tblid=<tblid>/id=<id>',methods=['GET','POST'])
@login_required
def validate_entry(tbl,tblid,id):
    db.engine.execute("UPDATE \"{0}\" SET Valide ='valide' where {1}={2}".format(tbl,tblid,id))
    db.session.commit()
    return redirect(url_for(tbl))

    
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

def convert_list_to_json_meds(inputlist):
    returnedjson = []
    for item in inputlist:
        line = {}
        for idx,value in enumerate(item):
            line[idx]=str(value)
        #print(item)
        #print(json.dumps(item))
        returnedjson.append(line)
    #print(returnedjson)
    return returnedjson    

def convert_list_to_json_for_modules(inputlist):
    returnedjson = []
    for item in inputlist:
        line = {}
        for idx,value in enumerate(item):
            line[idx]=value
        #print(item)
        #print(json.dumps(item))
        returnedjson.append(line)
    #print(returnedjson)
    #return {"data":returnedjson}
    return returnedjson

def get_modules_data(moduletype,strtdte,enddte,minamount,maxamount,validefilter):
    if moduletype=='payment':
        listitems = db.engine.execute("""Select  top 1000 * from payment where date BETWEEN '{0}' and '{1}' and somme BETWEEN {2} and {3} and valide LIKE '{4}' order by paiementsId DESC""".format(strtdte,enddte,minamount,maxamount,validefilter))
    elif moduletype=='salaire':
        listitems = db.engine.execute("""Select  top 1000 * from salaire where date BETWEEN '{0}' and '{1}' and somme BETWEEN {2} and {3} and valide LIKE '{4}' order by salaireId DESC""".format(strtdte,enddte,minamount,maxamount,validefilter))
    elif moduletype=='facturation':
        listitems = db.engine.execute("""Select  top 1000 * from facturation where date BETWEEN '{0}' and '{1}' and somme BETWEEN {2} and {3} and valide LIKE '{4}' order by facturationId DESC""".format(strtdte,enddte,minamount,maxamount,validefilter))
    elif moduletype=='retrocession':
        listitems = db.engine.execute("""Select  top 1000 * from retrocession where date BETWEEN '{0}' and '{1}' and somme BETWEEN {2} and {3} and valide LIKE '{4}' order by retrocessionId DESC""".format(strtdte,enddte,minamount,maxamount,validefilter))        
    elif moduletype=='encaissement':
        listitems = db.engine.execute("""Select  top 1000 * from encaissement where encaissementDate BETWEEN '{0}' and '{1}' and montant BETWEEN {2} and {3} and valide LIKE '{4}' order by encaissementId DESC""".format(strtdte,enddte,minamount,maxamount,validefilter))        
    


        
    listitemsjson = convert_list_to_json_for_modules(listitems)
    
    return (listitemsjson)



def get_users_data():
    userlist=db.engine.execute("""Select * from [Flask_DataEntry_DB].[dbo].[user]""")
    userlistjson=convert_list_to_json(userlist)
    return (userlistjson)

def get_types_data():
    facturationtypels = db.engine.execute("""Select 'facturationtype' as 'Name', * from facturationtype""")
    facturationtypejson = convert_list_to_json(facturationtypels)

    paymenttypels = db.engine.execute("""Select'paymenttype' as 'Name', * from paymenttype""")
    paymenttypejson = convert_list_to_json(paymenttypels)

    salairetypels = db.engine.execute("""Select'salairetype' as 'Name', * from salairetype""")
    salairetypejson = convert_list_to_json(salairetypels)

    retrocessiontypels = db.engine.execute("""Select 'retrocessiontype' as 'Name' ,* from retrocessiontype""")
    retrocessiontypejson = convert_list_to_json(retrocessiontypels)

    dentisterietypels = db.engine.execute("""Select 'dentisterietype' as 'Name', * from dentisterietype""")
    dentisterietypejson = convert_list_to_json(dentisterietypels)

    fraismaterieltypels = db.engine.execute("""Select 'fraismaterieltype' as 'Name', * from fraismaterieltype""")
    fraismaterieltypejson = convert_list_to_json(fraismaterieltypels)

    return (facturationtypejson+paymenttypejson+retrocessiontypejson+dentisterietypejson+fraismaterieltypejson+salairetypejson)
    

def get_medicins_data(id):
    doc_info = db.engine.execute("""Select * from medicalperson where medid={0}""".format(id))
    doctor_json={}
    for doc in doc_info:
        doctor_json["id"]=doc[0]
        doctor_json["name"]=doc[1]
        doctor_json["speciality"]=doc[2]
        doctor_json["type"]=doc[3]
        doctor_json["perc_share"]=doc[4]
        doctor_json["charge_soc"]=doc[5]
        doctor_json["surface_accorde"]=doc[6]
        doctor_json["medsalaire"]=doc[7]
        doctor_json["salaireparan"]=doc[8]
        doctor_json["secretaire"]=doc[9]
        doctor_json["secretaire_perc"]=doc[10]
        doctor_json["logiciel"]=doc[11]
        doctor_json["medtelephone"]=doc[12]
        doctor_json["medaddress"]=doc[13]
        doctor_json["medemail"]=doc[14]
        doctor_json["medcoordonneebanc"]=doc[15]
        doctor_json["mednoavs"]=doc[16]
        doctor_json["medstartdate"]=str(doc[17])
        doctor_json["medenddate"]=str(doc[18])
        doctor_json["isemployee"]=doc[19]

        perc_activity=[]
        activities = db.engine.execute("""Select * from percentageactivity where docteur='{0}'""".format(doc[1]))
        for perc in activities:
            perc_activity.append({"0":perc[0],"1":perc[2],"2":perc[3],"3":perc[4]})

        medsalaires=[]
        salaires = db.engine.execute("""Select * from medsalaire where mednom='{0}'""".format(doc[1]))
        for sal in salaires:
            medsalaires.append({"0":sal[0],"1":sal[2],"2":sal[5],"3":str(sal[3]),"4":str(sal[4])})

        doctor_json["activities"]=perc_activity
        doctor_json["medsalaires"]=medsalaires

    return (doctor_json)

def get_employee_data(id):
    emp_info = db.engine.execute("""Select * from employee where empid={0}""".format(id))
    employee_json={}
    for emp in emp_info:
        employee_json["empid"]=emp[0]
        employee_json["empnom"]=emp[1]
        employee_json["empaddress"]=emp[2]
        employee_json["emptelephone"]=emp[3]
        employee_json["empemail"]=emp[4]
        employee_json["empcoordonnebanc"]=emp[5]
        employee_json["empnoavs"]=emp[6]
        employee_json["emppole"]=emp[7]
        employee_json["empintituleposte"]=emp[8]
        employee_json["empdatedebut"]=str(emp[9])
        employee_json["empdatefin"]=str(emp[10])
        
        perc_activity=[]
        activities = db.engine.execute("""Select * from employee_percentageactivity where employee='{0}'""".format(emp[1]))
        for perc in activities:
            perc_activity.append({"0":perc[0],"1":perc[2],"2":perc[3],"3":perc[4],"4":str(perc[5]),"5":str(perc[6])})

        empsalaires=[]
        salaires = db.engine.execute("""Select * from empsalaire where empnom='{0}'""".format(emp[1]))
        for sal in salaires:
            empsalaires.append({"0":sal[0],"1":sal[2],"2":sal[5],"3":str(sal[3]),"4":str(sal[4])})

        employee_json["activities"]=perc_activity
        employee_json["empsalaires"]=empsalaires

    return (employee_json)   



#get_medicins_data(1)

@app.route('/get_dashboard_table',methods=["POST"])

def getdashboardtable():
    module=request.json["module"]
    if module == "facturation":
        facturationforreportlist=db.engine.execute("""SELECT facturationType AS FacturationType, 
        ISNULL(SUM (CASE WHEN Month(date)=1 THEN somme END),0) AS Janvier,
        ISNULL(SUM (CASE WHEN Month(date)=2 THEN somme END),0) AS Février,
        ISNULL(SUM (CASE WHEN Month(date)=3 THEN somme END),0) AS Mars,
        ISNULL(SUM (CASE WHEN Month(date)=4 THEN somme END),0) AS Avril,
        ISNULL(SUM (CASE WHEN Month(date)=5 THEN somme END),0) AS Mai,
        ISNULL(SUM (CASE WHEN Month(date)=6 THEN somme END),0) AS Juin,
        ISNULL(SUM (CASE WHEN Month(date)=7 THEN somme END),0) AS Juillet,
        ISNULL(SUM (CASE WHEN Month(date)=8 THEN somme END),0) AS Aout,
        ISNULL(SUM (CASE WHEN Month(date)=9 THEN somme END),0) AS Septembre,
        ISNULL(SUM (CASE WHEN Month(date)=10 THEN somme END),0) AS Octobre,
        ISNULL(SUM (CASE WHEN Month(date)=11 THEN somme END),0) AS Novembre,
        ISNULL(SUM (CASE WHEN Month(date)=12 THEN somme END),0) AS Décembre,
        ISNULL(SUM (somme),0) AS TOTAL

        FROM facturation
        WHERE YEAR(date) ={0}
        and Valide='valide'
        GROUP BY facturationType""".format(request.json["year"]))
        returned_json = convert_list_to_json(facturationforreportlist)
    elif module=="paiement":
        paymentforreportlist=db.engine.execute("""SELECT paiementsType AS PaiementType, 
        ISNULL(SUM (CASE WHEN Month(date)=1 THEN somme END),0) AS Janvier,
        ISNULL(SUM (CASE WHEN Month(date)=2 THEN somme END),0) AS Février,
        ISNULL(SUM (CASE WHEN Month(date)=3 THEN somme END),0) AS Mars,
        ISNULL(SUM (CASE WHEN Month(date)=4 THEN somme END),0) AS Avril,
        ISNULL(SUM (CASE WHEN Month(date)=5 THEN somme END),0) AS Mai,
        ISNULL(SUM (CASE WHEN Month(date)=6 THEN somme END),0) AS Juin,
        ISNULL(SUM (CASE WHEN Month(date)=7 THEN somme END),0) AS Juillet,
        ISNULL(SUM (CASE WHEN Month(date)=8 THEN somme END),0) AS Aout,
        ISNULL(SUM (CASE WHEN Month(date)=9 THEN somme END),0) AS Septembre,
        ISNULL(SUM (CASE WHEN Month(date)=10 THEN somme END),0) AS Octobre,
        ISNULL(SUM (CASE WHEN Month(date)=11 THEN somme END),0) AS Novembre,
        ISNULL(SUM (CASE WHEN Month(date)=12 THEN somme END),0) AS Décembre,
        ISNULL(SUM (somme),0) AS TOTAL

        FROM payment
        WHERE YEAR(date) ={0}
        and Valide='valide'
        GROUP BY paiementsType""".format(request.json["year"]))
        returned_json = convert_list_to_json(paymentforreportlist)        

    return jsonify(returned_json)

@app.route('/get_module_data')
@login_required
def getmoduledata():
    try:
        startDate = request.args["startDate"]
        endDate = request.args["endDate"]
        minamount = request.args["minamount"]
        maxamount = request.args["maxamount"]
        validefilter= request.args["validefilter"]
    except:
        startDate = datetime.datetime(datetime.datetime.now().year,1,1)
        endDate = datetime.datetime(datetime.datetime.now().year,12,31)
        minamount = 0
        maxamount=99999999
        validefilter = ""
    if request.args["moduletype"]=='payment':
        return(jsonify(get_modules_data('payment',startDate,endDate,minamount,maxamount,validefilter)))
    elif request.args["moduletype"]=='facturation':
        return(jsonify(get_modules_data('facturation',startDate,endDate,minamount,maxamount,validefilter)))
    elif request.args["moduletype"]=='salaire':
        return(jsonify(get_modules_data('salaire',startDate,endDate,minamount,maxamount,validefilter)))       
    elif request.args["moduletype"]=='retrocession':
        return(jsonify(get_modules_data('retrocession',startDate,endDate,minamount,maxamount,validefilter)))    
    elif request.args["moduletype"]=='encaissement':
        return(jsonify(get_modules_data('encaissement',startDate,endDate,minamount,maxamount,validefilter)))  
    elif request.args["moduletype"]=='medicins':
        #print(get_medicins_data( request.args["id"]))
        return(jsonify(get_medicins_data( request.args["id"])) )
    elif request.args["moduletype"]=='employee':
        #print(get_medicins_data( request.args["id"]))
        return(jsonify(get_employee_data( request.args["id"])) )        
     


@app.route('/edit_module_item',methods=["POST"])
@login_required
def editmoduleitem():
    module=request.json['module']
    id = request.json['id']
    

    if module=='payment':
        newtype = request.json['newtype']
        newname = request.json['newname']
        newamount = request.json['newamount']
        newdate = request.json['newdate']
        newcomment = request.json['newcomment']
        db.engine.execute("""UPDATE payment set
                          paiementsType = '{0}',
                          paiementsNom = '{1}',
                          somme='{2}',
                          comment='{3}',
                          date='{4}'
    
                          Where paiementsId={5}""".format(newtype,newname,newamount,newcomment,newdate,id))
    elif module=='salaire':
        newtype = request.json['newtype']
        newname = request.json['newname']
        newamount = request.json['newamount']
        newdate = request.json['newdate']
        newcomment = request.json['newcomment']
        db.engine.execute("""UPDATE salaire set
                          salaireType = '{0}',
                          salaireNom = '{1}',
                          somme='{2}',
                          comment='{3}',
                          date='{4}'
    
                          Where salaireId={5}""".format(newtype,newname,newamount,newcomment,newdate,id))
    elif module=='facturation':
        newtype = request.json['newtype']
        newname = request.json['newname']
        newamount = request.json['newamount']
        newdate = request.json['newdate']
        newcomment = request.json['newcomment']
        db.engine.execute("""UPDATE facturation set
                          facturationType = '{0}',
                          facturationNom = '{1}',
                          somme='{2}',
                          comment='{3}',
                          date='{4}'
    
                          Where facturationId={5}""".format(newtype,newname,newamount,newcomment,newdate,id))  
    elif module=='retrocession':
        newtype = request.json['newtype']
        newname = request.json['newname']
        newamount = request.json['newamount']
        newdate = request.json['newdate']
        newcomment = request.json['newcomment']
        db.engine.execute("""UPDATE retrocession set
                          retrocessionType = '{0}',
                          retrocessionNom = '{1}',
                          somme='{2}',
                          comment='{3}',
                          date='{4}'
    
                          Where retrocessionId={5}""".format(newtype,newname,newamount,newcomment,newdate,id)) 
    elif module=='encaissement':
        newbanque = request.json['newbanque']
        newname = request.json['newname']
        newamount = request.json['newamount']
        newdate = request.json['newdate']
        newcomment = request.json['newcomment']
        db.engine.execute("""UPDATE encaissement set
                          banque = '{0}',
                          encaissementNom = '{1}',
                          montant='{2}',
                          comment='{3}',
                          encaissementDate='{4}'
    
                          Where encaissementId={5}""".format(newbanque,newname,newamount,newcomment,newdate,id)) 
        
    elif module=='medicinsenddate':
        doc_id=request.json["id"]
        doc_enddate=request.json["medenddate"]

        db.engine.execute("""UPDATE medicalperson set
                          medenddate='{1}'
                          where medid={0}
                          """.format(doc_id,doc_enddate))

    elif module=='employeeenddate':
        emp_id=request.json["id"]
        emp_enddate=request.json["empenddate"]

        db.engine.execute("""UPDATE employee set
                          empdatefin='{1}'
                          where empid={0}
                          """.format(emp_id,emp_enddate))                          

    elif module=='employee':
        emp_id=request.json["id"]
        empnom=request.json['empnom']
        empaddress=request.json['empaddress']
        emptel=request.json['emptel']
        empemail=request.json['empemail']
        empcoordbanc=request.json['empcoordbanc']
        empnoavs=request.json['empnoavs']
        emppole=request.json['emppole']
        empposte=request.json['empposte']
        empdatedebut=request.json['empdatedebut']
        activities=request.json['percentage_activities']
        salaires=request.json['empsalaires']
        db.engine.execute("""UPDATE employee
                          Set 
                            empnom='{0}',
                            empaddress='{1}',
                            emptelephone='{2}',
                            empemail='{3}',
                            empcoordonnebanc='{4}',
                            empnoavs={5},
                            emppole='{6}',
                            empintituleposte='{7}',
                            empdatedebut='{8}'
                            where empid={9}
                          """.format(empnom,empaddress,emptel,empemail,empcoordbanc,empnoavs,emppole,empposte,empdatedebut,emp_id))
        db.engine.execute("""DELETE FROM employee_percentageactivity where employee='{0}'""".format(empnom))
        for act in activities:
            db.engine.execute("""INSERT INTO employee_percentageactivity VALUES ('{0}','{1}','{2}',{3},'{4}','{5}')""".format(empnom,act[0],act[1],act[2],act[3],act[4])) 

        db.engine.execute("""DELETE FROM empsalaire where empnom='{0}'""".format(empnom))
        for sal in salaires:
            db.engine.execute("""INSERT INTO empsalaire VALUES ('{0}',{1},'{2}','{3}',{4})""".format(empnom,sal[0],sal[2],sal[3],sal[1])) 
    
    elif module=='medicins':
        
        name=request.json["mednom"]
        speciality=request.json["medspeciality"]
        typee=request.json["medtype"]
        perc_share=request.json["medpourcentage"]
        charge_soc=request.json["medchargesociales"]
        surface_accorde=request.json["medsurfaceaccordee"]
        #medsalaire=request.json["medsalaire"]
        #salaireparan=request.json["mednombremoissalaireparan"]
        #secretaire=request.json["medsecretaire"]
        #secretaire_perc=request.json["medpourcentagesecretaire"]
        logiciel=request.json["medlogiciels"]
        logiciel = '||'.join(logiciel)
        medtelephone=request.json["medtelephone"]
        medaddress=request.json["medaddress"]
        
        medemail=request.json["medemail"]
        medcoordonneebanc=request.json["medcoordonneebanc"]
        mednoavs=request.json["mednoavs"]
        medstartdate=request.json["medstartdate"]
        #medenddate=request.json["medenddate"],
        isemployee=request.json["isemployee"]
        activities=request.json["percentage_activities"]
        salaires=request.json["medsalaires"]
        #activities=request.json["activities"]
        db.engine.execute("""UPDATE medicalperson set
                            mednom = '{0}',
                            medspeciality = '{1}',
                            medtype ='{2}',
                            medpourcentage = {3},
                            medaddress='{4}',
                            medchargesociales = {5},
                            medsurfaceaccordee = {6},
                            medsalaire=0,
                            mednombremoissalaireparan=0,
                            medsecretaire='0',
                            medpourcentagesecretaire=0,
                            medlogiciels='{7}',
                            medtelephone='{8}',
                            
                            medemail='{9}',
                            medcoordonneebanc='{10}',
                            mednoavs={11},
                            medstartdate='{12}',
                            
                            isemployee='{13}'
                            where medid={14}
                            
        """.format(name,speciality,typee,perc_share,medaddress,charge_soc,surface_accorde,logiciel,medtelephone,medemail,medcoordonneebanc,mednoavs,medstartdate,isemployee,id))
        db.engine.execute("""DELETE FROM percentageactivity where docteur='{0}'""".format(name))
        for act in activities:
            db.engine.execute("""INSERT INTO percentageactivity VALUES ('{0}',{1},{2},{3})""".format(name,act[0],act[1],act[2])) 

        db.engine.execute("""DELETE FROM medsalaire where mednom='{0}'""".format(name))
        for sal in salaires:
            db.engine.execute("""INSERT INTO medsalaire VALUES ('{0}',{1},'{2}','{3}',{4})""".format(name,sal[0],sal[2],sal[3],sal[1]))             
        

                       
    return(jsonify({"Status":"OK"})) 

@app.route('/delete_module_item',methods=["POST"])
@login_required
def delete_module_item():
    module=request.json['module']
    id = request.json['id']
    
    if module=='payment':
        db.engine.execute("""DELETE from payment where paiementsid ={0}""".format(id))
    elif module=='salaire':
        db.engine.execute("""DELETE from salaire where salaireid ={0}""".format(id))        
    elif module=='facturation':
        db.engine.execute("""DELETE from facturation where facturationid ={0}""".format(id))  
    elif module=='retrocession':
        db.engine.execute("""DELETE from retrocession where retrocessionid ={0}""".format(id))    
    elif module=='encaissement':
        db.engine.execute("""DELETE from encaissement where encaissementid ={0}""".format(id))      
    elif module=='medicins':
        db.engine.execute("""DELETE from medicalperson where medid ={0}""".format(id))      
    elif module=='employee':
        db.engine.execute("""DELETE from employee where empid ={0}""".format(id))              

    return(jsonify({"Status":"OK"})) 


@app.route('/duplicate_module_item',methods=["POST"])
@login_required
def duplicatemoduleitem():
    id2duplicate = request.json['id']
    module = request.json['module']
    if module == 'payment':
        db.engine.execute("""insert into payment (paiementsType, paiementsNom,somme,comment,"date")
select paiementsType, paiementsNom,somme,comment,"date"
from payment
where paiementsId = {0}""".format(id2duplicate))
    elif module == 'facturation':
        db.engine.execute("""insert into facturation (facturationType, facturationNom,somme,comment,"date")
select facturationType, facturationNom,somme,comment,"date"
from facturation
where facturationId = {0}""".format(id2duplicate))      
    elif module == 'retrocession':
        db.engine.execute("""insert into retrocession (retrocessionType, retrocessionNom,somme,comment,"date",Valide)
select retrocessionType, retrocessionNom,somme,comment,"date",Valide
from retrocession
where retrocessionId = {0}""".format(id2duplicate))
    elif module == 'encaissement':
        db.engine.execute("""insert into encaissement (encaissementNom,montant,comment,encaissementDate,banque)
select encaissementNom,montant,comment,encaissementDate,banque
from encaissement
where encaissementId = {0}""".format(id2duplicate))                     
    
    return(jsonify({"Status":"OK"})) 


@app.route('/validate_item',methods=["POST"])
@login_required
def validateitem():
    id2validate = request.json['id']
    module = request.json['module']
    if module == 'payment':
        db.engine.execute("""UPDATE payment SET Valide='valide' where paiementsId = {0}""".format(id2validate))
    elif module == 'salaire':
        db.engine.execute("""UPDATE salaire SET Valide='valide' where salaireId = {0}""".format(id2validate))
    elif module == 'facturation':
        db.engine.execute("""UPDATE facturation SET Valide='valide' where facturationId = {0}""".format(id2validate))  
    elif module == 'retrocession':
        db.engine.execute("""UPDATE retrocession SET Valide='valide' where retrocessionId = {0}""".format(id2validate))      
    elif module == 'encaissement':
        db.engine.execute("""UPDATE encaissement SET Valide='valide' where encaissementId = {0}""".format(id2validate))                     
    
    return(jsonify({"Status":"OK"})) 

@app.route('/edit_type',methods=["POST"])
@login_required
def edittype():
    """UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition; """
    category = request.json["id"].split("_")[0]
    typeid = request.json["id"].split("_")[1]
    newvalue = request.json["new_value"]
    
    if category == "facturationtype":
        db.engine.execute("""UPDATE facturationtype SET facturationType = '{0}' WHERE facturationtypeid = {1} """.format(newvalue,typeid))
    elif category == "paymenttype":
        db.engine.execute("""UPDATE paymenttype SET paiementsType = '{0}' WHERE paiementstypeid = {1} """.format(newvalue,typeid))
    elif category == "salairetype":
        db.engine.execute("""UPDATE salairetype SET salaireType = '{0}' WHERE salairetypeid = {1} """.format(newvalue,typeid))        
    elif category == "retrocessiontype":
        db.engine.execute("""UPDATE retrocessiontype SET retrocessionType = '{0}' WHERE retrocessiontypeid = {1} """.format(newvalue,typeid))
    elif category == "dentisterietype":
        db.engine.execute("""UPDATE dentisterietype SET dentisterietype = '{0}' WHERE dentisterietypeid = {1} """.format(newvalue,typeid))    
    elif category == "fraismaterieltype":
        db.engine.execute("""UPDATE fraismaterieltype SET fraismaterieltype = '{0}' WHERE fraismaterieltypeid = {1} """.format(newvalue,typeid))        

    return(jsonify({"Status":"OK"})) 


@app.route('/get_types_data')
@login_required
def gettypesdata():
    return jsonify(get_types_data())

@app.route('/delete_type',methods=["POST"])
@login_required
def delete_types():
    #db.engine.execute("""Delete from "user" where id = {0}""".format(2012))
    print(request.json["ids"])
    try:
        for id in request.json["ids"]:
            print(id["type"],id["id"])
            if id["type"]=="facturationtype":
                db.engine.execute("""Delete from facturationtype where facturationtypeid = {1}""".format(id["type"],id["id"]))
            elif id["type"]=="paymenttype":
                db.engine.execute("""Delete from paymenttype where paiementstypeid = {1}""".format(id["type"],id["id"]))
            elif id["type"]=="salairetype":
                db.engine.execute("""Delete from salairetype where salairetypeid = {1}""".format(id["type"],id["id"]))                
            elif id["type"]=="retrocessiontype":
                db.engine.execute("""Delete from retrocessiontype where retrocessiontypeid = {1}""".format(id["type"],id["id"]))
            elif id["type"]=="dentisterietype":
                db.engine.execute("""Delete from dentisterietype where dentisterietypeId = {1}""".format(id["type"],id["id"])) 
            elif id["type"]=="fraismaterieltype":
                db.engine.execute("""Delete from fraismaterieltype where fraismaterieltypeId = {1}""".format(id["type"],id["id"]))                                    
    except:
        return(jsonify({"Status":"Not all records were deleted"}))    
    return(jsonify({"Status":"OK"}))  

@app.route('/get_users_data')
@login_required
def getusersdata():   
    return jsonify(get_users_data())

@app.route('/delete_user',methods=["POST"])
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

@app.route('/edit_user',methods=["POST"])
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

@app.route('/get_kpi_cards',methods=['GET'])
@login_required
def get_kpi_cards():

    try:
        fromdate=datetime.datetime.strptime(request.args["fromdate"],"%Y-%m-%d")
        todate=datetime.datetime.strptime(request.args["todate"],"%Y-%m-%d")
    except:
        fromdate = date(datetime.datetime.now().year,1,1)#year month day
        todate = date(datetime.datetime.now().year,12,31)

    daysdiff = (todate-fromdate).days

    oldfrom = (fromdate - timedelta(days=daysdiff))
    paymentls,paysum = get_ls_for_dashboard("""Select paiementstype as PaiementType, SUM(somme)  as somme from payment where Valide='valide' and date BETWEEN '{0}' and '{1}' group by paiementsType """.format(fromdate,todate))
    paymentoldls,paysumold = get_ls_for_dashboard("""Select paiementstype as PaiementType, SUM(somme)  as somme from payment where Valide='valide' and date BETWEEN '{0}' and '{1}' group by paiementsType """.format(oldfrom,fromdate))
    
    paymentpercentagechange = ((paysum-paysumold)/(paysum+paysumold))*100

    salairels,salsum = get_ls_for_dashboard("""Select salairetype as SalaireType, SUM(somme)  as somme from salaire where Valide='valide' and date BETWEEN '{0}' and '{1}' group by salaireType """.format(fromdate,todate))
    salaireoldls,salsumold = get_ls_for_dashboard("""Select salairetype as SalaireType, SUM(somme)  as somme from salaire where Valide='valide' and date BETWEEN '{0}' and '{1}' group by salaireType """.format(oldfrom,fromdate))
    
    salairepercentagechange = ((salsum-salsumold)/(salsum+salsumold))*100

    factls,factsum = get_ls_for_dashboard("""Select facturationtype as FacturationType, SUM(somme)  as somme from facturation where Valide='valide' and date BETWEEN '{0}' and '{1}' group by facturationtype """.format(fromdate,todate))
    factoldls,factsumold = get_ls_for_dashboard("""Select facturationtype as FacturationType, SUM(somme)  as somme from facturation where Valide='valide' and date BETWEEN '{0}' and '{1}' group by facturationtype """.format(oldfrom,fromdate))
    
    facturationpercentagechange = ((factsum-factsumold)/(factsum+factsumold))*100

    retrols,retrosum = get_ls_for_dashboard("""Select retrocessiontype as RetrocessionType, SUM(somme)  as somme from retrocession where Valide='valide' and date BETWEEN '{0}' and '{1}' group by retrocessiontype """.format(fromdate,todate))
    retrooldls,retrosumold = get_ls_for_dashboard("""Select retrocessiontype as RetrocessionType, SUM(somme)  as somme from retrocession where Valide='valide' and date BETWEEN '{0}' and '{1}' group by retrocessiontype """.format(oldfrom,fromdate))
    
    retrocessionpercentagechange = ((retrosum-retrosumold)/(retrosum+retrosumold))*100

    
    encls,encsum = get_ls_for_dashboard("""select banque, SUM(montant) AS somme from encaissement where Valide='valide' and encaissementDate BETWEEN '{0}' and '{1}'  group by banque""".format(fromdate,todate))
    encoldls,encsumold = get_ls_for_dashboard("""select banque, SUM(montant) AS somme from encaissement where Valide='valide' and encaissementDate BETWEEN '{0}' and '{1}'  group by banque""".format(fromdate,todate))
    
    encaissementpercentagechange = ((encsum-encsumold)/(encsum+encsumold))*100    

    pnl =  encsum-(salsum+paysum+retrosum)  
    pnlold =   encsumold-(salsumold+paysumold+retrosumold)

    pnlpercentagechange = ((pnl-pnlold)/(pnl+pnlold))*100

    

    return(jsonify({"payment":
                    {"newtotal":paysum,
                     "oldtotal":paysumold,
                     "oldfrom":oldfrom,
                     "oldto":fromdate,
                    "percentagechange":paymentpercentagechange},

                    "salaire":
                    {"newtotal":salsum,
                     "oldtotal":salsumold,
                     "oldfrom":oldfrom,
                     "oldto":fromdate,
                    "percentagechange":salairepercentagechange},
                    
                    "facturation":
                    {"newtotal":factsum,
                     "oldtotal":factsumold,
                    "oldfrom":oldfrom,
                     "oldto":fromdate,
                    "percentagechange":facturationpercentagechange},

                    "retrocession":
                    {"newtotal":retrosum,
                     "oldtotal":retrosumold,
                    "oldfrom":oldfrom,
                     "oldto":fromdate,
                    "percentagechange":retrocessionpercentagechange},

                    "encaissement":
                    {"newtotal":encsum,
                     "oldtotal":encsumold,
                    "oldfrom":oldfrom,
                     "oldto":fromdate,
                    "percentagechange":encaissementpercentagechange},

                    "pnl":
                    {"newtotal":pnl,
                     "oldtotal":pnlold,
                    "oldfrom":oldfrom,
                     "oldto":fromdate,
                    "percentagechange":pnlpercentagechange}                                       
                    }))
      
    


@app.route('/user',methods=['GET','POST'])
def user():
    form=RegisterForm()
    editform=EditRegisterForm()
    userlslist=db.engine.execute("select id as ID,username as Utilisateur ,role ,access as accès from \"user\"")
    userlslistitems=userlslist.fetchall()
    headersuserlslist=userlslist.keys()
    if form.validate_on_submit():
        password=form.password.data
        #hashed_password= Bcrypt.generate_password_hash(password)
        rolesstr=" "
        if form.isAdmin.data:
            new_user = User(username=form.username.data,password=form.password.data,role="admin",access=rolesstr.join(form.access.data))
        else:
            new_user = User(username=form.username.data,password=form.password.data,role="user",access=rolesstr.join(form.access.data))
        
        db.session.add(new_user)
        db.session.commit()
        
        return redirect(url_for('user'))
    if current_user.role=="admin":
        return render_template("app.html",content='usermanagement',editform=editform,form=form,table=userlslistitems,headers=headersuserlslist,username=current_user.username.title(),user_role=current_user.role,dbtable="user",dbtableid="id")
    else:
        return render_template("NOT_AUTHORIZED.html")

def convert_list_to_dataframe(input_list):
    items=input_list.fetchall()
    headers=input_list.keys()
    output_dataframe = pd.DataFrame(items,columns=headers)

    return output_dataframe

def fetch_doctor_info(doctorname):
    qry = Doctor.query.filter(
            Doctor.doctorname==doctorname
        ).first()
    try:
        nbmedicinsrepartirfrais=getattr(qry,"nbmedicinsrepartirfrais")
        informatique=getattr(qry,"informatique")
        assurances=getattr(qry,"assurances")
        blanchisserie=getattr(qry,"blanchisserieleman")
        nbmedicins=getattr(qry,"nbmedicins")
        logicielaxenita=getattr(qry,"logicielaxenita")
        telephonieinternet=getattr(qry,"telephonieinternet")
        simplify=getattr(qry,"simplify")
        conciergerie=getattr(qry,"conciergerie")
        nettoyage=getattr(qry,"nettoyage")
        surfaceaccordee=getattr(qry,"surfaceaccordee")
        surfacecentremedical=getattr(qry,"surfacecentremedical")
        loyermensuel=getattr(qry,"loyermensuel")
        surfacecommunes=getattr(qry,"surfacecommunes")
        pourcentagesalaire=getattr(qry,"pourcentagesalaire")
        pourcentagechargessociales=getattr(qry,"pourcentagechargessociales")
        salairepersonnel=getattr(qry,"salairepersonnel")
        #pourcentagechargessociales=getattr(qry,"pourcentagechargessociales")
        surfaceaccordee=getattr(qry,"surfaceaccordee")


        dict_to_return={
            "informatique":informatique if informatique != 0 and informatique is not None else 0.1 ,
            "nbmedicinsrepartirfrais":nbmedicinsrepartirfrais if nbmedicinsrepartirfrais != 0 and nbmedicinsrepartirfrais is not None else 0.1 ,
            "assurances":assurances if assurances != 0 and assurances is not None else 0.1, 
            "blanchisserie":blanchisserie if blanchisserie!=0 and blanchisserie is not None else 0.1,
            "nbmedicins":nbmedicins if nbmedicins!=0 and nbmedicins is not None else 0.1,
            "logicielaxenita":logicielaxenita if logicielaxenita!=0 and logicielaxenita is not None else 0.1,
            "telephonieinternet":telephonieinternet if telephonieinternet !=0 and telephonieinternet is not None else 0.1,
            "simplify":simplify if simplify !=0 and simplify is not None else 0.1,
            "conciergerie":conciergerie if conciergerie!=0 and conciergerie is not None else 0.1,
            "nettoyage":nettoyage if nettoyage!=0 and nettoyage is not None else 0.1,
            "surfaceaccordee":surfaceaccordee if surfaceaccordee!=0 and surfaceaccordee is not None else 0.1,
            "surfacecentremedical":surfacecentremedical if surfacecentremedical !=0 and surfacecentremedical is not None else 0.1,
            "loyermensuel":loyermensuel if loyermensuel !=0 and loyermensuel is not None else 0.1,
            "surfacecommunes":surfacecommunes if surfacecommunes !=0 and surfacecommunes is not None else 0.1,
            "pourcentagesalaire":pourcentagesalaire if pourcentagesalaire!=0 and pourcentagesalaire is not None else 0.1,
            "pourcentagechargessociales":pourcentagechargessociales if pourcentagechargessociales!=0 and pourcentagechargessociales is not None else 0.1,
            "salairepersonnel":salairepersonnel if salairepersonnel!=0 and salairepersonnel is not None else 0.1,
            "pourcentagechargessociales":pourcentagechargessociales if pourcentagechargessociales!=0 and pourcentagechargessociales is not None else 0.1,
            "surfaceaccordee":surfaceaccordee if surfaceaccordee!=0 and surfaceaccordee is not None else 0.1
        }
        
        return dict_to_return
    except:
        return None

def get_frais_materiel_df(doctorname):
    composite_df = pd.DataFrame(columns=['Charges','Cout Mensuel','Cout Annuel'])
    
    composite_df.set_index('Charges',inplace=True)
    #print(composite_df)
    dataa=fetch_doctor_info(doctorname)

    informatique_ann=dataa["informatique"]/dataa["nbmedicinsrepartirfrais"]
    informatique_men=informatique_ann/12

    assurance_ann=dataa["assurances"]/dataa["nbmedicinsrepartirfrais"]
    assurance_men=assurance_ann/12

    blanchisserie_ann=dataa["blanchisserie"]/dataa["nbmedicinsrepartirfrais"]
    blanchisserie_men = blanchisserie_ann/12

    logicielaxenita_ann=dataa["logicielaxenita"]/dataa["nbmedicins"]
    logicielaxenita_men=logicielaxenita_ann/12

    telephonieinternet_ann=dataa["telephonieinternet"]/dataa["nbmedicinsrepartirfrais"]
    telephonieinternet_men=telephonieinternet_ann/12

    simplify_ann=dataa["simplify"]/3
    simplify_men=simplify_ann/12

    conciergerie_ann=dataa["conciergerie"]/dataa["nbmedicinsrepartirfrais"]
    conciergerie_men = conciergerie_ann/12

    nettoyage_ann=dataa["nettoyage"]/dataa["nbmedicinsrepartirfrais"]
    nettoyage_men=nettoyage_ann/12

    loyersurfacecom_ann=dataa["surfacecommunes"]*(dataa["loyermensuel"]*12)/(dataa["surfacecentremedical"])*(dataa["surfaceaccordee"]/dataa["surfacecentremedical"])
    loyersurfacecom_men=loyersurfacecom_ann/12

    personnelsalaire_men=dataa["salairepersonnel"]*(dataa["pourcentagesalaire"]/100)
    personnelsalaire_ann=personnelsalaire_men*13

    chargesociales_men=personnelsalaire_men*dataa["pourcentagechargessociales"]/100
    chargesociales_ann=chargesociales_men*13

    prixloyersurfacem2_ann=dataa["surfaceaccordee"]*((dataa["loyermensuel"]*12)/(dataa["surfacecentremedical"]))
    prixloyersurfacem2_men=prixloyersurfacem2_ann/12
    

    temp_df2 = pd.DataFrame({
                "Cout Mensuel": [informatique_men,assurance_men,blanchisserie_men,logicielaxenita_men,telephonieinternet_men,simplify_men,conciergerie_men,nettoyage_men,loyersurfacecom_men,personnelsalaire_men,chargesociales_men,prixloyersurfacem2_men],
                "Cout Annuel":[informatique_ann,assurance_ann,blanchisserie_ann,logicielaxenita_ann,telephonieinternet_ann,simplify_ann,conciergerie_ann,nettoyage_ann,loyersurfacecom_ann,personnelsalaire_ann,chargesociales_ann,prixloyersurfacem2_ann]},
                index=["Informatique","Assurances","Blanchisserie","Axenita","TelePhonie Internet","Simplify","Conciergerie","Nettoyage","Loyer Surface Commune","Personnel  {0}% 13 Salaires".format(str(dataa["pourcentagesalaire"])),"Charges Sociale {0}%".format(str(dataa["pourcentagechargessociales"])),"Prix du loyer surface m2"])

    composite_df=pd.concat([composite_df, temp_df2])
    fraisannuel_somme= composite_df["Cout Annuel"].sum()

    return composite_df,fraisannuel_somme

def summary_table_main_report(year):
    constants_current=db.engine.execute("""SELECT TOP 1 * FROM constants where year = {0} ORDER BY constantsid DESC""".format(year))
    constants_current_df=convert_list_to_dataframe(constants_current)
    constants_year_prior=db.engine.execute("""SELECT TOP 1 * FROM constants where year = {0} ORDER BY constantsid DESC""".format(year-1))
    constants_year_prior_df=convert_list_to_dataframe(constants_year_prior)
    salary_total_curr=db.engine.execute("""select SUM(somme) as somme from payment where paiementsNom LIKE '%salaire%' and Valide='valide' and YEAR(date)={0}""".format(year))
    salary_total_curr_df=convert_list_to_dataframe(salary_total_curr)
    salary_total_yearprior=db.engine.execute("""select SUM(somme) as somme from payment where paiementsNom LIKE '%salaire%' and Valide='valide' and YEAR(date)={0}""".format(year-1))
    salary_total_yearprior_df=convert_list_to_dataframe(salary_total_yearprior)
    pay_total_curr=db.engine.execute("""select SUM(somme) as somme from payment where paiementsNom NOT LIKE '%salaire%' and Valide='valide' and YEAR(date)={0}""".format(year))
    pay_total_curr_df=convert_list_to_dataframe(pay_total_curr)
    pay_total_yearprior=db.engine.execute("""select SUM(somme) as somme from payment where paiementsNom NOT LIKE '%salaire%' and Valide='valide' and YEAR(date)={0}""".format(year-1))
    pay_total_yearprior_df=convert_list_to_dataframe(pay_total_yearprior)
    enc_caisse_curr=db.engine.execute("""select SUM(montant) as somme from encaissement where encaissementNom LIKE '%caisse des m%' and Valide='valide' and YEAR(encaissementDate)={0}""".format(year))
    enc_caisse_curr_df=convert_list_to_dataframe(enc_caisse_curr)
    enc_caisse_yearprior=db.engine.execute("""select SUM(montant) as somme from encaissement where encaissementNom LIKE '%caisse des m%' and Valide='valide' and YEAR(encaissementDate)={0}""".format(year-1))
    enc_caisse_yearprior_df=convert_list_to_dataframe(enc_caisse_yearprior)
    enc_divers_curr=db.engine.execute("""select SUM(montant) as somme from encaissement where encaissementNom NOT LIKE '%caisse des m%' and Valide='valide' and YEAR(encaissementDate)={0}""".format(year))
    enc_divers_curr_df=convert_list_to_dataframe(enc_divers_curr)
    enc_divers_yearprior=db.engine.execute("""select SUM(montant) as somme from encaissement where encaissementNom NOT LIKE '%caisse des m%' and Valide='valide' and YEAR(encaissementDate)={0}""".format(year-1))
    enc_divers_yearprior_df=convert_list_to_dataframe(enc_divers_yearprior)
    fact_med_curr=db.engine.execute("""select SUM(somme) as somme from facturation where facturationtype LIKE '%facturation m%d%' and Valide='valide' and YEAR(Date)={0}""".format(year))
    fact_med_curr_df=convert_list_to_dataframe(fact_med_curr)
    fact_med_yearprior=db.engine.execute("""select SUM(somme) as somme from facturation where facturationtype LIKE '%facturation m%d%' and Valide='valide' and YEAR(Date)={0}""".format(year-1))
    fact_med_yearprior_df=convert_list_to_dataframe(fact_med_yearprior)
    fact_dent_curr=db.engine.execute("""select SUM(somme) as somme from facturation where (facturationtype LIKE '%facturation dentiste%' or facturationtype LIKE '%facturation hygi%') and Valide='valide' and YEAR(Date)={0}""".format(year))
    fact_dent_curr_df=convert_list_to_dataframe(fact_dent_curr)
    fact_dent_yearprior=db.engine.execute("""select SUM(somme) as somme from facturation where (facturationtype LIKE '%facturation dentiste%' or facturationtype LIKE '%facturation hygi%') and Valide='valide' and YEAR(Date)={0}""".format(year-1))
    fact_dent_yearprior_df=convert_list_to_dataframe(fact_dent_yearprior)


    if len(constants_current_df)>0:
        nbept_curr=constants_current_df.iloc[0]["nbept"]
        nbemployes_curr=constants_current_df.iloc[0]["nbemployes"]
        nbmedecins_curr=constants_current_df.iloc[0]["nbmedecins"]
        nbdentistehygieniste_curr=constants_current_df.iloc[0]["nbdentistehygieniste"]
    else:
        nbept_curr=0
        nbemployes_curr=0
        nbmedecins_curr=0
        nbdentistehygieniste_curr=0
        
    if len(constants_year_prior_df)>0:
        nbept_year_prior=constants_year_prior_df.iloc[0]["nbept"]
        nbemployes_year_prior=constants_year_prior_df.iloc[0]["nbemployes"]
        nbmedecins_year_prior=constants_year_prior_df.iloc[0]["nbmedecins"]
        nbdentistehygieniste_year_prior=constants_year_prior_df.iloc[0]["nbdentistehygieniste"]
    else:
        nbept_year_prior=0
        nbemployes_year_prior=0
        nbmedecins_year_prior=0
        nbdentistehygieniste_year_prior=0

    if datetime.datetime.now().year==year:
        multiplier=datetime.datetime.now().month
    else:
        multiplier=12
    
    try:
        pnl_curr=(enc_divers_curr_df.iloc[0]["somme"]+enc_caisse_curr_df.iloc[0]["somme"])-(pay_total_curr_df.iloc[0]["somme"]+salary_total_curr_df.iloc[0]["somme"])
    except:
        pnl_curr=0
    try:
        pnl_prior=(enc_divers_yearprior_df.iloc[0]["somme"]+enc_caisse_yearprior_df.iloc[0]["somme"])-(pay_total_yearprior_df.iloc[0]["somme"]+salary_total_yearprior_df.iloc[0]["somme"])
    except:
        pnl_prior=0


    encdivers_curr=enc_divers_curr_df.iloc[0]["somme"] if enc_divers_curr_df.iloc[0]["somme"]!=None else 0
    enccaisse_curr=enc_caisse_curr_df.iloc[0]["somme"] if enc_caisse_curr_df.iloc[0]["somme"]!=None else 0
    salaire_curr=salary_total_curr_df.iloc[0]["somme"] if salary_total_curr_df.iloc[0]["somme"]!=None else 0
    paiement_curr=pay_total_curr_df.iloc[0]["somme"] if pay_total_curr_df.iloc[0]["somme"]!=None else 0
    fact_med_curr=fact_med_curr_df.iloc[0]["somme"] if fact_med_curr_df.iloc[0]["somme"]!=None else 0
    fact_dent_curr=fact_dent_curr_df.iloc[0]["somme"] if fact_dent_curr_df.iloc[0]["somme"]!=None else 0
    
    temp_df2 = pd.DataFrame({
                "Année précédente":[pnl_prior,enc_divers_yearprior_df.iloc[0]["somme"],enc_caisse_yearprior_df.iloc[0]["somme"],pay_total_yearprior_df.iloc[0]["somme"],salary_total_yearprior_df.iloc[0]["somme"],nbdentistehygieniste_year_prior,nbmedecins_year_prior,nbept_year_prior,nbemployes_year_prior,fact_med_yearprior_df.iloc[0]["somme"],fact_dent_yearprior_df.iloc[0]["somme"]],
                "Année actuelle": [pnl_curr,enc_divers_curr_df.iloc[0]["somme"],enc_caisse_curr_df.iloc[0]["somme"],pay_total_curr_df.iloc[0]["somme"],salary_total_curr_df.iloc[0]["somme"],nbdentistehygieniste_curr,nbmedecins_curr,nbept_curr,nbemployes_curr,fact_med_curr,fact_dent_curr],
                "Projection": [(pnl_curr/multiplier)*12,(encdivers_curr/multiplier)*12,(enccaisse_curr/multiplier)*12,(paiement_curr/multiplier)*12,(salaire_curr/multiplier)*12,nbdentistehygieniste_curr,nbmedecins_curr,nbept_curr,nbemployes_curr,(fact_med_curr/multiplier)*12,(fact_dent_curr/multiplier)*12]},
                index=["PNL","Encaissements divers","Encaissements Caisse medecins","Paiements","Salaires","Nb de dentiste et hygieniste","Nb de medecins","Nb EPT (equivalent plein temps)","Nb d'employes","Facturation pole medical","Facturation pole dentiste"])
    
    temp_df2=temp_df2.fillna(0)
    return temp_df2
    

#summary_table_main_report(2023)

def get_activity_for_doctor(doctorname):
    percentagelist=db.engine.execute("""
    select 
de as DE,
a as A,
pourcentages as Pourcentages,
sum( isNull((a-(de-1000))*(pourcentages/100), 0) ) over (order by de) as "Revenu annuel brut",
sum( isNull((a-(de-1000))*(pourcentages/100), 0) ) over (order by de)*100/a as "Pourcentage net de charges",
a-sum( isNull((a-(de-1000))*(pourcentages/100), 0) ) over (order by de) as "Mon Revenu annuel"



from percentageactivity where docteur='{0}'
    """.format(doctorname))
    percentagedf=convert_list_to_dataframe(percentagelist)

    return percentagedf

def get_dr_details_right_table(doctorname=None):
    

    doctors= db.engine.execute("select doctorname from doctor where isActive=1").fetchall()
    items=[]
    for doc in doctors:
        #print(doc[0])
        fact_query=db.engine.execute("""select SUM(somme) as Summation from facturation where facturationNom = '{0}' and facturationType='Facturation médecins'""".format(doc[0])).fetchall()
        retro_query=db.engine.execute("""select SUM(somme) as Summation from facturation where facturationNom = '{0}' and facturationType='Versement honoraires médecins'""".format(doc[0])).fetchall()
        #print(search_query[0][0])
        df,fraissomme=get_frais_materiel_df(doc[0])
        act_df=get_activity_for_doctor(doc[0])
        rev_centre=act_df["Revenu annuel brut"].max()
        #print(rev_centre)
        #print(fraissomme.round(2))
        items.append([doc[0],fraissomme.round(2),fact_query[0][0],retro_query[0][0],rev_centre])
    df = pd.DataFrame(items,columns=["docteurNom","FraisAnnuel","CA Total","Retrocession","Revenu Centre"])
    return df

#get_dr_details_right_table()

    


@app.route('/reporting',methods=['GET','POST'])
@login_required
def reporting():

    #print(paymentdf)
    form=MainReportForm()
    ind_doctor_form=IndividualDoctorReportForm()
    choices=[]
    #choices.append(("---","---"))
    choices=choices+[(doctor.doctorname,doctor.doctorname)for doctor in db.engine.execute("select doctorname from doctor where isActive=1").fetchall()]   
    ind_doctor_form.doctorname.choices=choices


    if ind_doctor_form.validate_on_submit():
        current_date=datetime.datetime.now()
        current_num_timestamp="{0}{1}{2}_{3}{4}{5}".format(current_date.year,current_date.month,current_date.day,current_date.hour,current_date.minute,current_date.second)
        doctor_report_filename=r'{0}\reporting_temporary\RAPPORT_MEDECINS_{1}.pdf'.format(file_download_location,current_num_timestamp)
        dfs=[]

        varying_paymentslist=db.engine.execute("""select paimentnom AS PaiementNom,doctorpaiementsomme AS Somme,date AS Date FROM doctorpayment where doctorname='{0}' and YEAR(date)={1}""".format(ind_doctor_form.doctorname.data,ind_doctor_form.year.data))
        varying_paymentsdf=convert_list_to_dataframe(varying_paymentslist)
        varying_paymentsdf.set_index("PaiementNom",inplace=True)

        dfs.append((varying_paymentsdf.fillna(0).round(2),"Paeiment Medcins"))

        composite_df,fraisannuel_somme=get_frais_materiel_df(ind_doctor_form.doctorname.data)
        #print(composite_df)

        dfs.append((composite_df.fillna(0).round(2),"Charges Mensuel/Annuel"))

        leasinglist=db.engine.execute("""Select locationNom as LocationNom,
debut as Debut,
finPrevue as FinPrevue,
paiementinitial as "Paiement Initial",
paiement as PaiementMensuel,
paiement*12 as PaiementAnnuel
From leasing
where docteur='{0}'""".format(ind_doctor_form.doctorname.data))
        leasingdf=convert_list_to_dataframe(leasinglist)
        leasingdf.set_index("LocationNom",inplace=True)

        dfs.append((leasingdf.fillna(0).round(2),"Locations(Leasing)"))


        percentagedf=get_activity_for_doctor(ind_doctor_form.doctorname.data)
        #percentagedf.set_index("LocationNom",inplace=True)

        dfs.append((percentagedf.fillna(0).round(2),"Pourcentage D'activite"))        


        doctor_report(dfs,ind_doctor_form.doctorname.data,ind_doctor_form.year.data,doctor_report_filename)

        

        return send_file(doctor_report_filename)









    if form.validate_on_submit():
        dfs=[]
        #paymentslist=db.engine.execute("""SELECT paiementsNom,SUM(somme) AS somme FROM payment GROUP BY paiementsNom;""")
        paymentslist=db.engine.execute("""select paiementsType, SUM(somme) AS somme ,MONTH(date) AS "month" From payment where YEAR(date)= '{0}' and Valide='valide' group by YEAR(date),MONTH(date) , paiementsType """.format(form.year.data))

        paymentdf=convert_list_to_dataframe(paymentslist)
        paymentdf.set_index('paiementsType',inplace=True)

        paymentforgraphlist=db.engine.execute("""select paiementsType, SUM(somme) AS somme ,YEAR(date) as "year" From payment where YEAR(date)= '{0}'  and Valide='valide' group by YEAR(date) , paiementsType""".format(form.year.data))
        paymentforgraphdf=convert_list_to_dataframe(paymentforgraphlist)
        paymentforgraphdf.set_index('paiementsType',inplace=True)

        paymentforreportlist=db.engine.execute("""SELECT paiementsType AS PaiementType, 
	SUM (CASE WHEN Month(date)=1 THEN somme END) AS Janvier,
	SUM (CASE WHEN Month(date)=2 THEN somme END) AS Février,
	SUM (CASE WHEN Month(date)=3 THEN somme END) AS Mars,
	SUM (CASE WHEN Month(date)=4 THEN somme END) AS Avril,
	SUM (CASE WHEN Month(date)=5 THEN somme END) AS Mai,
	SUM (CASE WHEN Month(date)=6 THEN somme END) AS Juin,
	SUM (CASE WHEN Month(date)=7 THEN somme END) AS Juillet,
	SUM (CASE WHEN Month(date)=8 THEN somme END) AS Aout,
	SUM (CASE WHEN Month(date)=9 THEN somme END) AS Septembre,
	SUM (CASE WHEN Month(date)=10 THEN somme END) AS Octobre,
	SUM (CASE WHEN Month(date)=11 THEN somme END) AS Novembre,
	SUM (CASE WHEN Month(date)=12 THEN somme END) AS Décembre,
    SUM (somme) AS TOTAL

FROM payment
WHERE YEAR(date)= {0}
and Valide='valide'
GROUP BY paiementsType""".format(form.year.data))
        paymentforreportdf=convert_list_to_dataframe(paymentforreportlist)
        paymentforreportdf.set_index('PaiementType',inplace=True)        


        dfs.append((paymentforreportdf.fillna(0).round(2),paymentforgraphdf.fillna(0).round(2),"Paiements"))


        encaissementlist=db.engine.execute("""select encaissementNom,SUM(montant) AS somme,banque from encaissement where YEAR(encaissementDate)= '{0}' and Valide='valide' group by encaissementNom,banque""".format(form.year.data))
        encaissementdf=convert_list_to_dataframe(encaissementlist)
        encaissementdf.rename(columns = {'montant':'somme'}, inplace = True)
        encaissementdf.set_index('encaissementNom',inplace=True)
        #print(encaissementdf)

        encaissementgraphlist=db.engine.execute("""select SUM(montant) AS somme,banque from encaissement where YEAR(encaissementDate)='{0}' and Valide='valide' group by banque""".format(form.year.data))
        encaissementgraphdf=convert_list_to_dataframe(encaissementgraphlist)
        encaissementgraphdf.set_index('banque',inplace=True)

        rowstmp=len(encaissementdf.index)
        enc1df=encaissementdf.iloc[:int(rowstmp/2)]
        enc2df=encaissementdf.iloc[int(rowstmp/2):]
        
        #dfs.append((encaissementdf.fillna(0).round(2),encaissementgraphdf.fillna(0).round(2),"Encaissement"))
        
        dfs.append((enc1df.fillna(0).round(2),encaissementgraphdf.fillna(0).round(2),"Encaissement"))
        dfs.append((enc2df.fillna(0).round(2),encaissementgraphdf.fillna(0).round(2),"Encaissement"))

        '''facturationlist = db.engine.execute("""select facturationType, SUM(somme) AS somme ,MONTH(date) AS "month",YEAR(date) as "year" From facturation where YEAR(date)={0} group by YEAR(date),MONTH(date) , facturationType""".format(form.year.data))
        
        facturationdf=convert_list_to_dataframe(facturationlist)
        facturationdf.set_index('facturationType',inplace=True)'''
        facturationgraphlist=db.engine.execute("""select facturationType, SUM(somme) AS somme ,YEAR(date) as "year" From facturation where YEAR(date)  ={0} and Valide='valide' group by YEAR(date) , facturationType""".format(form.year.data))
        facturationgraphdf=convert_list_to_dataframe(facturationgraphlist)
        facturationgraphdf.set_index('facturationType',inplace=True)

        facturationforreportlist=db.engine.execute("""SELECT facturationType AS FacturationType, 
	SUM (CASE WHEN Month(date)=1 THEN somme END) AS Janvier,
	SUM (CASE WHEN Month(date)=2 THEN somme END) AS Février,
	SUM (CASE WHEN Month(date)=3 THEN somme END) AS Mars,
	SUM (CASE WHEN Month(date)=4 THEN somme END) AS Avril,
	SUM (CASE WHEN Month(date)=5 THEN somme END) AS Mai,
	SUM (CASE WHEN Month(date)=6 THEN somme END) AS Juin,
	SUM (CASE WHEN Month(date)=7 THEN somme END) AS Juillet,
	SUM (CASE WHEN Month(date)=8 THEN somme END) AS Aout,
	SUM (CASE WHEN Month(date)=9 THEN somme END) AS Septembre,
	SUM (CASE WHEN Month(date)=10 THEN somme END) AS Octobre,
	SUM (CASE WHEN Month(date)=11 THEN somme END) AS Novembre,
	SUM (CASE WHEN Month(date)=12 THEN somme END) AS Décembre,
    SUM (somme) AS TOTAL

FROM facturation
WHERE YEAR(date) ={0}
and Valide='valide'
GROUP BY facturationType""".format(form.year.data))
        facturationforreportdf=convert_list_to_dataframe(facturationforreportlist)
        facturationforreportdf.set_index('FacturationType',inplace=True) 

        dfs.append((facturationforreportdf.fillna(0).round(2),facturationgraphdf.fillna(0).round(2),"Facturation"))


        #print(encaissementdf.sum()["montant"])
        enctotal=encaissementdf.sum()["somme"]
        #print(paymentdf.sum()["somme"])
        paymenttotal=paymentdf.sum()["somme"]

        #print(enctotal-paymenttotal)
        pnl=enctotal-paymenttotal


        query_for_general_table = db.engine.execute("""select

doctorname as "docteurNom",
doctorspeciality as Specialite,
nblocaux as "No local",
surfacecentremedical as "m2",
surfacecommunes/surfacecentremedical*100 as "Surface occupee"

from doctor where isActive=1""")

        maindf=convert_list_to_dataframe(query_for_general_table)
        rightdf=get_dr_details_right_table()
        maindf=pd.merge(maindf,rightdf,on="docteurNom")

        maindf.set_index('docteurNom',inplace=True)
        
        current_date=datetime.datetime.now()

        current_num_timestamp="{0}{1}{2}_{3}{4}{5}".format(current_date.year,current_date.month,current_date.day,current_date.hour,current_date.minute,current_date.second)
        report_filename=r'{0}\reporting_temporary\RAPPORT_{1}.pdf'.format(file_download_location,current_num_timestamp)
        


        #RESUME
        resumedf=summary_table_main_report(form.year.data)

        dataframe_to_pdf(dfs,pnl.round(2),form.year.data,report_filename,enctotal.round(2),paymenttotal.round(2),maindf,resumedf)        

        return send_file(report_filename)






    if "reports" in current_user.access  or current_user.access=="all":
        
        return render_template("reporting.html",forms=[form,ind_doctor_form],formtitles=["Rapport Général (P&L)","Rapport du Médecin"])
    else:
        return render_template("NOT_AUTHORIZED.html")
    

@app.route('/setup',methods=['GET','POST'])
@login_required
def setup():
    addgeneraltype=AddNewType()
    form1 =Addpaymenttype()
    paymenttypes=db.engine.execute("select * from paymenttype")
    paymenttypesitems=paymenttypes.fetchall()
    headerspaymenttypes=paymenttypes.keys()

    qry = Setting.query.filter().first()
    staticitemsqry = Constants.query.filter().order_by(Constants.constantsid.desc()).first()
    #doc = qry.first()
    
    
    settingsForm = SettingsForm(obj=qry)

    staticitemsForm=StaticItemsForm(obj=staticitemsqry)

    if addgeneraltype.validate_on_submit():
        
        if addgeneraltype.category.data == "Paiement":
            db.engine.execute("""Insert into paymenttype VALUES ('{0}')""".format(addgeneraltype.typename.data))
        elif addgeneraltype.category.data == "Salaire":
            db.engine.execute("""Insert into salairetype VALUES ('{0}')""".format(addgeneraltype.typename.data))             
        elif addgeneraltype.category.data == "Facturation":
            db.engine.execute("""insert into facturationtype VALUES ('{0}',0)""".format(addgeneraltype.typename.data))
        elif addgeneraltype.category.data == "Dentisterie":
            db.engine.execute("""insert into dentisterietype VALUES ('{0}')""".format(addgeneraltype.typename.data))   
        elif addgeneraltype.category.data == "Frais Materiel":
            db.engine.execute("""insert into fraismaterieltype VALUES ('{0}')""".format(addgeneraltype.typename.data)) 
        elif addgeneraltype.category.data == "Retrocession":
            db.engine.execute("""insert into retrocessiontype VALUES ('{0}',0)""".format(addgeneraltype.typename.data))                                


        return redirect(url_for('setup'))
    if staticitemsForm.validate_on_submit():
        try:
            new_static =Constants(nbdentistehygieniste=staticitemsForm.nbdentistehygieniste.data,nbmedecins=staticitemsForm.nbmedecins.data,nbept=staticitemsForm.nbept.data,nbemployes=staticitemsForm.nbemployes.data,year=datetime.datetime.now().year)
            db.session.add(new_static)
            db.session.commit()            

        

        except:
            pass
        

    if settingsForm.validate_on_submit():
        try:
            qry.moisavant=settingsForm.moisavant.data
            qry.moislimit=settingsForm.moislimit.data
            db.session.commit()
        except:
            new_setting=Setting(moisavant=settingsForm.moisavant.data,moislimit=settingsForm.moislimit.data)
            db.session.add(new_setting)
            db.session.commit()
    
    if form1.validate_on_submit():
        new_payment_type =Paymenttype(paiementsType=form1.paymenttype.data)
        db.session.add(new_payment_type)
        db.session.commit()
        return redirect(url_for('setup'))

    form2 =AddFacturationtype()
    facturationtypes=db.engine.execute("select facturationtypeid,facturationType from facturationtype")
    facturationtypesitems=facturationtypes.fetchall()
    headersfacturationtypes=facturationtypes.keys()
    
    if form2.validate_on_submit():
        new_facturation_type =Facturationtype(facturationType=form2.facturationtype.data,EstRetrocession=0)
        db.session.add(new_facturation_type)
        db.session.commit()
        return redirect(url_for('setup'))

        
    

    form3 = AddDentistrytype()
    dentisterietypes=db.engine.execute("select * from Dentisterietype")
    dentisterietypesitems=dentisterietypes.fetchall()
    headersdentisterietypes=dentisterietypes.keys()

    if form3.validate_on_submit():
        new_dentisterie_type=Dentisterietype(dentisterietype=form3.dentisterieType.data)
        db.session.add(new_dentisterie_type)
        db.session.commit()
        return redirect(url_for('setup'))

    form4 = AddFraismaterieltype()
    fraismaterieltypes=db.engine.execute("select * from Fraismaterieltype")
    fraismaterielitems=fraismaterieltypes.fetchall()
    headersfraismaterieltypes=fraismaterieltypes.keys()

    if form4.validate_on_submit():
        
        new_fraismateriel_type=Fraismaterieltype(fraismaterieltype=form4.fraismaterieltype.data)
        db.session.add(new_fraismateriel_type)
        db.session.commit()
        return redirect(url_for('setup'))
    
    formretro=AddRetrocessiontype()
    retrocessiontypes=db.engine.execute("select retrocessiontypeid as ID, retrocessiontype as Type, pnl_included as 'Inclure dans PnL' from retrocessiontype")
    retrocessiontypesitems=retrocessiontypes.fetchall()
    headersretrocessiontypes=retrocessiontypes.keys()
    
    if formretro.validate_on_submit():
        new_retrocession_type =Retrocessiontype(retrocessionType=formretro.retrocessiontype.data,pnl_included=formretro.pnl_included.data)
        db.session.add(new_retrocession_type)
        db.session.commit()
        return redirect(url_for('setup'))


    if "setup" in current_user.access  or current_user.access=="all":        
        return render_template('app.html',username=(current_user.username).title(),content="installation",addgeneraltype=addgeneraltype,settingsForms=[settingsForm,staticitemsForm],titlescards=["Mois Avant","Paramètres Constants"],forms=[form1,form2,formretro,form3,form4],table=[paymenttypesitems,facturationtypesitems,retrocessiontypesitems,dentisterietypesitems,fraismaterielitems],headers=[headerspaymenttypes,headersfacturationtypes,headersretrocessiontypes,headersdentisterietypes,headersfraismaterieltypes],dbtable=["paymenttype","facturationtype","retrocessiontype","dentisterietype","fraismaterieltype"],dbtableid=["paiementstypeid","facturationtypeid","retrocessiontypeid","dentisterietypeid","fraismaterieltypeid"],titles=["Type de Paiement","Type de Facturation","Type de Retrocession","Type de Dentisterie","Type de Frais Materiel"],user_role=current_user.role)
    else:
        return render_template('NOT_AUTHORIZED.html')

def get_day_index(start_date, end_date):
    start = datetime.datetime.strptime(start_date, "%Y-%m-%d")
    end = datetime.datetime.strptime(end_date, "%Y-%m-%d")

    day_index = []
    current_date = start

    while current_date <= end:
        day_index.append(current_date.timetuple().tm_yday)
        current_date += timedelta(days=1)

    return day_index

# Example usage
#start_date = "2020-06-01"
#end_date = "2023-06-01"
#day_index = get_day_index(start_date, end_date)

#print(f"The day index between {start_date} and {end_date} is: {day_index}")


def get_years_in_range(start_date, end_date):
    start = datetime.datetime.strptime(start_date, "%Y-%m-%d")
    end = datetime.datetime.strptime(end_date, "%Y-%m-%d")

    years = []
    current_date = start

    while current_date <= end:
        year = current_date.year
        if year not in years:
            years.append(year)
        current_date += timedelta(days=1)

    return years

# Example usage
#start_date = "2020-06-01"
#end_date = "2023-06-01"
#years = get_years_in_range(start_date, end_date)

#print(f"The years in the range {start_date} to {end_date} are: {years}")

def split_date_range_on_new_year(start_date, end_date):
    start = datetime.datetime.strptime(start_date, "%Y-%m-%d")
    end = datetime.datetime.strptime(end_date, "%Y-%m-%d")

    sub_ranges = []
    current_start = start

    while current_start.year < end.year:
        current_end = datetime.datetime(current_start.year, 12, 31)
        sub_ranges.append((current_start.strftime("%Y-%m-%d"), current_end.strftime("%Y-%m-%d")))

        current_start = datetime.datetime(current_start.year + 1, 1, 1)

    sub_ranges.append((current_start.strftime("%Y-%m-%d"), end.strftime("%Y-%m-%d")))

    return sub_ranges




def getpnlforyear(startdate,enddate):
    years=[]
    
    sub_ranges = split_date_range_on_new_year(startdate, enddate)

    for strt, endd in sub_ranges:
        #print(strt,endd)
        year = (datetime.datetime.strptime(strt,'%Y-%m-%d').year)
        pnl_year={}
        dayindexes = get_day_index(strt,endd)
        for day in range(dayindexes[0],dayindexes[-1]+1):
            encls,enctotal = get_ls_for_dashboard("""select banque, SUM(montant) AS somme from encaissement where Valide='valide' and YEAR(encaissementDate)={0} and DATEPART(DAYOFYEAR,encaissementDate)={1}  group by banque""".format(year,day))
            paymentls,paysum = get_ls_for_dashboard("""Select paiementstype as PaiementType, SUM(somme)  as somme from payment where Valide='valide' and YEAR(date)={0} and DATEPART(DAYOFYEAR,date)={1} group by paiementsType """.format(year,day))
            retrols,retrosum = get_ls_for_dashboard("""select retrocession.retrocessiontype as RetrocessionType, Sum(somme) as somme from retrocession  inner join retrocessiontype on retrocession.retrocessionType=retrocessiontype.retrocessionType where Valide='valide'  and YEAR(date)={0} and DATEPART(DAYOFYEAR,date) = {1} and retrocessiontype.pnl_included=1  group by retrocession.retrocessionType""".format(year,day))
            if enctotal<0.001:
                enctotal=0.0
            if paysum<0.001:
                paysum=0.0
            if retrosum<0.001:
                retrosum=0.0
            #print(enctotal,paysum,retrosum)
            day_pnl = enctotal-(paysum+retrosum)

            #print(month_pnl)
            pnl_year[day]=day_pnl
        years.append({year:pnl_year})
    return(years)

def get_pnl_values(year):
    returned_pnls=[]
    for month in range(1,13):
        encls,enctotal = get_ls_for_dashboard("""select banque, SUM(montant) AS somme from encaissement where Valide='valide' and YEAR(encaissementDate)={0} and MONTH(encaissementDate)={1}  group by banque""".format(year,month))
        paymentls,paysum = get_ls_for_dashboard("""Select paiementstype as PaiementType, SUM(somme)  as somme from payment where Valide='valide' and YEAR(date)={0} and MONTH(date)={1} group by paiementsType """.format(year,month))
        retrols,retrosum = get_ls_for_dashboard("""select retrocession.retrocessiontype as RetrocessionType, Sum(somme) as somme from retrocession  inner join retrocessiontype on retrocession.retrocessionType=retrocessiontype.retrocessionType where Valide='valide'  and YEAR(date)={0} and MONTH(date)={1}  and retrocessiontype.pnl_included=1  group by retrocession.retrocessionType""".format(year,month))
        if enctotal<0.001:
            enctotal=0.0
        if paysum<0.001:
            paysum=0.0
        if retrosum<0.001:
            retrosum=0.0
        current_pnl = enctotal-(paysum+retrosum)
        returned_pnls.append(round(current_pnl,2))
    
    return returned_pnls
        #print(enctotal,paysum,retrosum)
        
    
#get_pnl_values(2023)

def getpaymentasjson(startdate,enddate):
    pass


@app.route('/getpaymentdata')
#@login_required
def getpaymentdata():
    startdate=request.args["startdate"]
    enddate=request.args["enddate"]
    return jsonify({"Status":"OK"})



@app.route('/getpnlhistory')
@login_required
def getpnlhistory():
    year=request.args["year"]
    returned_response = {"1":get_pnl_values(year),"2":get_pnl_values(int(year)-1)}
    #print(returned_response)
    return jsonify(returned_response)







@app.route('/test4dashboard/')
@login_required
def test4dashboard():
    #paymenttype_dec= urllib.parse.unquote(paymenttype.replace("*","%"))
    #paymentnames = Payment.query.filter_by(paiementsType=paymenttype_dec).all()
    #doctornames = Doctor.query.all()
    print(request.args)
    Arry=[]
    paymentforreportlist=db.engine.execute("""SELECT paiementsType AS PaiementType, 
SUM (CASE WHEN Month(date)=1 THEN somme END) AS Janvier,
SUM (CASE WHEN Month(date)=2 THEN somme END) AS Février,
SUM (CASE WHEN Month(date)=3 THEN somme END) AS Mars,
SUM (CASE WHEN Month(date)=4 THEN somme END) AS Avril,
SUM (CASE WHEN Month(date)=5 THEN somme END) AS Mai,
SUM (CASE WHEN Month(date)=6 THEN somme END) AS Juin,
SUM (CASE WHEN Month(date)=7 THEN somme END) AS Juillet,
SUM (CASE WHEN Month(date)=8 THEN somme END) AS Aout,
SUM (CASE WHEN Month(date)=9 THEN somme END) AS Septembre,
SUM (CASE WHEN Month(date)=10 THEN somme END) AS Octobre,
SUM (CASE WHEN Month(date)=11 THEN somme END) AS Novembre,
SUM (CASE WHEN Month(date)=12 THEN somme END) AS Décembre,
SUM (somme) AS TOTAL

FROM payment
WHERE YEAR(date)= {0}
and Valide='valide'
GROUP BY paiementsType""".format(2022))
    paymentforreportjson=convert_list_to_json(paymentforreportlist)
    print(paymentforreportjson)
    #paymentforreportdf.set_index('PaiementType',inplace=True)

    try:
        #title='testdata'+request.args["year"]
        returned_static_data=[{"id":1,"name":"johnnyabouhaidar","email":"mail@mail.com"},
                              {"id":2,"name":"johnnyabouhaidar2","email":"mail2@mail.com"},
                              {"id":3,"name":"johnnyabouhaidar3","email":"mail3@mail.com"}]
    except:
        return jsonify({"Error":"Please specify a year"})

    return jsonify(paymentforreportjson)

@app.route('/testingpage')
@login_required
def testingpage():
    return render_template('testingpage.html')




@app.route('/logout',methods=['GET','POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))


if __name__=='__main__':
    app.run(debug=True ,host="0.0.0.0")