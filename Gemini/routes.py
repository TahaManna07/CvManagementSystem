from flask import request, jsonify, send_file
from utils import extract_data, insert_data_into_db, extract_text_from_pdf
from services import generate_response
from models import get_db_connection
import io

def initialize_routes(app):

    @app.route('/', methods=['POST'])
    def upload_file():
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400

        file = request.files['file']

        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        if file and file.filename.lower().endswith('.pdf'):
            file_data = file.read()
            text = extract_text_from_pdf(file_data)

            prompt = f"""
            Analyze the following CV text and extract the following information:
            - Full Name (nom)
            - Phone Number (phone)
            - Email Address (gmail)
            - Technical Skills (compétences techniques)
            - Candidate Profile based on the skills provided, with no additional details, just one or two words. For example: "Backend Developer", "Frontend Developer", etc.

            Provide each item in a separate line with a clear label. For example:
            - Full Name: [Name]
            - Phone Number: [Phone]
            - Email Address: [Email]
            - Technical Skills: [Skills]
            - Candidate Profile: [Profile]

            Here is the CV text:
            {text}
            """
            response_text = generate_response(prompt)
            data = extract_data(response_text)
            insert_data_into_db(data, file_data)

            return jsonify(data)

        return jsonify({"error": "Invalid file type"}), 400

    @app.route('/cvs', methods=['GET'])
    def get_cvs():
        conn = None
        try:
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT id, full_name, phone_number, email_address, technical_skills, candidate_profile FROM cv_info")
            cvs = cursor.fetchall()
            return jsonify({"cvs": cvs})
        finally:
            if conn:
                cursor.close()
                conn.close()

    @app.route('/cv/<int:cv_id>', methods=['GET'])
    def get_cv_by_id(cv_id):
        conn = None
        try:
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT id, full_name, phone_number, email_address, technical_skills, candidate_profile FROM cv_info WHERE id = %s", (cv_id,))
            cv = cursor.fetchone()
            if cv:
                return jsonify(cv), 200
            else:
                return jsonify({"error": "CV not found"}), 404
        finally:
            if conn:
                cursor.close()
                conn.close()

    @app.route('/cv/<int:cv_id>/pdf', methods=['GET'])
    def download_pdf(cv_id):
        conn = None
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("SELECT file_data FROM cv_info WHERE id = %s", (cv_id,))
            result = cursor.fetchone()

            if result and result[0]:
                file_data = result[0]

                if file_data.startswith(b'%PDF'):
                    return send_file(
                        io.BytesIO(file_data),
                        mimetype='application/pdf',
                        as_attachment=False,
                        download_name=f"{cv_id}.pdf"
                    )
                else:
                    return jsonify({"error": "Le fichier n'est pas au format PDF valide"}), 400
            else:
                return jsonify({"error": "CV not found"}), 404
        finally:
            if conn:
                cursor.close()
                conn.close()

    @app.route('/cv/<int:cv_id>', methods=['DELETE'])
    def delete_cv(cv_id):
        conn = None
        try:
            conn = get_db_connection()
            cursor = conn.cursor()

            cursor.execute("DELETE FROM cv_info WHERE id = %s", (cv_id,))
            conn.commit()

            if cursor.rowcount > 0:
                return jsonify({"message": "CV deleted successfully"}), 200
            else:
                return jsonify({"error": "CV not found"}), 404
        finally:
            if conn:
                cursor.close()
                conn.close()

    @app.route('/cv/<int:cv_id>', methods=['PUT'])
    def update_cv(cv_id):
        conn = None
        try:
            conn = get_db_connection()
            cursor = conn.cursor()

            data = request.json
            full_name = data.get('full_name')
            phone_number = data.get('phone_number')
            email_address = data.get('email_address')
            technical_skills = data.get('technical_skills')
            candidate_profile = data.get('candidate_profile')

            update_query = """
            UPDATE cv_info
            SET full_name = %s, phone_number = %s, email_address = %s,
                technical_skills = %s, candidate_profile = %s
            WHERE id = %s
            """
            cursor.execute(update_query, (full_name, phone_number, email_address, technical_skills, candidate_profile, cv_id))
            conn.commit()

            if cursor.rowcount > 0:
                return jsonify({"message": "CV updated successfully"}), 200
            else:
                return jsonify({"error": "CV not found"}), 404
        finally:
            if conn:
                cursor.close()
                conn.close()
