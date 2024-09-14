![architecture](https://github.com/user-attachments/assets/15d394dd-aed7-449d-a844-7750d8f568c8) <br>
### Data Flow

The data flow in this system follows these steps:

1. **User Interaction**: 
   - The process begins with the user uploading a PDF file via the frontend interface developed in Angular.

2. **HTTP Request**:
   - Once the file is uploaded, an HTTP request is sent to the backend, which is developed in Python with Flask, to initiate the data processing.

3. **PDF to Text Conversion**:
   - The backend first converts the PDF into a text file, allowing for easier manipulation of the contained information.

4. **Querying the LLM Model**:
   - The extracted text is then used to query the LLM Gemini language model with a specifically designed prompt to extract necessary information such as skills, contact details, and other relevant details.

5. **Processing the Results**:
   - The LLM Gemini model returns the results in JSON format. These raw results go through a cleaning stage where the data is filtered, organized, and formatted in a consistent and structured manner.

6. **Data Storage**:
   - The cleaned data is then stored in a MySQL database.

7. **User Feedback**:
   - Finally, the results are sent back to the user via the frontend interface, allowing for clear and organized visualization of the extracted information.

