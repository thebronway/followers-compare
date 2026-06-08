import React, { useState, useMemo, useEffect } from 'react';
import { Search, ExternalLink, ChevronLeft, ChevronRight, Ghost, Undo2, ChevronDown } from 'lucide-react';

const DataTable = ({ data, title, hiddenUsers = [], onToggleDeactivated }) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeactivated, setShowDeactivated] = useState(false);
  const itemsPerPage = 50;

  // Optimize filtering with a Set to prevent freezing on very large lists
  const hiddenSet = useMemo(() => new Set(hiddenUsers), [hiddenUsers]);
  
  const activeData = useMemo(() => data.filter(u => !hiddenSet.has(u.username)), [data, hiddenSet]);
  const deactivatedData = useMemo(() => data.filter(u => hiddenSet.has(u.username)), [data, hiddenSet]);

  // Filter the active dataset
  const filtered = useMemo(() => {
    if (!search) return activeData;
    return activeData.filter(u => u.username.toLowerCase().includes(search.toLowerCase()));
  }, [activeData, search]);

  // Reset to page 1 whenever the search term or data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, data]);

  // Calculate Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm flex flex-col h-[800px]">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 shrink-0">
        <h3 className="font-semibold text-lg">{title} <span className="text-slate-400 text-sm">({filtered.length})</span></h3>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search username..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>
      </div>

      {/* List (Scrollable Area) */}
      <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
        {currentData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-400">
            {search ? 'No users match your search.' : 'No users found.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {currentData.map((user) => (
              <div 
                key={user.username} 
                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
              >
                <div className="flex flex-col overflow-hidden">
                  <span className="font-medium truncate text-slate-800 dark:text-slate-200">{user.username}</span>
                  <span className="text-xs text-slate-400">{user.dateStr}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (onToggleDeactivated) onToggleDeactivated(user.username);
                    }}
                    title="Mark as deactivated/deleted"
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-md transition-colors"
                  >
                    <Ghost size={16} />
                  </button>
                  <a 
                    href={user.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title="Open Instagram Profile"
                    className="p-2 text-slate-400 hover:text-primary hover:bg-indigo-50 dark:hover:bg-slate-600 rounded-md transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      {filtered.length > 0 && (
        <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between shrink-0 text-sm">
          <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">
            Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(startIndex + itemsPerPage, filtered.length)}</span> of {filtered.length}
          </span>
          
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <button 
              type="button"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-md hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            
            <span className="font-medium text-slate-700 dark:text-slate-200 min-w-[3rem] text-center">
              {currentPage} / {Math.max(1, totalPages)}
            </span>

            <button 
              type="button"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1.5 rounded-md hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Deactivated Users Section */}
      {deactivatedData.length > 0 && (
        <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 shrink-0">
          <button 
            type="button"
            onClick={() => setShowDeactivated(!showDeactivated)}
            className="w-full p-3 flex items-center justify-between text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors outline-none focus:bg-slate-100 dark:focus:bg-slate-700/50"
          >
            <div className="flex items-center gap-2">
              <Ghost size={16} className="text-slate-400" />
              <span>Hidden / Deactivated Accounts ({deactivatedData.length})</span>
            </div>
            {showDeactivated ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          
          {showDeactivated && (
            <div className="p-3 max-h-48 overflow-y-auto custom-scrollbar bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {deactivatedData.map((user) => (
                  <div 
                    key={user.username} 
                    className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50"
                  >
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-medium truncate text-slate-500 dark:text-slate-400 opacity-75 line-through">{user.username}</span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (onToggleDeactivated) onToggleDeactivated(user.username);
                        }}
                        title="Unhide account"
                        className="p-1.5 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-md transition-colors"
                      >
                        <Undo2 size={16} />
                      </button>
                      <a 
                        href={user.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        title="Open Instagram Profile"
                        className="p-1.5 text-slate-400 hover:text-primary hover:bg-indigo-50 dark:hover:bg-slate-600 rounded-md transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DataTable;