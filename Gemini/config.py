import os

class Config:
    # Configuration de la clé API Google
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

    # Configuration de la base de données
    DB_CONFIG = {
        'user': 'root',
        'password': '',
        'host': 'localhost',
        'database': 'cv_database'
    }
    
    # Configuration du modèle
    GENERATION_CONFIG = {
        "temperature": 0.7,
        "top_p": 0.9,
        "top_k": 50,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
    }
