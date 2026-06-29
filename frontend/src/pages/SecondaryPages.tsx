import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Users, Award, Settings as SettingsIcon, ShieldCheck, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const About: React.FC = () => {
  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold">
          Our Mission
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Pioneering Autonomous Road Safety</h1>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          RoadSense AI was built from the ground up to demonstrate how pure Artificial Neural Networks (ANN) can classify traffic symbols in real time with high precision, bypassing heavy convolutional architectures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 text-center space-y-3">
          <ShieldAlert className="w-10 h-10 text-blue-500 mx-auto" />
          <h3 className="text-lg font-bold">Zero CNN Reliance</h3>
          <p className="text-xs text-slate-500">Pure dense vector multiplication delivers predictable latency profiles essential for hardware integration.</p>
        </div>
        <div className="glass-card p-6 text-center space-y-3">
          <Award className="w-10 h-10 text-indigo-500 mx-auto" />
          <h3 className="text-lg font-bold">GTSRB Trained</h3>
          <p className="text-xs text-slate-500">Benchmark training on 50,000+ authentic European road signs guarantees robust generalization.</p>
        </div>
        <div className="glass-card p-6 text-center space-y-3">
          <ShieldCheck className="w-10 h-10 text-green-500 mx-auto" />
          <h3 className="text-lg font-bold">Driver Safety First</h3>
          <p className="text-xs text-slate-500">Every classification is coupled with actionable recommendations to prevent roadway hazards.</p>
        </div>
      </div>
    </div>
  );
};

export const Team: React.FC = () => {
  const members = [
    { name: "Housabai Bhosale", desc: "backend developer" },
    { name: "Aishwarya Andodagi", desc: "frontend developer" },
  ];

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-2">
          <Users className="w-8 h-8 text-blue-500" /> Meet the Engineering Team
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">The developers behind RoadSense AI.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {members.map(m => (
          <div key={m.name} className="glass-card p-8 text-center space-y-3">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{m.name}</h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 capitalize font-medium">{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Profile: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="py-12 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="glass-card p-8 space-y-6">
        <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-black">
            {user?.full_name?.charAt(0) || "U"}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{user?.full_name || "Guest Account"}</h1>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1"><Mail className="w-3.5 h-3.5" /> {user?.email || "anonymous@roadsense.ai"}</p>
          </div>
          <span className="ml-auto px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 font-bold text-xs uppercase">
            {user?.role || "User"}
          </span>
        </div>

        <div className="space-y-4 text-sm">
          <h3 className="font-bold text-slate-900 dark:text-white">Account Details</h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl glass-panel"><span className="text-slate-500 block">User ID</span><strong className="text-sm">#{user?.id || 101}</strong></div>
            <div className="p-3 rounded-xl glass-panel"><span className="text-slate-500 block">Status</span><strong className="text-sm text-green-500">Active SaaS Subscription</strong></div>
          </div>
        </div>

        <button onClick={logout} className="btn-secondary w-full text-red-500 hover:text-red-600 py-3">Sign Out of Platform</button>
      </div>
    </div>
  );
};

export const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="py-12 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="glass-card p-8 space-y-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-blue-500" /> Platform Preferences
        </h1>

        <div className="space-y-4 divide-y divide-slate-200 dark:divide-slate-800 text-sm">
          <div className="flex items-center justify-between py-4">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">Dark / Light Interface Mode</h4>
              <p className="text-xs text-slate-500">Toggle glassmorphic visual themes for day or night operation.</p>
            </div>
            <button onClick={toggleTheme} className="btn-primary px-4 py-2 text-xs">
              Current: {theme.toUpperCase()}
            </button>
          </div>

          <div className="flex items-center justify-between py-4">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">Real-Time Driver Audio Alerts</h4>
              <p className="text-xs text-slate-500">Emit warning chime upon classifying stop or yield signs.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 font-bold text-xs">Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="text-8xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">404</div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Roadway Not Found</h2>
      <p className="text-sm text-slate-500 max-w-md">The requested route or dashboard page does not exist in the RoadSense AI directory.</p>
      <Link to="/" className="btn-primary px-6 py-3">Return to Safety (Home) <ArrowRight className="w-4 h-4" /></Link>
    </div>
  );
};
