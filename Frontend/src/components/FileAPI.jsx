import { useEffect } from "react";
const FileApi = async ( fileParse,setResults,setAnalysis_complete,setShowAnalyzing,setError ) => {
            try{
                const request = await fetch('https://y4rhzez7nh7uwjdknqabi64vuy0ugynv.lambda-url.us-east-2.on.aws/analyze', {
                method: 'POST', body: fileParse
                });
                if (!request.ok){
                    throw new Error("Server not responding")
                }
                const data = await request.json()              
                setResults(data)
                setAnalysis_complete(true)
                setShowAnalyzing(false)
            }
            catch(e){
                if(e.message.includes("Failed to fetch")|| e.message.includes('NetworkError')){
                setError("Cannot connect to the server")
              }
              
                setResults("")
                setAnalysis_complete(false)
                setShowAnalyzing(false)
            }
}


export default FileApi
