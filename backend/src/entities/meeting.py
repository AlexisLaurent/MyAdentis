# coding=utf-8

from sqlalchemy import Column, String, Integer, DateTime, ForeignKey

from .entity import Entity, Base

from marshmallow import Schema, fields


class Meeting(Entity, Base):
    __tablename__ = 'meeting'

    project_id = Column(Integer, ForeignKey('project.id'))
    date = Column(DateTime)
    time = Column(String)
    subject = Column(String)
    project_bilan1 = Column(String)
    project_bilan2 = Column(String)
    adentis_bilan1 = Column(String)
    adentis_bilan2 = Column(String)
    adentis_bilan3 = Column(String)
    manager_signature = Column(String)
    consultant_signature = Column(String)
    client_signature = Column(String)

    def __init__(self, project_id, date, time, subject, project_bilan1, project_bilan2, adentis_bilan1, adentis_bilan2, adentis_bilan3, manager_signature, consultant_signature, client_signature, created_by):
        Entity.__init__(self, created_by)
        self.project_id = project_id
        self.date = date
        self.time = time
        self.subject = subject
        self.project_bilan1 = project_bilan1
        self.project_bilan2 = project_bilan2
        self.adentis_bilan1 = adentis_bilan1
        self.adentis_bilan2 = adentis_bilan2
        self.adentis_bilan3 = adentis_bilan3
        self.manager_signature = manager_signature
        self.consultant_signature = consultant_signature
        self.client_signature = client_signature

class MeetingSchema(Schema):
    id = fields.Number()
    project_id = fields.Number()
    date = fields.DateTime()
    time = fields.Str()
    subject = fields.Str()
    project_bilan1 = fields.Str()
    project_bilan2 = fields.Str()
    adentis_bilan1 = fields.Str()
    adentis_bilan2 = fields.Str()
    adentis_bilan3 = fields.Str()
    manager_signature = fields.Str()
    consultant_signature = fields.Str()
    client_signature = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()