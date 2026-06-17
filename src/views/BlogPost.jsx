import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronLeft, ShieldCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { blogData } from '../data/blogData';

const BlogPost = () => {
  const { slug } = useParams();
  const article = blogData.find(a => a.slug === slug);

  if (!article) return <Navigate to="/blog" replace />;

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 my-4 animate-in fade-in duration-300">
      <Helmet>
        <title>{article.title} - FollowersCompare</title>
        <meta name="description" content={article.intro} />
      </Helmet>

      <Link to="/blog" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors">
        <ChevronLeft size={16} className="mr-1" /> Back to Blog
      </Link>

      <div className="mb-8">
        <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {article.pillar}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mt-4 text-slate-900 dark:text-white leading-tight">
          {article.title}
        </h1>
      </div>

      <div className="space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
        {/* Intro */}
        <p>{article.intro}</p>

        {/* Core Concepts */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-100 dark:border-slate-700">
          <h3 className="font-bold text-slate-900 dark:text-white text-xl mb-4">Core Concepts</h3>
          <ul className="space-y-3">
            {article.coreConcepts.map((concept, i) => (
              <li key={i}>
                <strong className="text-indigo-600 dark:text-indigo-400">{concept.term}:</strong> {concept.def}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Body */}
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8">{article.bodyHeading}</h2>
        <p>{article.bodyText}</p>

        {/* The Safe Solution */}
        <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
          <h3 className="font-bold text-emerald-900 dark:text-emerald-400 text-xl mb-3 flex items-center gap-2">
            <ShieldCheck size={24} /> The Safe Solution
          </h3>
          <p className="text-emerald-800 dark:text-emerald-200">{article.safeSolution}</p>
        </div>

        {/* FAQ */}
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">FAQ</h2>
        <div className="space-y-6">
          {article.faq.map((item, i) => (
            <div key={i}>
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">{item.q}</h4>
              <p className="text-slate-600 dark:text-slate-400">{item.a}</p>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <hr className="border-slate-200 dark:border-slate-700 my-8" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Conclusion</h2>
        <p>{article.conclusion}</p>
      </div>
    </div>
  );
};

export default BlogPost;