import React from 'react';

const StatsCard = ({ title, count, total, color, icon: Icon, onClick, active }) => {
  const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
  
  const colors = {
    green: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
    red: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800",
    amber: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  };

  return (
    <button 
      onClick={onClick}
      className={`
        relative flex flex-col p-5 rounded-xl border-2 text-left transition-all w-full
        ${active ? 'ring-2 ring-offset-2 ring-indigo-500 scale-[1.02]' : 'hover:scale-[1.01]'}
        ${colors[color] || colors.green}
      `}
    >
      <div className="flex items-center justify-between w-full mb-3">
        <span className="text-sm font-bold uppercase tracking-wider opacity-80">{title}</span>
        {Icon && <Icon size={20} />}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-black">{count}</span>
        <span className="text-sm font-medium mb-1 opacity-75">{percentage}%</span>
      </div>
    </button>
  );
};

export default StatsCard;