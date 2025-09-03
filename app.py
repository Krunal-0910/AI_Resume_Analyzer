# app.py
import streamlit as st
import json
import google.generativeai as genai
import time
import re

# Page configuration
st.set_page_config(
    page_title="AI Resume Analyzer Pro",
    page_icon="📄",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for styling
st.markdown("""
<style>
    .main-header {
        font-size: 3rem;
        color: #1f77b4;
        text-align: center;
        margin-bottom: 2rem;
    }
    .success-box {
        background-color: #d4edda;
        padding: 20px;
        border-radius: 10px;
        border-left: 5px solid #28a745;
        margin: 20px 0;
    }
    .analysis-card {
        background-color: #f8f9fa;
        padding: 15px;
        border-radius: 10px;
        margin: 10px 0;
        border-left: 4px solid #007bff;
    }
    .feature-badge {
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-weight: bold;
        margin: 5px;
        display: inline-block;
    }
</style>
""", unsafe_allow_html=True)

# Your Gemini API Key (hardcoded)
GEMINI_API_KEY = "AIzaSyCaAhMIofaKKdGgC56DJVA6ERus_PfHurQ"

# Initialize session state
if 'analysis_result' not in st.session_state:
    st.session_state.analysis_result = None
if 'gemini_configured' not in st.session_state:
    st.session_state.gemini_configured = False

# Configure Gemini on app start
try:
    genai.configure(api_key=GEMINI_API_KEY)
    models = genai.list_models()
    available_models = [model.name for model in models]
    st.session_state.gemini_configured = True
    st.session_state.available_models = available_models
except Exception as e:
    st.error(f"Failed to configure Gemini: {str(e)}")
    st.session_state.gemini_configured = False

def get_available_model():
    """Get the best available model"""
    preferred_models = [
        "models/gemini-2.0-flash"
    ]
    
    available_models = st.session_state.get('available_models', [])
    
    for model in preferred_models:
        if model in available_models:
            return model
    
    # If no preferred models found, return the first available one
    if available_models:
        return available_models[0]
    
    return "models/gemini-pro"  # Fallback

def analyze_with_gemini(resume_text, analysis_depth="Standard"):
    """Analyze resume using Google Gemini"""
    try:
        # Get the best available model
        model_name = get_available_model()
        
        # Create the model with safety settings
        generation_config = {
            "temperature": 0.3,
            "top_p": 0.8,
            "top_k": 40,
            "max_output_tokens": 2048,
        }

        safety_settings = [
            {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
        ]

        model = genai.GenerativeModel(
            model_name=model_name,
            generation_config=generation_config,
            safety_settings=safety_settings
        )
        
        # Adjust prompt based on analysis depth
        detail_level = {
            "Quick": "Be concise and focus on key points only.",
            "Standard": "Provide balanced analysis with key insights.",
            "Detailed": "Provide comprehensive analysis with specific examples and recommendations."
        }[analysis_depth]
        
        prompt = f"""
        You are an expert technical recruiter and career coach. Analyze the following resume and provide a JSON output with these exact keys:
        - "summary": A two-sentence professional summary of this candidate
        - "strengths": An array of 3-5 key strengths based on their experience
        - "skills": An array of the top technical skills found (max 8 skills)
        - "role_fit": The most suitable job role for this candidate
        - "experience_level": Estimated experience level (Entry, Junior, Mid, Senior)
        - "recommendations": An array of 3-4 actionable recommendations for improvement
        - "ats_score": A score from 1-100 estimating ATS compatibility

        {detail_level}

        Return ONLY valid JSON format. Do not include any other text or markdown.

        Resume Text:
        {resume_text}
        """
        
        # Generate content
        response = model.generate_content(prompt)
        
        # Extract JSON from response
        response_text = response.text.strip()
        
        # Clean the response (remove markdown code blocks if present)
        response_text = re.sub(r'^```json\s*|\s*```$', '', response_text, flags=re.IGNORECASE)
        response_text = response_text.strip()
        
        # Parse JSON
        result = json.loads(response_text)
        return result
        
    except json.JSONDecodeError:
        st.error("The AI response wasn't valid JSON. Try again with a different analysis depth.")
        return None
    except Exception as e:
        st.error(f"Gemini analysis failed: {str(e)}")
        return None

# Header
st.markdown('<h1 class="main-header">📄 AI Resume Analyzer Pro</h1>', unsafe_allow_html=True)
st.markdown("### Powered by Google Gemini AI - Instant Professional Resume Analysis")

# Feature badges
st.markdown("""
<div style="text-align: center; margin-bottom: 2rem;">
    <span class="feature-badge">🤖 AI-Powered</span>
    <span class="feature-badge">⚡ Instant Analysis</span>
    <span class="feature-badge">📊 ATS Scoring</span>
    <span class="feature-badge">🎯 Personalized Feedback</span>
</div>
""", unsafe_allow_html=True)

# Sidebar for settings
with st.sidebar:
    st.header("⚙️ Analysis Settings")
    
    analysis_depth = st.select_slider(
        "Analysis Depth",
        options=["Quick", "Standard", "Detailed"],
        value="Standard",
        help="Choose how detailed you want the analysis to be"
    )
    
    output_format = st.selectbox(
        "Output Format",
        ["Formatted Display", "Raw JSON"],
        help="Choose how you want to view the results"
    )
    
    st.markdown("---")
    st.header("🔧 Technical Info")
    
    if st.session_state.gemini_configured:
        st.success("✅ Gemini AI Connected")
        model_name = get_available_model()
        st.info(f"**Model:** {model_name.split('/')[-1]}")
    else:
        st.error("❌ Gemini Not Configured")
    
    st.markdown("---")
    st.header("📊 Usage Tips")
    st.info("""
    - Paste complete resume text for best results
    - Include skills, experience, and education
    - Use 'Detailed' mode for comprehensive feedback
    - Download results for future reference
    """)

# Main content area
tab1, tab2, tab3 = st.tabs(["📝 Analyze Resume", "📊 View Results", "ℹ️ About"])

with tab1:
    st.header("Analyze Your Resume")
    
    # Input method selection
    input_method = st.radio(
        "Choose input method:",
        ["📋 Paste Text", "📁 Upload Text File"],
        horizontal=True
    )
    
    resume_text = ""
    
    if input_method == "📋 Paste Text":
        resume_text = st.text_area(
            "Paste resume content here:",
            height=300,
            placeholder="Copy and paste your resume content here...\n\nExample:\nJohn Doe\nSoftware Engineer\nEmail: john.doe@email.com\n\nEXPERIENCE:\n- Developed web applications using Python and React\n- Optimized database performance by 40%\n- Led team of 3 developers\n\nSKILLS: Python, JavaScript, React, SQL, AWS\n\nEDUCATION:\nBS Computer Science, University Name, 2022",
            help="Include experience, skills, education, and projects for best results"
        )
    else:
        uploaded_file = st.file_uploader(
            "Upload a text file",
            type=['txt'],
            help="Upload a .txt file containing your resume content"
        )
        
        if uploaded_file:
            if uploaded_file.type == "text/plain":
                resume_text = str(uploaded_file.read(), "utf-8")
            else:
                st.warning("Please upload a text file (.txt)")
    
    # Analyze button
    col1, col2 = st.columns([3, 1])
    
    with col1:
        if st.button("🔍 Analyze My Resume", type="primary", use_container_width=True):
            if not resume_text.strip():
                st.error("Please provide some resume content to analyze.")
            elif not st.session_state.gemini_configured:
                st.error("Gemini AI is not configured properly. Please check the API key.")
            else:
                with st.spinner("🤖 AI is analyzing your resume... This may take 10-20 seconds"):
                    try:
                        result = analyze_with_gemini(resume_text, analysis_depth)
                        
                        if result:
                            st.session_state.analysis_result = result
                            st.success("✅ Analysis complete! Switch to the 'View Results' tab to see your feedback.")
                        else:
                            st.error("Analysis failed. Please try again with different content.")
                            
                    except Exception as e:
                        st.error(f"❌ Analysis error: {str(e)}")
    
    with col2:
        if st.button("🔄 Clear", use_container_width=True):
            st.session_state.analysis_result = None
            st.info("Results cleared")

with tab2:
    st.header("Analysis Results")
    
    if not st.session_state.gemini_configured:
        st.error("Gemini AI is not configured. Please check the setup.")
    elif st.session_state.analysis_result:
        result = st.session_state.analysis_result
        
        if output_format == "Formatted Display":
            # Summary
            st.markdown("### 📋 Executive Summary")
            st.info(result.get('summary', 'No summary available'))
            
            # Main metrics in cards
            col1, col2, col3, col4 = st.columns(4)
            
            with col1:
                st.metric("🎯 Suggested Role", result.get('role_fit', 'N/A'))
            
            with col2:
                exp_level = result.get('experience_level', 'N/A')
                st.metric("📈 Experience Level", exp_level)
            
            with col3:
                ats_score = result.get('ats_score', 'N/A')
                if isinstance(ats_score, (int, float)):
                    st.metric("📊 ATS Score", f"{ats_score}/100")
                    # Color code based on score
                    if ats_score >= 80:
                        st.success("Excellent ATS compatibility!")
                    elif ats_score >= 60:
                        st.warning("Good ATS compatibility")
                    else:
                        st.error("Needs ATS optimization")
                else:
                    st.metric("📊 ATS Score", ats_score)
            
            with col4:
                skills_count = len(result.get('skills', []))
                st.metric("🛠️ Skills Found", skills_count)
            
            # Detailed sections
            st.markdown("---")
            col1, col2 = st.columns(2)
            
            with col1:
                st.markdown("### 💪 Key Strengths")
                strengths = result.get('strengths', [])
                if strengths:
                    for i, strength in enumerate(strengths, 1):
                        st.markdown(f"""
                        <div style='background: #f8f9fa; padding: 15px; border-radius: 10px; margin: 10px 0; border-left: 4px solid #28a745;'>
                        <strong>#{i}</strong> {strength}
                        </div>
                        """, unsafe_allow_html=True)
                else:
                    st.info("No strengths identified")
                
                st.markdown("### 🛠️ Technical Skills")
                skills = result.get('skills', [])
                if skills:
                    skills_html = "".join([f"<span style='background: #e9ecef; padding: 8px 16px; margin: 5px; border-radius: 20px; display: inline-block;'>{skill}</span>" for skill in skills])
                    st.markdown(f"<div style='margin: 15px 0;'>{skills_html}</div>", unsafe_allow_html=True)
                else:
                    st.info("No skills identified")
            
            with col2:
                st.markdown("### 📈 Recommendations for Improvement")
                recommendations = result.get('recommendations', [])
                if recommendations:
                    for i, recommendation in enumerate(recommendations, 1):
                        st.markdown(f"""
                        <div style='background: #fff3cd; padding: 15px; border-radius: 10px; margin: 10px 0; border-left: 4px solid #ffc107;'>
                        <strong>📍 Recommendation #{i}</strong><br>{recommendation}
                        </div>
                        """, unsafe_allow_html=True)
                else:
                    st.info("No recommendations available")
        
        else:  # Raw JSON output
            st.markdown("### 📄 Raw JSON Output")
            st.json(result)
        
        # Download button
        json_str = json.dumps(result, indent=2)
        st.download_button(
            label="📥 Download Analysis Results",
            data=json_str,
            file_name="resume_analysis.json",
            mime="application/json",
            use_container_width=True
        )
        
    else:
        st.info("👆 Upload your resume and click 'Analyze' to get started!")
        st.image("https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&h=300&fit=crop", use_column_width=True)

with tab3:
    st.header("About This Tool")
    
    st.markdown("""
    ## 🚀 AI Resume Analyzer Pro
    
    This powerful tool uses Google's advanced Gemini AI to provide comprehensive resume analysis and career guidance.
    
    ### ✨ Features
    
    - **🤖 AI-Powered Analysis**: Deep learning algorithms extract key insights from your resume
    - **📊 ATS Compatibility Score**: See how well your resume performs in applicant tracking systems
    - **🎯 Role Matching**: Discover the most suitable job roles for your skills
    - **💪 Strength Identification**: Highlight your key strengths and achievements
    - **📈 Personalized Recommendations**: Get actionable advice to improve your resume
    - **⚡ Instant Results**: Get comprehensive analysis in seconds
    
    ### 🎯 How It Works
    
    1. **Paste Your Resume**: Copy and paste your resume content
    2. **AI Analysis**: Our Gemini AI analyzes your skills, experience, and qualifications
    3. **Get Insights**: Receive detailed feedback and recommendations
    4. **Improve**: Use the insights to optimize your resume for job applications
    
    ### 🔒 Privacy & Security
    
    - Your resume data is processed securely by Google's Gemini AI
    - No data is stored on our servers
    - All analysis happens in real-time
    - Your information remains confidential
    
    ### 🛠️ Built With
    
    - **Streamlit**: Beautiful web interface
    - **Google Gemini AI**: Advanced artificial intelligence
    - **Python**: Robust backend processing
    
    *This tool is designed to help job seekers create stronger resumes and improve their job application success rates.*
    """)
    
    st.markdown("---")
    st.markdown("""
    ### 💡 Tips for Best Results
    
    1. **Include Complete Information**: Paste your entire resume including experience, skills, education, and projects
    2. **Be Specific**: Include quantifiable achievements and specific technologies
    3. **Use Detailed Mode**: For comprehensive feedback, choose "Detailed" analysis
    4. **Review Recommendations**: Implement the suggested improvements for better results
    5. **Update Regularly**: Re-analyze after making changes to track improvements
    """)
