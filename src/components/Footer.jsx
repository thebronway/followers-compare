import React from 'react';
import { Link } from 'react-router-dom';
import packageJson from '../../package.json';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm">
        <p className="mb-4">No data is sent to any server. All processing happens in your browser.</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link to="/about" className="hover:text-indigo-500 transition-colors">About</Link>
          <Link to="/privacy" className="hover:text-indigo-500 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-indigo-500 transition-colors">Terms of Service</Link>
          <Link to="/disclaimer" className="hover:text-indigo-500 transition-colors">Disclaimer</Link>
        </div>
        <p className="mt-6 text-xs opacity-50">
          &copy; {new Date().getFullYear()} FollowersCompare | v{packageJson.version}
        </p>
      </div>
    </footer>
  );
};

export default Footer;