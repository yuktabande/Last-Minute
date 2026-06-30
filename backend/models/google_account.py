from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from database.database import Base


class GoogleAccount(Base):
    __tablename__ = "google_accounts"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String, unique=True, nullable=False)

    access_token = Column(String)

    refresh_token = Column(String)

    expiry = Column(DateTime)

    created_at = Column(DateTime, default=datetime.utcnow)