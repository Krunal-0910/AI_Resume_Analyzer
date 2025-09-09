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
        
        You are an expert technical recruiter and career coach. Analyze the following resume and provide a JSON output with these exact keys:
        - "summary": A two-sentence professional summary of this candidate
        - "strengths": An array of 3-5 key strengths based on their experience
        - "skills": An array of the top technical skills found (max 8 skills)
        - "role_fit": The most suitable job role for this candidate
        - "experience_level": Estimated experience level (Entry, Junior, Mid, Senior)
        - "recommendations": An array of 3-4 actionable recommendations for improvement
        - "ats_score": A score from 1-100 estimating ATS compatibility  
        
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