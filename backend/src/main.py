# coding=utf-8

from flask import Flask, jsonify, request
from flask_cors import CORS

from .entities.entity import Session, engine, Base
from .entities.exam import Exam, ExamSchema

from .entities.client import Client, ClientSchema
from .entities.clientEmployee import ClientEmployee, ClientEmployeeSchema
from .entities.consultant import Consultant, ConsultantSchema
from .entities.manager import Manager, ManagerSchema
from .entities.project import Project, ProjectSchema
from .entities.projectManager import ProjectManager, ProjectManagerSchema

# creating the Flask application
app = Flask(__name__)
CORS(app)

# if needed, generate database schema
Base.metadata.create_all(engine)

# CLIENT
@app.route('/clients')
def get_clients():
    # fetching from the database
    session = Session()
    client_objects = session.query(Client).all()

    # transforming into JSON-serializable objects
    schema = ClientSchema(many=True)
    clients = schema.dump(client_objects)

    # serializing as JSON
    session.close()
    return jsonify(clients.data)

@app.route('/clients/<id>')
def get_client(id):
    # fetching from the database
    session = Session()
    client_object = session.query(Client).get(id)

    # transforming into JSON-serializable objects
    schema = ClientSchema()
    client = schema.dump(client_object)

    # serializing as JSON
    session.close()
    return jsonify(client)

@app.route('/clients', methods=['POST'])
def add_client():
    # mount obj object
    posted_client = ClientSchema(only=('name', 'address', 'cp', 'city'))\
        .load(request.get_json())

    client = Client(**posted_client.data, created_by="HTTP post request")

    # persist obj
    session = Session()
    session.add(client)
    session.commit()

    # return created obj
    new_client = ClientSchema().dump(client).data
    session.close()
    return jsonify(new_client), 201

@app.route('/clients/<id>', methods=['POST'])
def update_client(id):
    # fetching from the database
    session = Session()
    client_object = session.query(Client).get(id)

    client_object.name = request.get_json().get('name'),
    client_object.address = request.get_json().get('address'),
    client_object.cp = request.get_json().get('cp'),
    client_object.city = request.get_json().get('city'),

    session.commit()

    # return created obj
    new_client = ClientSchema().dump(client_object).data
    session.close()
    return jsonify(new_client), 201

# CLIENT EMPLOYEE
@app.route('/clientEmployees')
def get_clientEmployees():
    # fetching from the database
    session = Session()
    clientEmployee_objects = session.query(ClientEmployee).all()

    # transforming into JSON-serializable objects
    schema = ClientEmployeeSchema(many=True)
    clientEmployees = schema.dump(clientEmployee_objects)

    # serializing as JSON
    session.close()
    return jsonify(clientEmployees.data)

@app.route('/clientEmployees/<client_id>')
def get_clientEmployeesForClient(client_id):
    # fetching from the database
    session = Session()
    clientEmployee_objects = session.query(ClientEmployee).filter_by(client_id=client_id).all()

    # transforming into JSON-serializable objects
    schema = ClientEmployeeSchema(many=True)
    clientEmployees = schema.dump(clientEmployee_objects)

    # serializing as JSON
    session.close()
    return jsonify(clientEmployees.data)

@app.route('/clientEmployee/<id>')
def get_clientEmployee(id):
    # fetching from the database
    session = Session()
    clientEmployee_object = session.query(ClientEmployee).get(id)

    # transforming into JSON-serializable objects
    schema = ClientEmployeeSchema()
    clientEmployee = schema.dump(clientEmployee_object)

    # serializing as JSON
    session.close()
    return jsonify(clientEmployee)

@app.route('/clientEmployees', methods=['POST'])
def add_clientEmployee():
    # mount obj object
    posted_clientEmployee = ClientEmployeeSchema(only=('firstName', 'lastName', 'email', 'tel', 'title', 'client_id'))\
        .load(request.get_json())

    clientEmployee = ClientEmployee(**posted_clientEmployee.data, created_by="HTTP post request")

    # persist obj
    session = Session()
    session.add(clientEmployee)
    session.commit()

    # return created obj
    new_clientEmployee = ClientEmployeeSchema().dump(clientEmployee).data
    session.close()
    return jsonify(new_clientEmployee), 201

@app.route('/clientEmployees/<id>', methods=['POST'])
def update_clientEmployee(id):
    # fetching from the database
    session = Session()
    clientEmployee_object = session.query(ClientEmployee).get(id)

    clientEmployee_object.firstName = request.get_json().get('firstName'),
    clientEmployee_object.lastName = request.get_json().get('lastName'),
    clientEmployee_object.email = request.get_json().get('email'),
    clientEmployee_object.tel = request.get_json().get('tel'),
    clientEmployee_object.title = request.get_json().get('title'),

    session.commit()

    # return created obj
    new_clientEmployee = ClientSchema().dump(clientEmployee_object).data
    session.close()
    return jsonify(new_clientEmployee), 201

@app.route('/clientEmployee/delete/<id>', methods=['DELETE'])
def delete_clientEmployee(id):
    # fetching from the database
    session = Session()
    clientEmployee_object = session.query(ClientEmployee).get(id)

    session.delete(clientEmployee_object)
    session.commit()
    session.close()
    return '201'

# CONSULTANT
@app.route('/consultants')
def get_consultants():
    # fetching from the database
    session = Session()
    consultant_objects = session.query(Consultant).all()

    # transforming into JSON-serializable objects
    schema = ConsultantSchema(many=True)
    consultants = schema.dump(consultant_objects)

    # serializing as JSON
    session.close()
    return jsonify(consultants.data)

@app.route('/consultants/<id>')
def consultant(id):
    # fetching from the database
    session = Session()
    consultant_object = session.query(Consultant).get(id)

    # transforming into JSON-serializable objects
    schema = ConsultantSchema()
    consultant = schema.dump(consultant_object)

    # serializing as JSON
    session.close()
    return jsonify(consultant)

@app.route('/consultants', methods=['POST'])
def add_consultant():
    # mount obj object
    posted_consultant = ConsultantSchema(only=('firstName', 'lastName', 'email', 'tel', 'manager_id'))\
        .load(request.get_json())

    consultant = Consultant(**posted_consultant.data, created_by="HTTP post request")

    # persist obj
    session = Session()
    session.add(consultant)
    session.commit()

    # return created obj
    new_consultant = ConsultantSchema().dump(consultant).data
    session.close()
    return jsonify(new_consultant), 201

# MANAGER
@app.route('/managers')
def get_managers():
    # fetching from the database
    session = Session()
    manager_objects = session.query(Manager).all()

    # transforming into JSON-serializable objects
    schema = ManagerSchema(many=True)
    managers = schema.dump(manager_objects)

    # serializing as JSON
    session.close()
    return jsonify(managers.data)

@app.route('/managers', methods=['POST'])
def add_manager():
    # mount obj object
    posted_manager = ManagerSchema(only=('firstName', 'lastName', 'email', 'tel'))\
        .load(request.get_json())

    manager = Manager(**posted_manager.data, created_by="HTTP post request")

    # persist obj
    session = Session()
    session.add(manager)
    session.commit()

    # return created obj
    new_manager = ManagerSchema().dump(manager).data
    session.close()
    return jsonify(new_manager), 201

# MEETING
@app.route('/meetings')
def get_meetings():
    # fetching from the database
    session = Session()
    meeting_objects = session.query(Meeting).all()

    # transforming into JSON-serializable objects
    schema = MeetingSchema(many=True)
    meetings = schema.dump(meeting_objects)

    # serializing as JSON
    session.close()
    return jsonify(meetings.data)

@app.route('/meetings', methods=['POST'])
def add_meeting():
    # mount obj object
    posted_meeting = MeetingSchema(only=('project_id', 'date', 'subject', 'project_bilan1', 'project_bilan2', 'adentis_bilan1', 'adentis_bilan2', 'adentis_bilan3' ,'manager_signature', 'consultant_signature', 'client_signature'))\
        .load(request.get_json())

    meeting = Meeting(**posted_meeting.data, created_by="HTTP post request")

    # persist obj
    session = Session()
    session.add(meeting)
    session.commit()

    # return created obj
    new_meeting = MeetingSchema().dump(meeting).data
    session.close()
    return jsonify(new_meeting), 201

# PROJECT
@app.route('/projects')
def get_project():
    # fetching from the database
    session = Session()
    project_objects = session.query(Project).all()

    # transforming into JSON-serializable objects
    schema = ProjectSchema(many=True)
    project = schema.dump(project_objects)

    # serializing as JSON
    session.close()
    return jsonify(project.data)

@app.route('/projects', methods=['POST'])
def add_project():
    # mount obj object
    posted_project = ProjectSchema(only=('manager_id', 'consultant_id', 'client_id', 'client_address_id', 'start_date', 'end_date'))\
        .load(request.get_json())

    project = Project(**posted_project.data, created_by="HTTP post request")

    # persist obj
    session = Session()
    session.add(project)
    session.commit()

    # return created obj
    new_project =ProjectSchema().dump(project).data
    session.close()
    return jsonify(new_project), 201

# PROJECT MANAGER
@app.route('/projectManagers')
def get_projectManagers():
    # fetching from the database
    session = Session()
    projectManager_objects = session.query(ProjectManager).all()

    # transforming into JSON-serializable objects
    schema = ProjectManagerSchema(many=True)
    projectManagers = schema.dump(projectManager_objects)

    # serializing as JSON
    session.close()
    return jsonify(projectManagers.data)

@app.route('/projectManagers', methods=['POST'])
def add_projectManager():
    # mount obj object
    posted_projectManager = ProjectManagerSchema(only=('project_id', 'clientEmployee_id'))\
        .load(request.get_json())

    projectManager = ProjectManager(**posted_projectManager.data, created_by="HTTP post request")

    # persist obj
    session = Session()
    session.add(projectManager)
    session.commit()

    # return created obj
    new_projectManager =ProjectManagerSchema().dump(projectManager).data
    session.close()
    return jsonify(new_projectManager), 201

@app.route('/exams')
def get_exams():
    # fetching from the database
    session = Session()
    exam_objects = session.query(Exam).all()

    # transforming into JSON-serializable objects
    schema = ExamSchema(many=True)
    exams = schema.dump(exam_objects)

    # serializing as JSON
    session.close()
    return jsonify(exams.data)


@app.route('/exams', methods=['POST'])
def add_exam():
    # mount exam object
    posted_exam = ExamSchema(only=('title', 'description'))\
        .load(request.get_json())

    exam = Exam(**posted_exam.data, created_by="HTTP post request")

    # persist exam
    session = Session()
    session.add(exam)
    session.commit()

    # return created exam
    new_exam = ExamSchema().dump(exam).data
    session.close()
    return jsonify(new_exam), 201