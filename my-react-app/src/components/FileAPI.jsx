import { useEffect } from "react";
const FileApi = async ( fileParse,setResults,setAnalysis_complete,setShowAnalyzing,setError ) => {
            try{
                const request = await fetch('http://127.0.0.1:5000/analyze', {
                method: 'POST', body: fileParse
                });
                if (!request.ok){
                    throw new Error("Server not responding")
                }
                const data = await request.json()
            // const data=
            // {'summary': 'A Computer Science student with a strong GPA and hands-on experience developing a social media web application using React, Node.js, and MySQL. Eager to apply technical skills and contribute to innovative projects, ideally in a software engineering role.', 
            //     'strengths': ['Full-stack development', 'Database design and management', 'Problem-solving', 'Rapid learning', 'Teamwork'],
            //      'skills': ['React', 'Node.js', 'RESTful API', 'MySQL', 'JavaScript', 'Java', 'UI Design', 'Database Management'], 
            //      'role_fit': 'Software Engineer Intern', 'experience_level': 'Entry', 'recommendations': ['Expand on project details in the resume to showcase specific accomplishments and technologies used.', "Quantify achievements whenever possible (e.g., 'Improved database query performance by X%').", 'Include a link to the personal project on GitHub or a live demo, if available.', 'Tailor the resume to specific job descriptions, highlighting the most relevant skills and experiences.'], 
            //     'ats_score': 75}


                
                setResults(data)
                setAnalysis_complete(true)
                setShowAnalyzing(false)
            }
            catch(e){
                if(e.message.includes("Failed to fetch")|| e.message.includes('NetworkError')){
                setError("Cannot connect to the server")
              }
                setError(e.message)
                setResults("")
                setAnalysis_complete(false)
                setShowAnalyzing(false)
            }
}


export default FileApi