from pydantic import BaseModel
from typing import Any
from datetime import datetime
from typing import Optional

class DiscoveryItem(BaseModel):
    source: str
    external_id: str

    title: str
    description: str

    created_at: datetime | None = None
    deadline: datetime | None = None

    metadata: dict[str, Any] = {}


class ExtractedTask(BaseModel):
    title: str
    description: str

    category: str
    priority: str

    deadline: Optional[datetime] = None

    estimated_minutes: Optional[int] = 30

    difficulty: Optional[str] = "Medium"

    confidence: float
