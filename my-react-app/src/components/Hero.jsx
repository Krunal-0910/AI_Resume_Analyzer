import Resume_content from "./Resume_content"
import { createContext } from "react"
import { GiCircuitry } from "react-icons/gi";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { GrScorecard } from "react-icons/gr";
import { LuHandshake } from "react-icons/lu";




const Hero=()=>{
    return(
<>
<div className="mt-18 ">
    <h1 className="ml-80 text-[50px] text-lg/10 text-black font-bold">📄 AI Resume Analyzer Pro</h1>
    <h3 className="ml-100 mt-8">Powered by Google Gemini AI - Instant Professional Resume Analysis</h3>
            <div className="mt-8 flex justify-center flex-wrap gap-3">
            <span
              
              className=" flex justify-center gap-2 bg-gradient-to-tr from-[#667eea] to-[#764ba2] text-white font-bold border border-yellow-300  px-4 py-2 rounded-full shadow-sm"
            >
             <GiCircuitry className="text-white mt-1"/>  AI POWERED
            </span>
                        
            <span
              
              className="flex justify-center gap-2 bg-gradient-to-tr from-[#667eea] to-[#764ba2] text-white font-bold border border-yellow-300 px-4 py-2 rounded-full shadow-sm"
            >
             <AiTwotoneThunderbolt className="text-white mt-1"/> Instant Analysis
            </span>
                        <span
              
              className="flex justify-center gap-2 bg-gradient-to-tr from-[#667eea] to-[#764ba2] text-white font-bold border border-yellow-300 px-4 py-2 rounded-full shadow-sm"
            >
              <GrScorecard className="text-white mt-1" />ATS Scoring
            </span>
                        <span
              
              className="flex justify-center gap-2 bg-gradient-to-tr from-[#667eea] to-[#764ba2] text-white font-bold border border-yellow-300 px-4 py-2 rounded-full shadow-sm"
            >
             <LuHandshake className="text-white mt-1" /> Personalized Feedback
            </span>

          
        </div>

    
    </div>
   <div className="resume_content_area">
    
    < Resume_content />

        





   </div>
</>
)
}

export default Hero