# coding=utf-8

from sqlalchemy import Column, String, Integer, ForeignKey

from .entity import Entity, Base

from marshmallow import Schema, fields


class Consultant(Entity, Base):
    __tablename__ = 'consultant'

    firstName = Column(String)
    lastName = Column(String)
    email = Column(String)
    tel = Column(String)
    manager_id = Column(Integer, ForeignKey('manager.id'))

    def __init__(self, firstName, lastName, email, tel, manager_id, created_by):
        Entity.__init__(self, created_by)
        self.firstName = firstName
        self.lastName = lastName
        self.email = email
        self.tel = tel
        self.manager_id = manager_id

class ConsultantSchema(Schema):
    id = fields.Number()
    firstName = fields.Str()
    lastName = fields.Str()
    email = fields.Str()
    tel = fields.Str()
    manager_id = fields.Number()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()