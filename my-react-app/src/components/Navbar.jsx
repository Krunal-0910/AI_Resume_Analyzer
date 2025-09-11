const Navbar = () => {
  return (
    <div className="h-screen w-64 bg-gray-100 text-gray-100 flex flex-col p-6 shadow-lg">
      {/* Logo / App Name */}
      <div className="text-2x1 text-black font-bold mb-8">
        Resume Analyzer
      </div>

      {/* Info Section */}
      <div className="space-y-6 text-sm leading-relaxed text-2x1 text-black font-semibold">
        <div>
          <h2 className="text-lg font-semibold text-blue-400 mb-2">About</h2>
          <p className="text-2x1 text-black font-semibold">
            This tool analyzes your resume PDF using AI to extract strengths, weaknesses, 
            and job readiness insights.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-blue-400 mb-2">How to Use</h2>
          <ul className="list-disc list-inside space-y-1 text-2x1 text-black font-semibold font-mono text-[16px]">
            <li className="list-none">1.Upload your resume in PDF format.</li>
            <li className="list-none">2.Click to process the file.</li>
            <li className="list-none">3.View structured insights in the results panel.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-blue-400 mb-2">Model Info</h2>
          <p>
            Powered by <span className="font-medium">Gemini AI</span>.  
            Optimized for resume parsing and professional analysis.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-blue-400 mb-2">Tips</h2>
          <p>
            Use a clean PDF export of your resume (no scans or images).  
            Highlight achievements, skills, and quantifiable results for best analysis.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto text-xs text-gray-500">
        © 2025 Resume Analyzer
      </div>
    </div>
  );
};

export default Navbar;
