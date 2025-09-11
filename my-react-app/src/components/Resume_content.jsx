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

    
    const [activeTab, setActiveTab] = useState("showAnalyze");
          const tabs = [
    { id: "showAnalyze", label: "Analyze Resume" },
    { id: "showResults", label: "View Results" },
  ];
    const[resumeText, sendResumeText] = useState("")
    const[showWarning,setWarning]=useState(false)
    const[inputMethod, setInputMethod] = useState("text")
    const [results, setResults]=useState("")
    // const[fileResume,setFileResume] =(false)
    const textareaRef = useRef("");
    const handleAnalyze=()=>{
        // if(inputMethod=="text"){
        if(textareaRef.current==""){
          setWarning(true)
          return;
        }
        if (textareaRef.current instanceof FormData) {

            FileApi(textareaRef.current,setResults)
            
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

        <div className="mt-18">
        
    <div className="border-b border-gray-200">
      <nav className="flex space-x-6" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "border-b-2 border-red-500 text-red-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
               
             {activeTab=="showAnalyze"?
             <ShowAnalyze textareaRef={textareaRef} inputMethod={inputMethod} setInputMethod={setInputMethod} />
             
             :<ShowResults results={results} setResults={setResults} />}
             
             {showWarning?<p>Please Submit a Resume</p>:<></>}
             <SubmitButtons onAnalyze={handleAnalyze}/>
              {resumeText==""?<></>:<Api resumeText={resumeText}/>}
             
             
            
            

        </div>
    )
    

}

export default Resume_content
