import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Globe, Share2, MessageSquare, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-200 dark:border-slate-800">
          
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                RoadSense AI
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Production-ready intelligent road sign recognition platform powered by Pure Artificial Neural Networks (ANN) trained on GTSRB.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors"><Globe className="w-5 h-5" /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors"><Share2 className="w-5 h-5" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors"><MessageSquare className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
              <li><Link to="/predict" className="hover:text-blue-500 transition-colors">Sign Predictor</Link></li>
              <li><Link to="/dashboard" className="hover:text-blue-500 transition-colors">Live Dashboard</Link></li>
              <li><Link to="/analytics" className="hover:text-blue-500 transition-colors">Analytics & Trends</Link></li>
              <li><Link to="/history" className="hover:text-blue-500 transition-colors">Scan History</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-4">AI Engine</h4>
            <ul className="space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
              <li><Link to="/model" className="hover:text-blue-500 transition-colors">ANN Architecture</Link></li>
              <li><Link to="/dataset" className="hover:text-blue-500 transition-colors">GTSRB Dataset (43 Classes)</Link></li>
              <li><Link to="/model" className="hover:text-blue-500 transition-colors">Confusion Matrix</Link></li>
              <li><Link to="/model" className="hover:text-blue-500 transition-colors">Training Curves</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
              <li><Link to="/about" className="hover:text-blue-500 transition-colors">About Us</Link></li>
              <li><Link to="/team" className="hover:text-blue-500 transition-colors">Team</Link></li>
              <li><Link to="/login" className="hover:text-blue-500 transition-colors">Account Login</Link></li>
              <li><Link to="/register" className="hover:text-blue-500 transition-colors">Register SaaS</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} RoadSense AI. All rights reserved. Built with Pure ANN.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Engineered with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Autonomous Driver Safety
          </p>
        </div>
      </div>
    </footer>
  );
};
