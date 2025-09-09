import { useState } from "react"
import ShowAnalyze from "./ShowAnalyze"
import ShowResults from "./ShowResults"
import SubmitButtons from "./SubmitButtons"

import Api from "./Api"
import { useRef } from "react"
import { useEffect } from "react"
import { useCallback } from "react"

const Resume_content = ()=>{
    
    const [showAnalyze, setShowAnalyze] = useState(true);
    const[resumeText, sendResumeText] = useState(' ')
    const[showWarning,setWarning]=useState(false)
    
    const resumeDataRef = useRef(""); 
    const onResumeChange = useCallback((data)=>{resumeDataRef.current+=data;console.log(resumeDataRef)},[])
    const handleAnalyze=()=>{
        if(resumeDataRef.current==""){
          showWarning(true)
        }
        sendResumeText(resumeDataRef.current)
        // setShowAnalyze(false)
               
    }

    // const handleShowAnalyze=()=>{


    // }
    
    return(

        <>
        <div className="option_panel">
            <button className={showAnalyze?'btn btn-primary':'btn'} onClick={()=>setShowAnalyze(true)}>
               Analyze Resume </button>
            <button className={showAnalyze?'btn btn-primary':'btn'} onClick={()=>setShowAnalyze(false)}>
               View Results </button>
             {showAnalyze?<ShowAnalyze onResumeChange={onResumeChange} />:<ShowResult />}
             
             {showWarning?<p>Please Submit a Resume</p>:
             <SubmitButtons onAnalyze={handleAnalyze}/>}

             <Api resumeText={resumeText}/>
             
            
            </div>

        </>
    )
    

}

export default Resume_content