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
        <div className="mt-4 mr-6 mb-4 ">
            <span className="mt-4 font-mono font-bold ">
                <h2 className="text-[25px] font-bold text-gray-900 mb-6">📋 Executive Summary</h2>
                <div className="bg-sky-50 p-2 rounded-lg shadow-sm ">
                <p className="text-sky-900 ">
                     {results.summary}</p>
                     </div>
                     
                     </span>
            
            <BasicInfo basicInfo={basicInfo} />
           
            <DetailedInfo results={results}/>
           
            </div>
        </>
    )
}

export default ShowResults