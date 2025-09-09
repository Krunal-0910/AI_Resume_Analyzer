import { useEffect } from "react";
const FileApi = ( fileParse ) => {
    // This would be where you implement your API call
        fetchData();


async function fetchData(){
       
            console.log("Sending to API:", fileParse);
            try{
                const request = await fetch('http://127.0.0.1:5000/analyze', {
                  method: 'POST', // Specifies the method
                  body: fileParse,
                                  });
                if (!request.ok){
                    throw new Error("API fetching failed")
                }
                const data = await request.json()
                console.log(data)



            }
            catch(e){
                console.error(e)
            }
            
            
    }
}


export default FileApi