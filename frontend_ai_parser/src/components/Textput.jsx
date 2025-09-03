import { useState } from "react"
const TextInput=()=>{


    return(
        <>
        <p>Paste Resume Content Here:</p>
        <label className="text-input">
            <input 
            type="text"
            placeholder="
            Copy and paste your resume content here...
            Example:
            John Doe
            Software Engineer
            Email: john.doe@email.com
            EXPERIENCE:- Developed web applications using Python and React
               Optimized database performance by 40%
            Led team of 3 developers\n\nSKILLS: Python, JavaScript, React, SQL, AWS\n\nEDUCATION:\n
            BS Computer Science, University Name, 2022"
            />
        </label>

        </>
    )
}

export default TextInput