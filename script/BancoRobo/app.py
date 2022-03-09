from crypt import methods
from dbm import dumb
from email import message
import datetime
import json
from operator import truediv
import random
from flask import Flask, flash, redirect, url_for, request, session, render_template, jsonify
from flask_bootstrap import Bootstrap
from flask_nav import Nav
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base

# https://fontawesome.com/icons
from flask_fontawesome import FontAwesome

# Salvando senhas de maneira apropriada no banco de dados.
# https://werkzeug.palletsprojects.com/en/1.0.x/utils/#module-werkzeug.security
# Para gerar a senha a ser salva no DB, faça:
#senha = generate_password_hash('1234')
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)
# app.secret_key = "SECRET_KEY"

# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Khomp2021!@localhost:3306/r2pji2'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy(app)

# Base = automap_base()
# Base.prepare(db.engine, reflect=True)

# Usuario = Base.classes.Usuario
# Robo = Base.classes.Robo
# SensorDistancia = Base.classes.SensorDistancia
# SensorFumaca = Base.classes.SensorFumaca
# SensorTemperatura = Base.classes.SensorTemperatura
# SensorGas = Base.classes.SensorGas
# SensorLuz = Base.classes.SensorLuz

# boostrap = Bootstrap(app)
# fa = FontAwesome(app)

# nav = Nav()
# nav.init_app(app)

arrUsers = []
admin = {
    'login': 'admin',
    'senha': '123',
    'nome': 'Arthur',
    'sobrenome': 'Anastopulos',
    'email': 'contact@admin.com'
}
arrUsers.append(admin)

################ ScientistApp ################
@app.route('/robo/<id_robo>/login', methods=['GET', 'POST'])
def autenticar(id_robo):
    request_data = request.get_json()
    statusMsg = {
        "status": '400',
        "message": 'Usuario não existe.'
    }

    for user in arrUsers:
        if user['login'] == request_data['login']:
            if user['senha'] == request_data['senha']:
                statusMsg['status'] = '200'
                statusMsg['message'] = 'Logado com Sucesso'
                return json.dumps(statusMsg)
            else:
                statusMsg['message'] = 'Senha Incorreta'    

    return json.dumps(statusMsg)

@app.route('/robo/<id_robo>/register', methods=['GET', 'POST'])
def registrar(id_robo):
    request_data = request.get_json()
    print(request_data)
    statusMsg = {
        "status": '400',
        "message": 'Já existe um usuário com este email.'
    }

    if len(arrUsers) == 0:
        print('if1')
        arrUsers.append(request_data)
        statusMsg['status'] = '200'
        statusMsg['message'] = 'Criado com Sucesso'
        return json.dumps(statusMsg)

    if len(arrUsers) > 0:
        print('if2')
        for user in arrUsers:
            if user['email'] == request_data['email']:
                print('if3')
                return json.dumps(statusMsg)

            else:
                print('if4')    
                arrUsers.append(request_data)
                statusMsg['status'] = '200'
                statusMsg['message'] = 'Criado com Sucesso'
                return json.dumps(statusMsg)

    return json.dumps(statusMsg)


@app.route('/robo/<id_robo>/sensorDistancia', methods=['GET'])
def sensor_distancia(id_robo):
    fakeSensorData = []

    for x in range(10):
        rand = random.randint(15, 58)
        date = "dia " + "0" + str(x + 1)
        sensorData = {
            "Data e Hora": date, 
            "Informacao do Sensor": rand
        }
        fakeSensorData.append(sensorData)

    return json.dumps(fakeSensorData)

@app.route('/robo/<id_robo>/sensorFumaca', methods=['GET'])
def sensor_fumaca(id_robo):
    fakeSensorData = []

    for x in range(10):
        rand = random.randint(15, 58)
        date = "dia " + "0" + str(x + 1)
        sensorData = {
            "Data e Hora": date, 
            "Informacao do Sensor": rand
        }
        fakeSensorData.append(sensorData)

    return json.dumps(fakeSensorData)

@app.route('/robo/<id_robo>/sensorGas', methods=['GET'])
def sensor_gas(id_robo):
    fakeSensorData = []

    for x in range(10):
        rand = random.randint(15, 58)
        date = "dia " + "0" + str(x + 1)
        sensorData = {
            "Data e Hora": date, 
            "Informacao do Sensor": rand
        }
        fakeSensorData.append(sensorData)

    return json.dumps(fakeSensorData)

@app.route('/robo/<id_robo>/sensorLuz', methods=['GET'])
def sensor_luz(id_robo):
    fakeSensorData = []

    for x in range(10):
        rand = random.randint(15, 58)
        date = "dia " + "0" + str(x + 1)
        sensorData = {
            "Data e Hora": date, 
            "Informacao do Sensor": rand
        }
        fakeSensorData.append(sensorData)


    return json.dumps(fakeSensorData)

@app.route('/robo/<id_robo>/sensorTemperatura', methods=['GET'])
def sensor_temperatura(id_robo):
    fakeSensorData = []

    for x in range(10):
        rand = random.randint(15, 58)
        date = "dia " + "0" + str(x + 1)
        sensorData = {
            "Data e Hora": date, 
            "Informacao do Sensor": rand
        }
        fakeSensorData.append(sensorData)

    return json.dumps(fakeSensorData)

@app.route('/robos', methods=['GET'])    
def get_robos():
    robos = []
    for x in range(3):
        id = x+1
        ip = "127.0.0." + str(x)

        data = {
            "Id": id,
            "Ip": ip
        }
        robos.append(data)

    return json.dumps(robos)


################ CommandApp ################
'''Pegando IP do Robo - FUNCIONANDO'''
@app.route('/robo/<id_robo>/ip', methods=['GET'])
def send_ip_robo(id_robo):
    robo = db.session.query(Robo.ipRobo).filter(Robo.idRobo == 1).first()
    return robo.ipRobo

################ Robot ################
@app.route('/robo/<id_robo>/sensores', methods=['GET', 'POST'])
def recv_id_ip_robo(id_robo):
    # novo_robo = Robo()
    # novo_robo.idRobo = 3
    # novo_robo.ipRobo = '127.0.0.3'
    #
    # db.session.add(novo_robo)
    # db.session.commit()

    return f'Post {id_robo}'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
