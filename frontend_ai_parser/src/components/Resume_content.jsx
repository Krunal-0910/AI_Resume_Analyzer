import { useState } from "react"
import ShowAnalyze from "./ShowAnalyze"
import ShowResults from "./ShowResults"

const Resume_content = ()=>{
    
    const [showAnalyze, setShowAnalyze] = useState([true]);
    return(

        <>
        <div className="option_panel">
            {showAnalyze?<ShowAnalyze />:<ShowResult />}
            <button className={showAnalyze?'btn btn-primary':'btn'} onClick={()=>showAnalyze(true)}>
               Analyze Resume </button>
            <button className={showAnalyze?'btn btn-primary':'btn'} onClick={()=>showAnalyze(false)}>
               View Results </button>
            
            </div>

            

        
        </>
    )
    

}

export default Resume_content