import re
import io
import mysql.connector
from pdfminer.high_level import extract_text_to_fp

def extract_data(text):
    """
    Extrait les informations spécifiques du texte en utilisant des expressions régulières.
    Retourne un dictionnaire contenant les données extraites.
    """
    data = {}
    patterns = {
        "Full Name": r"Full Name:\s*(.+)",
        "Phone Number": r"Phone Number:\s*(.+)",
        "Email Address": r"Email Address:\s*(.+)",
        "Technical Skills": r"Technical Skills:\s*(.+)",
        "Candidate Profile": r"Candidate Profile:\s*(.+)"
    }
    for key, pattern in patterns.items():
        match = re.search(pattern, text)
        if match:
            data[key] = match.group(1).strip()
        else:
            data[key] = "Non disponible"
    return data

def insert_data_into_db(data, file_data):
    """
    Insère les données extraites et le fichier PDF dans la base de données MySQL.
    """
    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        insert_query = """
        INSERT INTO cv_info (full_name, phone_number, email_address, technical_skills, candidate_profile, file_data)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        values = (
            data.get('Full Name', 'Non disponible'),
            data.get('Phone Number', 'Non disponible'),
            data.get('Email Address', 'Non disponible'),
            data.get('Technical Skills', 'Non disponible'),
            data.get('Candidate Profile', 'Non disponible'),
            file_data
        )

        cursor.execute(insert_query, values)
        conn.commit()
    except mysql.connector.Error as e:
        print(f"Error inserting data into database: {e}")
    finally:
        if conn:
            cursor.close()
            conn.close()

def extract_text_from_pdf(file_data):
    """
    Extrait le texte d'un fichier PDF et le retourne sous forme de chaîne de caractères.
    """
    output_string = io.StringIO()
    try:
        extract_text_to_fp(io.BytesIO(file_data), output_string)
        text = output_string.getvalue()
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        text = ""
    finally:
        output_string.close()
    
    return text

def get_db_connection():
    """
    Retourne une connexion à la base de données MySQL.
    """
    return mysql.connector.connect(
        user='root', 
        password='',
        host='localhost',
        database='cv_database'
    )
