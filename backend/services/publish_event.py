from sqlalchemy.orm import Session
from models.event import Event

def publish_event(
    db: Session,
    event_type: str,
    payload: dict,
):
    event = Event(
        event_type=event_type,
        payload=payload,
    )

    db.add(event)
    db.commit()

    print(f"Published {event_type}")