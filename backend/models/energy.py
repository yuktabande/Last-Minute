from sqlalchemy import Column, DateTime, Integer

from database.database import Base


class Energy(Base):
    __tablename__ = "energy"

    id = Column(Integer, primary_key=True)

    level = Column(Integer)

    created_at = Column(DateTime)