from flask import Flask, request, jsonify, render_template
from gemini_client import gemini_client
import pdfplumber
import io
import json
import re

app = Flask(__name__)

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

def clean_json_response(ai_response):
    """Clean and parse the AI response to ensure valid JSON"""
    try:
        # Remove markdown code blocks if present
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
        # Check if file was uploaded
        if 'resume' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400
        
        file = request.files['resume']
        
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        
        # Check file type
        if not file.filename.lower().endswith('.pdf'):
            return jsonify({"error": "Only PDF files are supported"}), 400
        
        # Extract text from PDF
        resume_text = extract_text_from_pdf(file.stream)
        
        if not resume_text:
            return jsonify({"error": "Could not extract text from PDF"}), 400
        
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