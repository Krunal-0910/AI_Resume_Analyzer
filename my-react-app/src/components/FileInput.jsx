import { useRef } from "react";
import { useState } from "react";
import Api from "./Api";

const FileInput = ({textareaRef,selectedFile,setSelectedFile}) => {
    const fileInputRef = useRef();

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setSelectedFile(file);
            const formData  = new FormData()

            formData.append('resume', file)
            console.log("FormData",formData)
            textareaRef.current=formData
            console.log(formData.get('resume'))
            
        } else {
            setSelectedFile(null);
        }
    };


    return (
        <div className="w-full mt-4">
            <div className="flex items-center mb-2">
                <label className="font-medium mr-2">Upload a file</label>
                <div className="relative group">
                    <span className="text-gray-400 cursor-pointer text-lg">?</span>
                    <div className="absolute left-6 top-0 z-10 hidden group-hover:block bg-white border border-gray-300 rounded shadow-md px-3 py-2 text-sm text-gray-700 w-56">
                        Only .doc, .docx, or .pdf files are accepted. Limit 200MB per file. Drag and drop or use Browse.
                    </div>
                </div>
            </div>
            <div className="bg-gray-100 rounded-xl flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                    <span className="text-2xl text-gray-400">📄</span>
                    <div>
                        <div className="font-medium text-gray-700">Drag and drop file here</div>
                        <div className="text-xs text-gray-400">Limit 200MB per file &bull; DOC, DOCX, PDF</div>
                    </div>
                </div>
                <button
                    type="button"
                    className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-blue-600 font-medium hover:bg-gray-200 transition-colors"
                    onClick={() => fileInputRef.current.click()}
                >
                    Browse files
                </button>
                <input
                    type="file"
                    accept=".doc,.docx,.pdf"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
            {/* Selected file box */}
            {selectedFile && (
                <div className="mt-4 bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-between">
                    <span className="text-gray-700">{selectedFile.name}</span>
                       
                </div>
            )}
        </div>
    );}
       

export default FileInput;