import { useState } from "react"
import ShowAnalyze from "./ShowAnalyze"
import ShowResults from "./ShowResults"
import SubmitButtons from "./SubmitButtons"
import Api from "./Api"
import { useRef } from "react"
import { useEffect } from "react"
import { useCallback,createContext } from "react"
import FileApi from "./FileAPI"
import { IoMdCheckbox } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";




const Resume_content = ()=>{

    
    const [activeTab, setActiveTab] = useState("showAnalyze");
          const tabs = [
    { id: "showAnalyze", label: "Analyze Resume" },
    { id: "showResults", label: "View Results" },
  ];
    const[showWarning,setWarning]=useState(false)
    const[inputMethod, setInputMethod] = useState("text")
    const [results, setResults]=useState("")
    const [analysis_complete,setAnalysis_complete]=useState(false)
    const [text, setText] = useState("")
    const [selectedFile, setSelectedFile] = useState(null);
    const[showAnalyzing, setShowAnalyzing] = useState(false)
    const[error, setError] = useState("")
    const analyzingRef = useRef(null);
const completeRef = useRef(null);

       useEffect(() => {
        if (showAnalyzing && analyzingRef.current) {
          analyzingRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }, [showAnalyzing]);

      // 👇 scroll when analysis_complete changes
        useEffect(() => {
        if (analysis_complete && completeRef.current) {
          completeRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }, [analysis_complete]);

    // const[fileResume,setFileResume] =(false)
    const textareaRef = useRef("");


    const handleAnalyze=()=>{

        setError("")
        if(textareaRef.current==""){
          setWarning(true)
          return;
        }
         setShowAnalyzing(true)
        if (textareaRef.current instanceof FormData) {

            FileApi(textareaRef.current, setResults, setAnalysis_complete,setShowAnalyzing,setError)
            
        }
        else{
        Api(textareaRef.current, setResults, setAnalysis_complete,setShowAnalyzing,setError)

        setWarning(false)
 
              }
            }
       
    

    const handleClear=()=>{
      setError("")
      setAnalysis_complete(false)
      setResults(false)
      setResults("")
      setWarning(false)
      textareaRef.current=""
      setText("")
      setSelectedFile(null);
      setShowAnalyzing(false)
      
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
           (
            <>
            <ShowAnalyze textareaRef={textareaRef} inputMethod={inputMethod} setInputMethod={setInputMethod} text={text} setText={setText}
             selectedFile={selectedFile} setSelectedFile={setSelectedFile} />

             {showWarning?<p>Please Submit a Resume</p>:<></>}
             <SubmitButtons onAnalyze={handleAnalyze} onClear={handleClear}/>
             {showAnalyzing && (
              <div className=" mt-4 flex items-center gap-2 p-4 rounded-lg bg-green-100 border border-green-300"
                    ref ={analyzingRef} >
                    
                    <p className="text-green-700 font-medium">
                      ⏳ Analyzing your resume... please wait a moment
                    </p>
                  </div>
              )}
             {analysis_complete&&(
              <div className=" mt-4 flex items-center gap-2 p-4 rounded-lg bg-green-100 border border-green-300"
                    ref={completeRef}>
                    <FaCheckCircle className="text-green-600 text-xl" />
                    <p className="text-green-700 font-medium">
                      Analysis Complete! Click on the View Results to see the results
                    </p>
                  </div>
             )}

             {error &&(
              <div className=" mt-4 flex items-center gap-2 p-3 rounded-lg bg-red-100 border border-red-300 text-red-700">
                <span className="text-red-600 text-lg">❌</span>
                <p className="font-medium">{error}</p>
              </div>

             )
              }
            </>
           )
             
             :
              
             (analysis_complete && <ShowResults results={results} setResults={setResults}/>)
            }
            
           
        </div>
    )
    

}

export default Resume_content
