from google import genai
from config import Config

class GeminiClient:
    def __init__(self):
        self.client = genai.Client(api_key=Config.GEMINI_API_KEY)
        self.model_name = "gemini-2.0-flash"  # Using flash model for speed
    
    def analyze_resume(self, resume_text: str) -> str:
        """Analyze resume text using Gemini AI"""
        
        prompt = f"""
        You are an expert technical recruiter with 15 years of experience at top tech companies.
        Analyze the following resume and provide a detailed JSON response with these exact keys:
        
        - "summary": A comprehensive 2-3 sentence overview of the candidate
        - "strengths": An array of 3-5 key strengths based on their experience
        - "technical_skills": An array of all technical skills found, categorized
        - "experience_level": The estimated years of experience and seniority level
        - "role_suggestions": An array of 3-5 ideal job roles for this candidate
        - "missing_skills": An array of skills that might be missing for senior roles
        - "red_flags": Any potential concerns or gaps in the resume
        
        Resume Text:
        {resume_text}
        
        Provide only valid JSON without any additional text or markdown formatting.
        """
        
        try:
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt
            )
            return response.text
        except Exception as e:
            raise Exception(f"Gemini API error: {str(e)}")

# Create a singleton instance
gemini_client = GeminiClient()