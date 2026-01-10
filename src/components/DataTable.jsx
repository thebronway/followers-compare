import React, { useState, useMemo } from 'react';
import { Search, ExternalLink } from 'lucide-react';

const DataTable = ({ data, title }) => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search) return data;
    return data.filter(u => u.username.toLowerCase().includes(search.toLowerCase()));
  }, [data, search]);

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm flex flex-col h-[600px]">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
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

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2">
        {filtered.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-400">
            No users found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {filtered.map((user) => (
              <div 
                key={user.username} 
                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
              >
                <div className="flex flex-col overflow-hidden">
                  <span className="font-medium truncate text-slate-800 dark:text-slate-200">{user.username}</span>
                  <span className="text-xs text-slate-400">{user.dateStr}</span>
                </div>
                <a 
                  href={user.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-primary hover:bg-indigo-50 dark:hover:bg-slate-600 rounded-md transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;