# coding=utf-8

from sqlalchemy import Column, String, Integer, DateTime

from .entity import Entity, Base

from marshmallow import Schema, fields


class Client(Entity, Base):
    __tablename__ = 'client'

    name = Column(String)
    address = Column(String)
    cp = Column(String)
    city = Column(String)

    def __init__(self, name, address, cp, city, created_by):
        Entity.__init__(self, created_by)
        self.name = name
        self.address = address
        self.cp = cp
        self.city = city

class ClientSchema(Schema):
    id = fields.Number()
    name = fields.Str()
    address = fields.Str()
    cp = fields.Str()
    city = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()