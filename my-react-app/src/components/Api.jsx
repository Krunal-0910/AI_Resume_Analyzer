import { useEffect } from "react";
const Api = ({ resumeText }) => {
    // This would be where you implement your API call
    useEffect( () => {
        fetchData();
        
        
}, [resumeText]);


async function fetchData(){
       
            console.log("Sending to API:", resumeText);
            // try{
            //     const request = await fetch('https://api.example.com/data', {
            //       method: 'POST', // Specifies the method
            //       headers: {
            //         'Content-Type': 'application/json', // Indicates the format of the body
            //       },
            //       body: JSON.stringify({
            //         // The data you want to send
            //         name: 'John Doe',
            //         age: 30,
            //       }),
            //     });
            //     if (!request.ok){
            //         throw new Error("API fetching failed")
            //     }
            //     const data = await request.json()



            // }
            // catch(e){
            //     console.error(e)
            // }
            
            
    }
}


export default Api