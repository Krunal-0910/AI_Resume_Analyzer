
import { TbTargetArrow } from "react-icons/tb";

const BasicInfo=({basicInfo})=>{

  
    return(
        <div className=" mt-6 flex justify-between items-center mr-3">
  <div className="flex flex-col items-center">
    <span className="text-[15px] font-medium text-gray-600">🎯 Suggested Role</span>
    <span className="text-[25px] font-semibold text-gray-900">{basicInfo.suggested_role}</span>
  </div>
  <div className="flex flex-col items-center ">
    <span className="text-[15px] text-sm text-gray-500 font-medium">📈 Experience Level</span>
    <span className="text-[25px] text-lg font-semibold text-gray-900">{basicInfo.experience_level}</span>
  </div>
  <div className="flex flex-col items-center ">
    <span className="text-[15px] text-sm text-gray-500 font-medium">📊 ATS Score</span>
    <span className="text-[25px] text-lg font-semibold text-gray-900">{basicInfo.ats_score}</span>
  </div>
  <div className="flex flex-col items-center">
    <span className="text-[15px] text-sm text-gray-500 font-medium">🛠️ Skills Found</span>
    <span className="text-[25px] text-lg font-semibold text-gray-900">{basicInfo.skills_found.length}/100</span>
  </div>
</div>


    )

}
export default BasicInfo