import { useState } from "react"
import ShowAnalyze from "./ShowAnalyze"
import ShowResults from "./ShowResults"
import SubmitButtons from "./SubmitButtons"
import Api from "./Api"
import { useRef } from "react"
import { useEffect } from "react"
import { useCallback,createContext } from "react"
import FileApi from "./FileAPI"

    
    const TextAreaContext = createContext()

const Resume_content = ()=>{
    
    const [showAnalyze, setShowAnalyze] = useState(true);
    const[resumeText, sendResumeText] = useState("")
    const[showWarning,setWarning]=useState(false)
    const[inputMethod, setInputMethod] = useState("text")
    // const[fileResume,setFileResume] =(false)
    const textareaRef = useRef("");
    const handleAnalyze=()=>{
        // if(inputMethod=="text"){
        if(textareaRef.current==""){
          setWarning(true)
          return;
        }
        if (textareaRef.current instanceof FormData) {

            FileApi(textareaRef.current)
            
        }
        else{
        sendResumeText(textareaRef.current)
        setWarning(false)
        // setShowAnalyze(false)
        }
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
               
             {showAnalyze?
             <ShowAnalyze textareaRef={textareaRef} inputMethod={inputMethod} setInputMethod={setInputMethod} />
             
             :<ShowResult />}
             
             {showWarning?<p>Please Submit a Resume</p>:<></>}
             <SubmitButtons onAnalyze={handleAnalyze}/>
              {resumeText==""?<></>:<Api resumeText={resumeText}/>}
             
             
            
            </div>

        </>
    )
    

}

export default Resume_content
