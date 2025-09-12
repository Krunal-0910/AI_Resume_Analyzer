import React from "react";
import { useContext } from "react";
import { useState, useEffect, useRef } from "react";
import ShowAnalyze from "./ShowAnalyze";

const TextInput = ({textareaRef,text,setText})=>{


 const handleChange = (e) => {
        const newValue = e.target.value;

        
        textareaRef.current = newValue
            setText(newValue)
        
    };


    return (
        <div className=" max-w-2xl mt-4">
            <h2 className="text-2xl font-bold mb-4">Paste Resume Content Here:</h2>
            
            <textarea
                
                className="w-full p-4 border border-gray-300 rounded-lg resize-none w-full h-64 p-4 border border-gray-300 rounded-lg bg-gray-100 overflow-y-scroll resize-none bg-gray-100"
                
                value={text}
                onChange={handleChange}
                placeholder="Copy and paste your resume content here...
Example:
John Doe
Software Engineer
Email: john.doe@email.com

EXPERIENCE:
- Developed web applications using Python and React
- Optimized database performance by 40%
- Led team of 3 developers

SKILLS: Python, JavaScript, React, SQL, AWS

EDUCATION:
BS Computer Science, University Name, 2022"
            />
        </div>
    );
}

export default React.memo(TextInput)