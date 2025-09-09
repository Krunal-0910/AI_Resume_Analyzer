import { useState } from "react"
import { useEffect } from "react"
import TextInput from "./TextInput"
import FileInput from "./FileInput"

const ShowAnalyze=({onResumeChange})=>{
    const[inputMethod, setInputMethod] = useState("text")
 
    return(
        <>
        <div className="analyze_resume-main">
            <h1>Choose Input Method</h1>
            
           <label className="radio-label">
                    <input
                        type="radio"
                        name="inputMethod"
                        value="text"
                        checked={inputMethod === "text"}
                        onChange={() => setInputMethod("text")}
                        className="custom-radio"
                    />
                    <span className="custom-radio-btn"></span>
                    <span role="img" aria-label="Paste Text">📄</span> Paste Text
                </label>
                <label className="radio-label">
                    <input
                        type="radio"
                        name="inputMethod"
                        value="file"
                        checked={inputMethod === "file"}
                        onChange={() => setInputMethod("file")}
                        className="custom-radio"
                    />
                    <span className="custom-radio-btn"></span>
                    <span role="img" aria-label="Upload File">📁</span> Upload Text File
                </label>


             {inputMethod=="text"?<TextInput onResumeChange={onResumeChange}/>:<FileInput/>}

            </div>
        </>
    )
}

export default ShowAnalyze