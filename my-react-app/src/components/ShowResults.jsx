import { useState } from "react"
import BasicInfo from "./Result_Components/BasicInfo"
import DetailedInfo from "./Result_Components/DetailedInfo"
// import TechnicalSkills from "./Result_Components/TechincalSkills"

const ShowResults=({results,setResults})=>{
    const basicInfo={
        suggested_role:results.role_fit,
        experience_level:results.experience_level,
        ats_score:results.ats_score,
        skills_found:results.skills
    }
    console.log(basicInfo)
    return(
        <>
        <div className="analysis-resume-main">
            <h3>📋 Analysis Results</h3>
            <span className="analysis_summany">
                <h2>📋 Executive Summary</h2>
                <span className="summary-conatainer"><p className="font-mono"> {results.summary}</p></span>
            </span>
            <BasicInfo basicInfo={basicInfo} />
            <DetailedInfo results={results}/>
           
            </div>
        </>
    )
}

export default ShowResults