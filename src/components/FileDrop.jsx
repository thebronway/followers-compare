import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, CheckCircle, AlertTriangle, X, Files } from 'lucide-react';

const FileDrop = ({ label, onFileLoaded, fileData, fileName, color = "indigo", fileType, allowMultiple = false }) => {
  const [error, setError] = useState(null);
  
  const onDrop = useCallback(acceptedFiles => {
    setError(null);
    
    if (!acceptedFiles || acceptedFiles.length === 0) return;

    const validFiles = [];
    
    // Strict Validation Loop
    for (const file of acceptedFiles) {
      const name = file.name.toLowerCase();
      
      // 1. Excel Check
      const isExcel = name.endsWith('.xlsx') || name.endsWith('.csv');
      if (fileType === 'excel' && !isExcel) {
         setError("Invalid file. Please upload an Excel (.xlsx) file.");
         return;
      }

      // 2. Following Check (Must have 'following' in name)
      if (fileType === 'following') {
        if (!name.includes('following')) {
            setError(`Invalid file: "${file.name}". Please upload 'following.json' or 'following.html'.`);
            return;
        }
      }
      
      // 3. Followers Check (Must have 'follower' in name)
      if (fileType === 'followers') {
        if (!name.includes('follower')) { // Matches 'followers' or 'follower'
            setError(`Invalid file: "${file.name}". Please upload 'followers_1.json' or 'followers_1.html'.`);
            return;
        }
      }

      validFiles.push(file);
    }

    if (allowMultiple) {
      onFileLoaded(validFiles);
    } else {
      onFileLoaded(validFiles[0]);
    }

  }, [onFileLoaded, fileType, allowMultiple]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: allowMultiple 
  });

  const hasData = (Array.isArray(fileData) && fileData.length > 0) || (fileData && fileData.length > 0);

  const colorClasses = {
    indigo: "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10",
    pink: "border-pink-500 bg-pink-50 dark:bg-pink-900/10",
  }[color] || colorClasses.indigo;

  return (
    <div className="w-full relative">
      <div 
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-xl p-6 transition-all cursor-pointer text-center group h-64 flex flex-col items-center justify-center
          ${isDragActive ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-slate-300 dark:border-slate-600 hover:border-slate-400'}
          ${hasData ? colorClasses : 'bg-white dark:bg-slate-800'}
          ${error ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        {/* Error State */}
        {error && (
          <div className="absolute top-4 left-4 right-4 bg-red-100/90 backdrop-blur-sm text-red-700 px-3 py-2 rounded-lg text-sm flex items-center justify-between z-20 border border-red-200 shadow-sm animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="shrink-0" />
              <span className="font-medium text-left">{error}</span>
            </div>
            <button onClick={(e) => { e.stopPropagation(); setError(null); }} className="p-1 hover:bg-red-200 rounded-full transition-colors"><X size={14}/></button>
          </div>
        )}

        <div className="flex flex-col items-center justify-center space-y-4">
          {hasData ? (
            <>
              <div className={`p-4 rounded-full ${color === 'pink' ? 'bg-pink-100 text-pink-600' : 'bg-indigo-100 text-indigo-600'}`}>
                {allowMultiple ? <Files className="w-8 h-8" /> : <CheckCircle className="w-8 h-8" />}
              </div>
              <div>
                <p className="font-bold text-lg text-slate-900 dark:text-white break-all px-4">
                  {allowMultiple ? `${fileData.length} Files Loaded` : (fileName || "File Loaded")}
                </p>
                {!allowMultiple && <p className="text-sm opacity-75">{fileData.length} users found</p>}
              </div>
              <span className="text-xs uppercase tracking-wide font-semibold opacity-50">
                {allowMultiple ? "Click to add more" : "Click to replace"}
              </span>
            </>
          ) : (
            <>
              <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-full group-hover:scale-110 transition-transform">
                <UploadCloud className="w-8 h-8 text-slate-500 dark:text-slate-400" />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  {label}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {allowMultiple ? "Upload multiple Excel exports" : "Drag & Drop or Click to Select"}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileDrop;