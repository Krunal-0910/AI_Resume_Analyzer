import { useState } from "react"
import BasicInfo from "./Result_Components/BasicInfo"
import DetailedInfo from "./Result_Components/DetailedInfo"
import TechnicalSkills from "./Result_Components/TechincalSkills"

const ShowResults=()=>{
   


    return(
        <>
        <div className="analysis-resume-main">
            <h3>📋 Analysis Results</h3>
            <span className="analysis_summany">
                <h2>📋 Executive Summary</h2>
                <span className="summary-conatainer"><p></p></span>
            </span>
            <BasicInfo />
            <DetailedInfo />
            <TechnicalSkills />
            </div>
        </>
    )
}

export default ShowResults