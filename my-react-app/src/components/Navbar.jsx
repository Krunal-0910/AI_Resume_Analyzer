const Navbar = () => {
  return (
    <div className=" w-64 bg-gray-100 text-gray-100 flex flex-col p-6 shadow-lg">
      {/* Logo / App Name */}
      <div className="text-[20px] text-black font-bold mb-8">
        Info
      </div>

      {/* Info Section */}
      <div className="space-y-6 text-sm leading-relaxed text-2x1 text-black font-semibold">
        <div>
          <h2 className="text-lg font-bold text-blue-600 mb-2 font-sans">About</h2>
          <p className="text-[16px] text-black font-mono">
            This tool analyzes your resume PDF using AI to extract strengths, weaknesses, 
            and job readiness insights.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-blue-600 mb-2 font-sans">How to Use</h2>
          <ul className="list-disc list-inside space-y-1 ">
            <li className="list-none text-black font-mono text-[16px]">1.Upload your resume in PDF format.</li>
            <li className="list-none text-black  font-mono text-[16px]">2.Click to process the file.</li>
            <li className="list-none text-black font-mono text-[16px]">3.View structured insights in the results panel.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold text-blue-600 mb-2 font-sans">Model Info</h2>
          <p className="text-[16px] text-black font-mono">
            Powered by <span className="font-bold text-blue-500 text-[18px]">Gemini-2.0-flash</span>.  
            Optimized for resume parsing and professional analysis.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-blue-600 mb-2 font-sans">Tips</h2>
          <p className="text-[16px] font-mono">
            Use a clean PDF export of your resume (no scans or images).  
            Highlight achievements, skills, and quantifiable results for best analysis.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 text-xs text-gray-500">
        © 2025 Resume Analyzer
      </div>
    </div>
  );
};

export default Navbar;
