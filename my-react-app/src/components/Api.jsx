import { useEffect } from "react";
const Api = async ( resumeText, setResults ) => {
 
       
            console.log("Sending to API:", resumeText);
            try{
                const request = await fetch('http://127.0.0.1:5000/analyze', {
                  method: 'POST', // Specifies the method
                  headers: {
                    'Content-Type': 'application/json', // Indicates the format of the body
                  },
                  body: JSON.stringify({
                    
                    resume:resumeText
                  }),
                });
                if (!request.ok){
                    throw new Error("API fetching failed")
                }
                const data = await request.json()
                console.log(data)
                setResults(data)
            }
            catch(e){
                console.error(e)
            }
            
            
    }


export default Api