from flask import Flask, request, jsonify, render_template
from gemini_client import gemini_client
import pdfplumber
import io
import json
import re
from flask_cors import CORS
from docx import Document


app = Flask(__name__)
CORS(app)



def extract_text_from_pdf(file_stream):
    """Extract text from PDF file"""
    try:
        text = ""
        with pdfplumber.open(io.BytesIO(file_stream.read())) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        return text.strip()
    except Exception as e:
        raise Exception(f"PDF processing error: {str(e)}")
    
def extract_text_from_word(file):
    """Extract text from .docx file"""
    try:
        text = []
        doc = Document(file)
        for para in doc.paragraphs:
             if para.text.strip():
                 text.append(para.text)
        return "\n".join(text)
    except Exception as e:
        raise Exception(f"word processing error: {str(e)}")



def clean_json_response(ai_response):
    """Clean and parse the AI response to ensure valid JSON"""
    try:
        
        cleaned_response = re.sub(r'```json\s*|\s*```', '', ai_response).strip()
        return json.loads(cleaned_response)
    except json.JSONDecodeError:
        # If parsing fails, return the raw text
        return {"error": "Failed to parse AI response", "raw_response": ai_response}

@app.route('/')
def index():
    """Serve the main page"""
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze_resume():
    """API endpoint to analyze resume"""
    try:
        resume_text=""
        if request.is_json:            
            data = request.get_json()
            if not data or "resume" not in data:
                return jsonify({"error":"No Text Detacted"})
            resume_text  = data["resume"]
        elif request.files:
            if 'resume' not in request.files:
                return jsonify({"error": "No file uploaded"}), 400
            
            file = request.files['resume']
            
            if file.filename == '':
                return jsonify({"error": "No file selected"}), 400
            
            # Check file type
            if file.filename.lower().endswith('.pdf'):
                resume_text = extract_text_from_pdf(file.stream)
            elif file.filename.lower().endswith('.docx'):
                resume_text = extract_text_from_word(file)    
            else:
                return jsonify({"error": "Only .pfd and .docx files are supported"}), 400
            
        else:
            return jsonify({"error":"Unexpected Request Header"})
        
        if not resume_text:
            return jsonify({"error": "No Text Found !"}), 400
        

        # Send to Gemini for analysis
        ai_response = gemini_client.analyze_resume(resume_text)
        
        # Clean and parse the response
        analysis_result = clean_json_response(ai_response)

        print(analysis_result)
        return jsonify(analysis_result)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
    