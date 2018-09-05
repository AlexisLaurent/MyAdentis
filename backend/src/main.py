# coding=utf-8

from flask import Flask, jsonify, request
from flask_cors import CORS

from .entities.entity import Session, engine, Base

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

@app.route('/clients/<id>', methods=['PUT'])
def update_client(id):
    # fetching from the database
    session = Session()
    client_object = session.query(Client).get(id)

    client_object.name = request.get_json().get('name')
    client_object.address = request.get_json().get('address')
    client_object.cp = request.get_json().get('cp')
    client_object.city = request.get_json().get('city')

    session.commit()

    # return created obj
    new_client = ClientSchema().dump(client_object).data
    session.close()
    return jsonify(new_client), 201

@app.route('/clients/<id>', methods=['DELETE'])
def delete_client(id):
    # fetching from the database
    session = Session()
    client_object = session.query(Client).get(id)

    session.delete(client_object)
    session.commit()
    session.close()
    return '201'

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

@app.route('/clientEmployees/<id>', methods=['PUT'])
def update_clientEmployee(id):
    # fetching from the database
    session = Session()
    clientEmployee_object = session.query(ClientEmployee).get(id)

    clientEmployee_object.firstName = request.get_json().get('firstName')
    clientEmployee_object.lastName = request.get_json().get('lastName')
    clientEmployee_object.email = request.get_json().get('email')
    clientEmployee_object.tel = request.get_json().get('tel')
    clientEmployee_object.title = request.get_json().get('title')

    session.commit()

    # return created obj
    new_clientEmployee = ClientSchema().dump(clientEmployee_object).data
    session.close()
    return jsonify(new_clientEmployee), 201

@app.route('/clientEmployees/<id>', methods=['DELETE'])
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

@app.route('/consultants/<manager_id>')
def get_consultantsForClient(manager_id):
    # fetching from the database
    session = Session()
    consultant_objects = session.query(Consultant).filter_by(manager_id=manager_id).all()

    # transforming into JSON-serializable objects
    schema = ConsultantSchema(many=True)
    consultants = schema.dump(consultant_objects)

    # serializing as JSON
    session.close()
    return jsonify(consultants.data)

@app.route('/consultant/<id>')
def get_consultant(id):
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

@app.route('/consultants/<id>', methods=['PUT'])
def update_consultant(id):
    # fetching from the database
    session = Session()
    consultant_object = session.query(Consultant).get(id)

    consultant_object.firstName = request.get_json().get('firstName')
    consultant_object.lastName = request.get_json().get('lastName')
    consultant_object.email = request.get_json().get('email')
    consultant_object.tel = request.get_json().get('tel')
    consultant_object.title = request.get_json().get('title')

    session.commit()

    # return created obj
    new_consultant = ConsultantSchema().dump(consultant_object).data
    session.close()
    return jsonify(new_consultant), 201

@app.route('/consultants/<id>', methods=['DELETE'])
def delete_consultant(id):
    # fetching from the database
    session = Session()
    consultant_object = session.query(Consultant).get(id)

    session.delete(consultant_object)
    session.commit()
    session.close()
    return '201'

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

@app.route('/managers/<id>')
def get_manager(id):
    # fetching from the database
    session = Session()
    manager_object = session.query(Manager).get(id)

    # transforming into JSON-serializable objects
    schema = ManagerSchema()
    manager = schema.dump(manager_object)

    # serializing as JSON
    session.close()
    return jsonify(manager)

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

@app.route('/managers/<id>', methods=['PUT'])
def update_manager(id):
    # fetching from the database
    session = Session()
    manager_object = session.query(Manager).get(id)

    manager_object.name = request.get_json().get('name')
    manager_object.address = request.get_json().get('address')
    manager_object.cp = request.get_json().get('cp')
    manager_object.city = request.get_json().get('city')

    session.commit()

    # return created obj
    new_manager = ManagerSchema().dump(manager_object).data
    session.close()
    return jsonify(new_manager), 201

@app.route('/managers/<id>', methods=['DELETE'])
def delete_manager(id):
    # fetching from the database
    session = Session()
    manager_object = session.query(Manager).get(id)

    session.delete(manager_object)
    session.commit()
    session.close()
    return '201'

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

@app.route('/meetings/<id>')
def get_meeting(id):
    # fetching from the database
    session = Session()
    meeting_object = session.query(Meeting).get(id)

    # transforming into JSON-serializable objects
    schema = MeetingSchema()
    meeting = schema.dump(meeting_object)

    # serializing as JSON
    session.close()
    return jsonify(meeting)

@app.route('/meetings', methods=['POST'])
def add_meeting():
    # mount obj object
    posted_meeting = MeetingSchema(only=('project_id', 'date', 'subject',
     'project_bilan1', 'project_bilan2', 'adentis_bilan1', 'adentis_bilan2', 'adentis_bilan3' ,
     'manager_signature', 'consultant_signature', 'client_signature'))\
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

@app.route('/meetings/<id>', methods=['PUT'])
def update_meeting(id):
    # fetching from the database
    session = Session()
    meeting_object = session.query(Meeting).get(id)

    meeting_object.project_id = request.get_json().get('project_id')
    meeting_object.date = request.get_json().get('date')
    meeting_object.subject = request.get_json().get('subject')
    meeting_object.project_bilan1 = request.get_json().get('project_bilan1')
    meeting_object.project_bilan2 = request.get_json().get('project_bilan2')
    meeting_object.adentis_bilan1 = request.get_json().get('adentis_bilan1')
    meeting_object.adentis_bilan2 = request.get_json().get('adentis_bilan2')
    meeting_object.adentis_bilan3 = request.get_json().get('adentis_bilan3')
    meeting_object.manager_signature = request.get_json().get('manager_signature')
    meeting_object.consultant_signature = request.get_json().get('consultant_signature')
    meeting_object.client_signature = request.get_json().get('client_signature')

    session.commit()

    # return created obj
    new_meeting = MeetingSchema().dump(meeting_object).data
    session.close()
    return jsonify(new_meeting), 201

@app.route('/meetings/<id>', methods=['DELETE'])
def delete_meeting(id):
    # fetching from the database
    session = Session()
    meeting_object = session.query(Meeting).get(id)

    session.delete(meeting_object)
    session.commit()
    session.close()
    return '201'

# PROJECT
@app.route('/projects')
def get_projects():
    # fetching from the database
    session = Session()
    project_objects = session.query(Project).all()

    # transforming into JSON-serializable objects
    schema = ProjectSchema(many=True)
    project = schema.dump(project_objects)

    # serializing as JSON
    session.close()
    return jsonify(project.data)

@app.route('/projects/<id>')
def get_project(id):
    # fetching from the database
    session = Session()
    project_object = session.query(Project).get(id)

    # transforming into JSON-serializable objects
    schema = ProjectSchema()
    project = schema.dump(project_object)

    # serializing as JSON
    session.close()
    return jsonify(project)

@app.route('/projects', methods=['POST'])
def add_project():
    # mount obj object
    posted_project = ProjectSchema(only=('manager_id', 'consultant_id', 'client_id',
     'client_address_id', 'start_date', 'end_date'))\
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

@app.route('/projects/<id>', methods=['PUT'])
def update_project(id):
    # fetching from the database
    session = Session()
    project_object = session.query(Project).get(id)

    project_object.manager_id = request.get_json().get('manager_id')
    project_object.consultant_id = request.get_json().get('consultant_id')
    project_object.client_id = request.get_json().get('client_id')
    project_object.client_address_id = request.get_json().get('client_address_id')
    project_object.start_date = request.get_json().get('start_date')
    project_object.end_date = request.get_json().get('end_date')

    session.commit()

    # return created obj
    new_project = ProjectSchema().dump(project_object).data
    session.close()
    return jsonify(new_project), 201

@app.route('/projects/<id>', methods=['DELETE'])
def delete_project(id):
    # fetching from the database
    session = Session()
    project_object = session.query(Project).get(id)

    session.delete(project_object)
    session.commit()
    session.close()
    return '201'

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

@app.route('/projectManagers/<id>', methods=['PUT'])
def update_projectManager(id):
    # fetching from the database
    session = Session()
    projectManager_object = session.query(ProjectManager).get(id)

    projectManager_object.manager_id = request.get_json().get('manager_id')
    projectManager_object.consultant_id = request.get_json().get('consultant_id')

    session.commit()

    # return created obj
    new_projectManager = ProjectManagerSchema().dump(projectManager_object).data
    session.close()
    return jsonify(new_projectManager), 201

@app.route('/projectManagers/<id>', methods=['DELETE'])
def delete_projectManager(id):
    # fetching from the database
    session = Session()
    projectManager_object = session.query(ProjectManager).get(id)

    session.delete(projectManager_object)
    session.commit()
    session.close()
    return '201'