import { useEffect } from "react";

const FileApi = async ( fileParse, setResults, setAnalysis_complete, setShowAnalyzing, setError ) => {
    
    
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file); // Reads file and converts to data URL (Base64)
            reader.onload = () => {
                
                const base64Content = reader.result.split(',')[1];
                resolve(base64Content);
            };
            reader.onerror = (error) => reject(error);
        });
    };

    try {
       
        const base64Content = await fileToBase64(fileParse);

       
        const payload = JSON.stringify({
            file_content: base64Content,
            file_type: fileParse.type
        });

        
        const request = await fetch('https://y4rhzez7nh7uwjdknqabi64vuy0ugynv.lambda-url.us-east-2.on.aws/analyze', {
            method: 'POST', 
            headers: {
                // Must explicitly set content-type to JSON
                'Content-Type': 'application/json' 
            },
            body: payload
        });
    
        if (!request.ok){
            throw new Error("Server not responding")
        }
        
        const data = await request.json()        
        setResults(data)
        setAnalysis_complete(true)
        setShowAnalyzing(false)

    } catch(e) {
        if(e.message.includes("Failed to fetch") || e.message.includes('NetworkError')){
            setError("Cannot connect to the server or file processing error.")
        } else {
            setError(`An error occurred: ${e.message}`);
        }
        
        setResults("")
        setAnalysis_complete(false)
        setShowAnalyzing(false)
    }
}

export default FileApi
