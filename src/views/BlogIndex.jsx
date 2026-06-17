import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { blogData } from '../data/blogData';

const BlogIndex = () => {
  // Group articles by Pillar
  const groupedArticles = blogData.reduce((acc, article) => {
    if (!acc[article.pillar]) acc[article.pillar] = [];
    acc[article.pillar].push(article);
    return acc;
  }, {});

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Info */}
      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 p-6 rounded-xl flex items-start gap-4">
        <BookOpen className="text-indigo-600 dark:text-indigo-400 shrink-0 mt-1" size={24} />
        <div>
          <h2 className="text-lg font-bold text-indigo-900 dark:text-white">FollowersCompare Blog & Guides</h2>
          <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">
            Learn how to protect your privacy, understand social algorithms, and manage your digital relationships securely.
          </p>
        </div>
      </div>

      {/* Pillars Map */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(groupedArticles).map(([pillar, articles], index) => (
          <div key={index} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-100 dark:border-slate-700">
              {pillar}
            </h3>
            <ul className="space-y-3">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link 
                    to={`/blog/${article.slug}`}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline font-medium block"
                  >
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogIndex;