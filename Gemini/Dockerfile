# Utiliser une image de base appropriée pour Python
FROM python:3.10-slim

# Installer les dépendances système nécessaires
RUN apt-get update && \
    apt-get install -y \
    gcc \
    pkg-config \
    libmariadb-dev \
    && rm -rf /var/lib/apt/lists/*

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier de dépendances Python
COPY Gemini/requirements.txt ./

# Installer les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste des fichiers de l'application
COPY Gemini/ ./

# Exposer le port sur lequel l'application écoute
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["python", "run.py"]
