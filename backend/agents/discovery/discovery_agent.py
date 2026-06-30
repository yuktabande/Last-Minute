from services.discovery_service import DiscoveryService
from services.normalization_service import NormalizationService
from services.extraction_service import ExtractionService
from services.deduplication_service import DeduplicationService
from database.database import SessionLocal
from services.discovery_task_service import DiscoveryTaskService

class DiscoveryAgent:

    name = "Discovery Agent"

    def __init__(self):
        self.discovery = DiscoveryService()
        self.normalizer = NormalizationService()
        self.extractor = ExtractionService()
        self.deduplicator = DeduplicationService()
        self.task_service = DiscoveryTaskService()

    def run(self, event):

        print("DiscoveryAgent called")
        print(event)

        if event["type"] != "DISCOVERY_REQUESTED":
            return

        print("Running Discovery Agent")

        print("Collecting Google data...")

        raw = self.discovery.collect()

        print(f"Collected {len(raw)} items")

        normalized = self.normalizer.normalize(raw)

        print(f"Normalized {len(normalized)} items")

        try:
            extracted = self.extractor.extract(normalized)
        except Exception as e:
            print("Gemini extraction failed", e)
            return {
                "success": False,
                "message": "Gemini is temporarily unavailable.",
                "error": str(e),
            }

        unique = self.deduplicator.remove_duplicates(extracted)

        print(f"Unique tasks: {len(unique)}")   
        db = SessionLocal()
        try:
            saved = self.task_service.save_tasks(
                db=db,
                tasks=unique,)
            print(f"Saved {len(saved)} new tasks")
            # from core.event_bus import event_bus
            # event_bus.publish(
            #     {"type": "DISCOVERY_COMPLETED"}
            # )
        finally:
            db.close()