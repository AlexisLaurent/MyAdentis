# coding=utf-8

from sqlalchemy import Column, String, Integer, DateTime, ForeignKey

from .entity import Entity, Base

from marshmallow import Schema, fields


class ProjectManager(Entity, Base):
    __tablename__ = 'projectManager'

    project_id = Column(Integer, ForeignKey('project.id'))
    clientEmployee_id = Column(Integer, ForeignKey('clientEmployee.id'))

    def __init__(self, project_id, clientEmployee_id, created_by):
        Entity.__init__(self, created_by)
        self.project_id = project_id
        self.clientEmployee_id = clientEmployee_id

class ProjectManagerSchema(Schema):
    id = fields.Number()
    project_id = fields.Number()
    clientEmployee_id = fields.Number()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()