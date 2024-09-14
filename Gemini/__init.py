from flask import Flask
from flask_cors import CORS
from config import Config
from routes import initialize_routes

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Configurez CORS pour permettre toutes les origines
    CORS(app)

    # Initialiser les routes
    initialize_routes(app)

    return app
