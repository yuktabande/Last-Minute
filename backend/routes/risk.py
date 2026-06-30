from fastapi import APIRouter
from database.database import SessionLocal
from services.risk_service import RiskService

router = APIRouter(prefix="/risk", tags=["Risk"])


@router.get("/")
def get_risk():

    db = SessionLocal()

    try:
        return RiskService().analyze(db)

    finally:
        db.close()