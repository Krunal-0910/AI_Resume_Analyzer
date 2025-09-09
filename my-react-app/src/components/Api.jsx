import { useEffect } from "react";
const Api = ({ resumeText }) => {
    // This would be where you implement your API call
    useEffect(() => {
       
            console.log("Sending to API:", resumeText);
            
    }, [resumeText]);
};
export default Api