from dataclasses import dataclass, field
from datetime import datetime
from uuid import uuid4


@dataclass
class Event:
    type: str
    payload: dict
    source: str = "backend"
    timestamp: datetime = field(default_factory=datetime.utcnow)
    correlation_id: str = field(default_factory=lambda: str(uuid4()))