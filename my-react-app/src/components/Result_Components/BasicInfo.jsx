const BasicInfo=({basicInfo})=>{
    
    return(
        <div className="flex justify-between gap-8 mt-6">
  <div className="flex flex-col items-center">
    <span className="text-sm text-gray-500">Suggested Role</span>
    <span className="text-xl font-semibold">{basicInfo.suggested_role}</span>
  </div>
  <div className="flex flex-col items-center">
    <span className="text-sm text-gray-500">Experience Level</span>
    <span className="text-xl font-semibold">{basicInfo.experience_level}</span>
  </div>
  <div className="flex flex-col items-center">
    <span className="text-sm text-gray-500">ATS Score</span>
    <span className="text-xl font-semibold">{basicInfo.ats_score}</span>
  </div>
  <div className="flex flex-col items-center">
    <span className="text-sm text-gray-500">Skills Found</span>
    <span className="text-xl font-semibold">{basicInfo.skills_found.length}</span>
  </div>
</div>


    )

}
export default BasicInfo