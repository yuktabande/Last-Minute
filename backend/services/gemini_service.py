import os
import time

from google import genai
from google.genai.errors import ServerError

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

class GeminiService:

    def generate(self, prompt):

        for attempt in range(3):
            try:
                response = client.models.generate_content(
                    model="gemini-2.5-flash-lite",
                    contents=prompt,
                )

                return response.text

            except ServerError as e:
                print(f"Gemini overloaded (attempt {attempt + 1}/3)")
                print(e)

                if attempt < 2:
                    time.sleep(2)

        print("Gemini failed after 3 attempts.")
        return None