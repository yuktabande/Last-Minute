from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Float,
    Integer,
    String,
)
from database.database import Base

class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(String)
    category = Column(String)
    priority = Column(String)
    difficulty = Column(String)
    deadline = Column(DateTime)
    estimated_minutes = Column(Integer)
    confidence = Column(Float)
    percent_complete = Column(Float, default=0)
    completed = Column(Boolean, default=False)
    source = Column(String)
    created_at = Column(DateTime)