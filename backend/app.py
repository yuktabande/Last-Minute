from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.database import Base, engine
from routes.tasks import router as task_router
import models.user
import models.task
import models.reminder
import models.energy
from routes.ai import router as ai_router
import models.event
from routes.tasks import router as task_router
from routes.ai import router as ai_router
from routes.google import router as google_router
import models.google_account
from routes.gmail import router as gmail_router
from routes.calendar import router as calendar_router
from routes.classroom import router as classroom_router
from routes.google_tasks import router as google_tasks_router
from routes.discovery import router as discovery_router
from routes.schedule import router as schedule_router
from routes.dashboard import router as dashboard_router
from routes.discovery import router as discovery_router
from routes.tasks import router as tasks_router
from routes.schedule import router as schedule_router
from routes.risk import router as risk_router
from routes.accountability import router as accountability_router
from routes.dashboard import router as dashboard_router

Base.metadata.create_all(bind=engine)
app = FastAPI(
    title="LM-LS API",
    version="1.0.0"
)
app.include_router(discovery_router)
app.include_router(classroom_router)
app.include_router(task_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # we'll restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(google_tasks_router)
app.include_router(calendar_router)
app.include_router(gmail_router)
app.include_router(ai_router)
app.include_router(google_router)
app.include_router(schedule_router)
app.include_router(dashboard_router)
app.include_router(risk_router)

app.include_router(accountability_router)
from routes.google import router as google_router

@app.get("/")
async def root():
    return {
        "message": "LM-LS Backend Running 🚀"
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy"
    }