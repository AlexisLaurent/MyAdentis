# coding=utf-8

from sqlalchemy import Column, String, Integer, DateTime, ForeignKey

from .entity import Entity, Base

from marshmallow import Schema, fields


class ClientEmployee(Entity, Base):
    __tablename__ = 'clientEmployee'

    firstName = Column(String)
    lastName = Column(String)
    email = Column(String)
    tel = Column(String)
    title = Column(String)
    client_id = Column(Integer, ForeignKey('client.id'))

    def __init__(self, firstName, lastName, email, tel, title, client_id, created_by):
        Entity.__init__(self, created_by)
        self.firstName = firstName
        self.lastName = lastName
        self.email = email
        self.tel = tel
        self.title = title
        self.client_id = client_id

class ClientEmployeeSchema(Schema):
    id = fields.Number()
    firstName = fields.Str()
    lastName = fields.Str()
    email = fields.Str()
    tel = fields.Str()
    title = fields.Str()
    client_id = fields.Number()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()