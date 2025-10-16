import { useEffect } from "react";

const FileApi = async ( fileParse, setResults, setAnalysis_complete, setShowAnalyzing, setError ) => {

    let fileToProcess = fileParse;
    
    // Check if the input is a FormData object (or similar iterable)
    if (fileParse instanceof FormData) {
        // Extract the actual File/Blob object from the FormData using the key 'resume'
        // This key must match what was used in FileInput: formData.append('resume', file)
        const fileFromForm = fileParse.get('resume');
        
        // Ensure the extracted item is a Blob/File object before proceeding
        if (fileFromForm instanceof Blob) {
            fileToProcess = fileFromForm;
        } else {
            // Handle error if 'resume' key is missing or not a file
            setError("FormData received, but no valid file found under the key 'resume'.");
            setResults("");
            setAnalysis_complete(false);
            setShowAnalyzing(false);
            return;
        }
    } else if (!(fileParse instanceof Blob)) {
        // Handle error if it's neither FormData nor a File/Blob
        setError("Invalid input: Expected a File, Blob, or FormData object.");
        setResults("");
        setAnalysis_complete(false);
        setShowAnalyzing(false);
        return;
    }
    
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
       
        const base64Content = await fileToBase64(fileToProcess);

       
        const payload = JSON.stringify({
            file_content: base64Content,
            file_type: fileToProcess.type
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
