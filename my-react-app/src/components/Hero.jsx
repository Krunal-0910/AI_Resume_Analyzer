import Resume_content from "./Resume_content"
import { createContext } from "react"
const Hero=()=>{
    return(
<>
<div className="titleContainer">
    <h1 className="title_name">📄 AI Resume Analyzer Pro</h1>
    <h3 className="title_description">Powered by Google Gemini AI - Instant Professional Resume Analysis</h3>
    <div className="main_points">
        <div className="points">AI POWERED</div>
        <div className="points">⚡ Instant Analysis</div>
        <div className="points">ATS Scoring</div>
        <div className="points">Personalized Feedback</div>

    </div>
    
    </div>
   <div className="resume_content_area">
    
    < Resume_content />

        





   </div>
</>
)
}

export default Hero