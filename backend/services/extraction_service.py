import json
from schemas.discovery_schema import ExtractedTask
from services.gemini_service import GeminiService
from prompts.discovery_prompt import DISCOVERY_PROMPT
from pydantic import ValidationError

class ExtractionService:

    def __init__(self):
        self.gemini = GeminiService()

    def extract(self, normalized_items):

        prompt = DISCOVERY_PROMPT + "\n\n"

        for item in normalized_items:
            prompt += json.dumps(item.model_dump(mode="json"))
            prompt += "\n"

        response = self.gemini.generate(prompt)
        if response is None:
            print("Skipping extraction because Gemini is unavailable.")
            return []

        print(response)

        # Remove markdown fences if Gemini wraps the JSON
        cleaned = response.strip()

        if cleaned.startswith("```json"):
            cleaned = cleaned[7:]

        if cleaned.startswith("```"):
            cleaned = cleaned[3:]

        if cleaned.endswith("```"):
            cleaned = cleaned[:-3]

        cleaned = cleaned.strip()

        tasks = json.loads(cleaned)

        valid_tasks = []
        for task in tasks:
            try:
                valid_tasks.append(ExtractedTask(**task))
            except ValidationError as e:
                print("Skipping invalid task:")
                print(task)
                print(e)
        return valid_tasks