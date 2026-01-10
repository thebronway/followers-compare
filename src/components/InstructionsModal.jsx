import React from 'react';
import { X, FileJson, CheckCircle, ExternalLink, ArrowRight, MousePointerClick } from 'lucide-react';

const InstructionsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-indigo-50 dark:bg-indigo-900/20">
          <div>
            <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">How to get your data</h2>
            <p className="text-indigo-600 dark:text-indigo-300 text-sm">Follow these steps exactly to ensure the file works.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8 text-slate-600 dark:text-slate-300 max-h-[60vh] overflow-y-auto custom-scrollbar">
          
          {/* Step 1: Request */}
          <div className="flex gap-4">
            <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 h-fit rounded-lg text-indigo-600 dark:text-indigo-400 font-bold text-xl shrink-0">1</div>
            <div className="space-y-4 w-full">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Request Export</h3>
                <a 
                  href="https://accountscenter.instagram.com/info_and_permissions/dyi/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold hover:underline mt-1 mb-2"
                >
                  Click here to open Instagram Data Download
                  <ExternalLink size={16} />
                </a>
              </div>

              {/* Step-by-step UI Flow */}
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700 text-sm space-y-4">
                
                <div className="flex gap-3">
                  <div className="font-bold text-slate-400">A.</div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Start</p>
                    <p>Click <strong>Create export</strong> and select your Instagram account.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="font-bold text-slate-400">B.</div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Choose location</p>
                    <p>Select <strong>Download to device</strong>.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="font-bold text-slate-400">C.</div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Select information</p>
                    <p>Click <strong>Customize information</strong>. Uncheck everything else.</p>
                    <p className="mt-1">Find <strong>Connections</strong> and select only <strong className="text-indigo-600 dark:text-indigo-400">Followers and following</strong>.</p>
                    <p className="text-xs text-slate-500 mt-1 italic">Selecting only this option makes the download much faster.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="font-bold text-slate-400">D.</div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Final Settings (Crucial)</p>
                    <div className="grid grid-cols-1 gap-2 mt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">Date range:</span>
                        <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-200 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-800 font-bold text-xs">
                          <span className="line-through opacity-50">Last year</span>
                          <ArrowRight size={10} />
                          <span>All time</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">Format:</span>
                        <span className="font-medium text-slate-900 dark:text-slate-100">JSON</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Step 2: Download */}
          <div className="flex gap-4">
            <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 h-fit rounded-lg text-indigo-600 dark:text-indigo-400 font-bold text-xl shrink-0">2</div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">Download & Unzip</h3>
              <p className="text-sm">Instagram will email you when it's ready. Download the zip file and extract it (unzip it).</p>
            </div>
          </div>

          {/* Step 3: Upload */}
          <div className="flex gap-4">
            <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 h-fit rounded-lg text-indigo-600 dark:text-indigo-400 font-bold text-xl shrink-0">3</div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">Upload specific files</h3>
              <p className="text-sm mb-2">Look inside the <span className="font-mono bg-slate-100 dark:bg-slate-700 px-1 rounded">connections</span> folder.</p>
              <ul className="text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <FileJson size={16} className="text-slate-400" />
                  <span><strong>Followers:</strong> <code className="text-red-500 bg-red-50 dark:bg-red-900/10 px-1 rounded">followers_1.json</code></span>
                </li>
                <li className="flex items-center gap-2">
                  <FileJson size={16} className="text-slate-400" />
                  <span><strong>Following:</strong> <code className="text-red-500 bg-red-50 dark:bg-red-900/10 px-1 rounded">following.json</code></span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20"
          >
            <CheckCircle size={18} />
            I have the files
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;