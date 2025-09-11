
const SubmitButtons=({onAnalyze})=>{
    return(

<div className="submitButtons flex gap-4 mt-4">
        <button
                type="button"
                onClick={onAnalyze}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <span role="img" aria-label="search">🔍</span>
                Analyze My Resume
            </button>
            <button type="button"
            className="w-full bg-white border border-gray-300 text-blue-600 font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
           
            >
                <span role="img" aria-label="clear">🗑️</span>
                    Clear
                </button>
           
            
            
            

         </div>
    )


}
export default SubmitButtons