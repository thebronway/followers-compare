import React, { useState } from 'react';
import FileDrop from '../components/FileDrop';
import { parseFile } from '../utils/parser';
import { TrendingUp, Calendar, UserPlus, UserMinus, RotateCcw, PlayCircle, FileText, Trash2, AlertCircle } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const Trends = () => {
  const [stagedFiles, setStagedFiles] = useState([]);
  const [snapshots, setSnapshots] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const extractDate = (filename, lastModified) => {
    const dateRegex = /\d{4}-\d{2}-\d{2}/;
    const match = filename.match(dateRegex);
    if (match) return new Date(match[0]);
    return new Date(lastModified);
  };

  const handleQueueFiles = (files) => {
    const newFiles = Array.isArray(files) ? files : [files];
    const uniqueFiles = newFiles.filter(
      newF => !stagedFiles.some(existingF => existingF.name === newF.name)
    );
    setStagedFiles(prev => [...prev, ...uniqueFiles]);
  };

  const removeFile = (fileName) => {
    setStagedFiles(prev => prev.filter(f => f.name !== fileName));
  };

  const handleAnalyze = async () => {
    if (stagedFiles.length < 2) {
      alert("Please upload at least 2 files to compare trends.");
      return;
    }

    trackEvent('trends_analysis_started', { fileCount: stagedFiles.length });
    setIsAnalyzing(true);
    try {
      const processed = await Promise.all(
        stagedFiles.map(async (file) => {
          const users = await parseFile(file);
          const dateObj = extractDate(file.name, file.lastModified);
          
          return {
            id: file.name,
            fileName: file.name,
            dateObj: dateObj,
            displayDate: dateObj.toLocaleDateString(),
            users: users,
            count: users.length
          };
        })
      );

      const sorted = processed.sort((a, b) => a.dateObj - b.dateObj);

      const timeline = sorted.map((snap, index) => {
        if (index === 0) return { ...snap, gained: [], lost: [], net: 0 };

        const prev = sorted[index - 1];
        const prevSet = new Set(prev.users.map(u => u.username));
        const currSet = new Set(snap.users.map(u => u.username));

        const gained = snap.users.filter(u => !prevSet.has(u.username));
        const lost = prev.users.filter(u => !currSet.has(u.username));

        return {
          ...snap,
          gained,
          lost,
          net: gained.length - lost.length
        };
      });

      setSnapshots(timeline);
    } catch (err) {
      alert("Error processing files: " + err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearAll = () => {
    trackEvent('trends_reset');
    setStagedFiles([]);
    setSnapshots([]);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header Info */}
      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <TrendingUp className="text-indigo-600 dark:text-indigo-400 shrink-0 mt-1" size={24} />
          <div>
            <h2 className="text-lg font-bold text-indigo-900 dark:text-white">Trend Analysis</h2>
            <div className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1 mt-1">
              <p>
                Upload multiple historical export files to visualize your follower changes over time.
              </p>
              <p className="font-medium">
                <span className="font-bold">Important:</span> Do not modify the structure of your Excel files. Ensure the file name contains the date (YYYY-MM-DD) so we can sort them correctly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- STAGE 1: UPLOAD & QUEUE --- */}
      {snapshots.length === 0 && (
        <div className="space-y-6 p-1">
          <FileDrop
            label="Add Files to Queue" 
            color="indigo"
            allowMultiple={true}
            fileData={stagedFiles}
            fileType="excel" 
            onFileLoaded={handleQueueFiles} 
          />
          
          {stagedFiles.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm animate-in slide-in-from-bottom-2">
              <div className="p-4 bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <h3 className="font-bold dark:text-white flex items-center gap-2">
                  <FileText size={18} /> File Queue ({stagedFiles.length})
                </h3>
                <button onClick={() => setStagedFiles([])} className="text-xs text-red-500 hover:underline">Clear Queue</button>
              </div>
              
              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                {stagedFiles.map((file, idx) => (
                  <div key={idx} className="p-3 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <span className="text-sm font-mono text-slate-600 dark:text-slate-300">{file.name}</span>
                    <button 
                      onClick={() => removeFile(file.name)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                <button 
                  onClick={handleAnalyze}
                  disabled={stagedFiles.length < 2 || isAnalyzing}
                  className={`
                    flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-white shadow-lg transition-all
                    ${stagedFiles.length < 2 
                      ? 'bg-slate-400 cursor-not-allowed opacity-75' 
                      : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98]'
                    }
                  `}
                >
                  {isAnalyzing ? 'Processing...' : (
                    <>
                      <PlayCircle size={20} />
                      Analyze {stagedFiles.length} Files
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- STAGE 2: RESULTS TIMELINE --- */}
      {snapshots.length > 0 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8">
          <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm sticky top-20 z-10">
             <div className="flex items-center gap-2">
               <span className="font-bold text-xl dark:text-white">Timeline Results</span>
               <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full">{snapshots.length} Snapshots</span>
             </div>
             <button 
                onClick={clearAll}
                className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 flex items-center gap-1 bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-lg transition-colors"
             >
               <RotateCcw size={16} /> Start Over
             </button>
          </div>

          <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 space-y-12 pb-12">
            {snapshots.map((snap, idx) => (
              <div key={snap.id} className="relative pl-8">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-6 bg-slate-50 dark:bg-slate-900 py-2">
                  <div className={`w-4 h-4 rounded-full border-2 ${idx === 0 ? 'bg-slate-400 border-slate-200' : 'bg-indigo-500 border-indigo-200'} shadow-sm`}></div>
                </div>

                {/* Card Content */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  
                  {/* Header */}
                  <div className="bg-slate-50 dark:bg-slate-700/50 p-4 flex justify-between items-center border-b border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-indigo-500"/>
                      <span className="font-bold text-lg dark:text-white">{snap.displayDate}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Total Followers</span>
                      <span className="font-mono font-bold text-xl text-slate-800 dark:text-white">{snap.count}</span>
                    </div>
                  </div>

                  {/* Changes (Only if not first item) */}
                  {idx > 0 ? (
                    <div className="p-0 grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-700">
                      {/* Gained Column */}
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                            <UserPlus size={18} />
                            <span className="font-bold">Gained</span>
                          </div>
                          <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-bold">+{snap.gained.length}</span>
                        </div>
                        {snap.gained.length > 0 ? (
                          <div className="max-h-48 overflow-y-auto pr-2 space-y-1 custom-scrollbar">
                            {snap.gained.map(u => (
                              <div key={u.username} className="text-sm py-1.5 px-2 rounded hover:bg-emerald-50 dark:hover:bg-emerald-900/20 truncate flex justify-between group">
                                <span className="text-slate-700 dark:text-slate-300 font-medium">{u.username}</span>
                                <a href={u.url} target="_blank" rel="noreferrer" className="text-emerald-500 opacity-0 group-hover:opacity-100 text-xs hover:underline">View</a>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-slate-400 italic py-2">No new followers in this period.</div>
                        )}
                      </div>

                      {/* Lost Column */}
                      <div className="p-5 bg-red-50/30 dark:bg-red-900/5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                            <UserMinus size={18} />
                            <span className="font-bold">Lost</span>
                          </div>
                          <span className="bg-rose-100 text-rose-800 text-xs px-2 py-0.5 rounded-full font-bold">-{snap.lost.length}</span>
                        </div>
                        
                        {/* DISCLAIMER FOR LOST COLUMN */}
                        <div className="mb-3 text-xs bg-rose-100 text-rose-800 p-2 rounded flex items-start gap-2 border border-rose-200">
                          <AlertCircle size={14} className="shrink-0 mt-0.5" />
                          <span>Note: Users here may have <strong>deleted</strong> or <strong>deactivated</strong> their accounts.</span>
                        </div>

                        {snap.lost.length > 0 ? (
                          <div className="max-h-48 overflow-y-auto pr-2 space-y-1 custom-scrollbar">
                            {snap.lost.map(u => (
                              <div key={u.username} className="text-sm py-1.5 px-2 rounded hover:bg-rose-50 dark:hover:bg-rose-900/20 truncate flex justify-between group">
                                <span className="text-slate-700 dark:text-slate-300 font-medium">{u.username}</span>
                                <a href={u.url} target="_blank" rel="noreferrer" className="text-rose-500 opacity-0 group-hover:opacity-100 text-xs hover:underline">View</a>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-slate-400 italic py-2">No followers lost!</div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-slate-50/50 dark:bg-slate-800">
                      <p className="text-slate-500 dark:text-slate-400 italic">Timeline Baseline • {snap.count} Followers</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Trends;