import React from "react";
import { useState, useEffect, useRef } from "react";

// TextInput component with forwardRef to expose its value
const TextInput = ({onResumeChange})=>{
    // Set initial height based on placeholder content
    const [textValue, setTextValue] = useState('')
    const textareaRef = useRef(null);
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [textValue]);

 const handleChange = (e) => {
        const newValue = e.target.value;
        setTextValue(newValue)
        // Auto-resize textarea
        // e.target.style.height = 'auto';
        // e.target.style.height = `${e.target.scrollHeight}px`;
        onResumeChange(newValue);
    };


    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Paste Resume Content Here:</h2>
            
            <textarea
                ref={textareaRef}
                className="w-full p-4 border border-gray-300 rounded-lg resize-none overflow-hidden"
                value={textValue}
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