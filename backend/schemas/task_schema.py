from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    priority: str
    estimated_minutes: int


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[str] = None
    estimated_minutes: Optional[int] = None


class ProgressUpdate(BaseModel):
    percent_complete: float


class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    priority: Optional[str] = None
    estimated_minutes: Optional[int] = 30
    percent_complete: float
    completed: bool
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True