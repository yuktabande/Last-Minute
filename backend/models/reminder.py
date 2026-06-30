from sqlalchemy import Boolean, Column, DateTime, Integer, String

from database.database import Base


class Reminder(Base):
    __tablename__ = "reminders"

    id = Column(Integer, primary_key=True)

    title = Column(String)

    description = Column(String)

    reminder_time = Column(DateTime)

    completed = Column(Boolean, default=False)