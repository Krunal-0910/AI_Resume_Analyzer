import { useState } from "react"
import { useEffect } from "react"
import TextInput from "./TextInput"
import FileInput from "./FileInput"

const ShowAnalyze=({textareaRef,inputMethod,setInputMethod })=>{
 
    return(
        <div className="mt-4">

        <div className="analyze_resume-main">
            <h1>Choose Input Method</h1>
            
        <div className="mt-4 flex gap-4">
           <label className="">
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
                <label className="">
                    <input
                        type="radio"
                        name="inputMethod"
                        value="file"
                        checked={inputMethod === "file"}
                        onChange={() => setInputMethod("file")}
                        className="custom-radio"
                    />
                    <span role="img"  className="ml-2"aria-label="Upload File">📁</span> Upload Text File
                </label>
                </div>

                
             {inputMethod=="text"?<TextInput textareaRef={textareaRef} />:<FileInput textareaRef={textareaRef} />}
             

            </div>
        </div>
    )
}

export default ShowAnalyze