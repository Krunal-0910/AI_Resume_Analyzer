const DetailedInfo=({results})=>{
    const key_strength=results.strengths
    console.log(key_strength)
    
    return(
      
  <div className="bg-slate-100 min-h-screen p-8 mt-8">
      {/* First Row: Strengths + Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div >
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            <span>💪</span> Key Strengths
          </h2>
          <div className="mt-8 space-y-7">
            {results.strengths.map((s, i) => (
              <div
                key={i}
                className="bg-white shadow rounded-xl p-3 border-l-4 border-green-500"
              >
                <span className="font-semibold text-gray-700">
                  #{i + 1} {s}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h2 className="text-[22px] font-bold flex items-center gap-2">
            <span>📊</span> Recommendations for Improvement
          </h2>
          <div className="mt-8 space-y-3">
            {results.recommendations.map((r, i) => (
              <div
                key={i}
                className="bg-yellow-50 border-l-4 border-red-400 shadow rounded-xl p-4"
              >
                <span className="font-semibold text-gray-600">
                  📌 Recommendation #{i + 1}
                </span>
                <p className="text-gray-700 mt-1 font-mono font-semibold">{r}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Row: Technical Skills */}
      <div className="mt-10">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
          <span>🛠️</span> Technical Skills
        </h2>
        <div className="flex flex-wrap gap-3">
          {results.skills.map((skill, i) => (
            <span
              key={i}
              className=" font-mono bg-yellow-50 border border-yellow-300 text-grey-500 px-4 py-2 rounded-full shadow-sm font-semibold"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DetailedInfo