import React, { useState, useEffect } from 'react';
import { ShieldCheck, Moon, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isLegal = ['/privacy', '/terms', '/about', '/disclaimer'].includes(location.pathname);

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans flex flex-col">
      
      {/* Navbar */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">FollowersCompare</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {/* Navigation Slider */}
            <div className="hidden md:flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
              <Link to="/" className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${location.pathname === '/' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'}`}>
                Compare
              </Link>
              <Link to="/trends" className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${location.pathname === '/trends' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'}`}>
                Trends
              </Link>
            </div>

            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <span className="hidden sm:inline-block text-xs font-medium px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-800">
              🔒 Local & Secure
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 flex-grow w-full">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;