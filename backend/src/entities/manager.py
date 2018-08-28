# coding=utf-8

from sqlalchemy import Column, String, Integer, DateTime

from .entity import Entity, Base

from marshmallow import Schema, fields


class Manager(Entity, Base):
    __tablename__ = 'manager'

    firstName = Column(String)
    lastName = Column(String)
    email = Column(String)
    tel = Column(String)

    def __init__(self, firstName, lastName, email, tel, created_by):
        Entity.__init__(self, created_by)
        self.firstName = firstName
        self.lastName = lastName
        self.email = email
        self.tel = tel

class ManagerSchema(Schema):
    id = fields.Number()
    firstName = fields.Str()
    lastName = fields.Str()
    email = fields.Str()
    tel = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()