from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from agents.discovery.discovery_agent import DiscoveryAgent

router = APIRouter(
    prefix="/discovery",
    tags=["Discovery"],
)

@router.post("/run")
def run_discovery():
    agent = DiscoveryAgent()

    agent.run(
        {
            "type": "DISCOVERY_REQUESTED"
        }
    )

    return {
        "message": "Discovery completed"
    }