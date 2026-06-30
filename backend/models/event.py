from sqlalchemy import Column, DateTime, Integer, JSON, String
from datetime import datetime

from database.database import Base


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)

    event_type = Column(String, nullable=False)

    payload = Column(JSON)

    created_at = Column(DateTime, default=datetime.utcnow)