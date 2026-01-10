import React from 'react';

const LegalPage = ({ title, lastUpdated, children }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 my-8 animate-in fade-in duration-300">
      <h1 className="text-3xl font-bold mb-2 dark:text-white">{title}</h1>
      <p className="text-sm text-slate-500 mb-8 border-b border-slate-100 dark:border-slate-700 pb-6">Last Updated: {lastUpdated}</p>
      
      {/* This CSS applies the "Number Badge" style to the content automatically.
        Any <h3> (e.g. "1. Data Processing") will be stylized.
      */}
      <div className="space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
        {React.Children.map(children, (child) => {
          // If it's a section header (h3), wrap it in the badge style
          if (child.type === 'h3') {
            const text = child.props.children;
            // Split "1. Title" into "1" and "Title"
            const [num, ...rest] = text.includes('.') ? text.split('.') : ['', text];
            const titleText = rest.join('.').trim();

            return (
              <div className="flex gap-4 items-start pt-4">
                <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold text-lg w-10 h-10 flex items-center justify-center rounded-lg shrink-0">
                  {num}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{titleText}</h3>
              </div>
            );
          }
          // Indent paragraphs to align with the text, not the number
          if (child.type === 'p') {
             return <div className="ml-14">{child}</div>;
          }
          return child;
        })}
      </div>
    </div>
  );
};

export default LegalPage;