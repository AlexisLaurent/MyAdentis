# coding=utf-8

from sqlalchemy import Column, String, Integer, DateTime, ForeignKey

from .entity import Entity, Base

from marshmallow import Schema, fields


class Project(Entity, Base):
    __tablename__ = 'project'

    manager_id = Column(Integer, ForeignKey('manager.id'))
    consultant_id = Column(Integer, ForeignKey('consultant.id'))
    client_id = Column(Integer, ForeignKey('client.id'))
    clientEmployee_id = Column(Integer, ForeignKey('clientEmployee.id'))
    start_date = Column(DateTime)
    end_date = Column(DateTime)

    def __init__(self, manager_id, consultant_id, client_id, clientEmployee_id, start_date, end_date, created_by):
        Entity.__init__(self, created_by)
        self.manager_id = manager_id
        self.consultant_id = consultant_id
        self.client_id = client_id
        self.clientEmployee_id = clientEmployee_id
        self.start_date = start_date
        self.end_date = end_date

class ProjectSchema(Schema):
    id = fields.Number()
    manager_id = fields.Number()
    consultant_id = fields.Number()
    client_id = fields.Number()
    clientEmployee_id = fields.Number()
    start_date = fields.DateTime()
    end_date = fields.DateTime()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()