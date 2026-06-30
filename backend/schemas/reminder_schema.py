-from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ReminderCreate(BaseModel):
    title: str
    description: Optional[str] = None
    reminder_time: datetime


class ReminderUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    reminder_time: Optional[datetime] = None


class ReminderResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    reminder_time: datetime
    completed: bool

    class Config:
        from_attributes = True