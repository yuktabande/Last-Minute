from fastapi import APIRouter
from database.database import SessionLocal
from services.accountability_service import AccountabilityService
from services.risk_service import RiskService

router = APIRouter(prefix="/accountability", tags=["Accountability"])


@router.get("/")
def get_intervention():

    db = SessionLocal()

    try:

        report = RiskService().analyze(db)

        return AccountabilityService().generate_intervention(
            db,
            report
        )

    finally:
        db.close()