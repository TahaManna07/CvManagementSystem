import google.generativeai as genai
from config import Config

genai.configure(api_key=Config.GEMINI_API_KEY)

def generate_response(prompt):
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=Config.GENERATION_CONFIG
    )
    chat_session = model.start_chat(history=[])
    response = chat_session.send_message(prompt)
    return response.text.strip()
