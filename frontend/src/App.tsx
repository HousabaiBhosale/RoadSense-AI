import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Predict } from './pages/Predict';
import { Analytics } from './pages/Analytics';
import { ModelPerformance } from './pages/ModelPerformance';
import { DatasetManager } from './pages/DatasetManager';
import { ModelTraining } from './pages/ModelTraining';
import { History } from './pages/History';
import { Login, Register, ForgotPassword } from './pages/AuthPages';
import { About, Team, Profile, Settings, NotFound } from './pages/SecondaryPages';
import { AnimatedBackground } from './components/AnimatedBackground';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 relative">
            <AnimatedBackground />
            <Navbar />
            <main className="flex-grow relative z-10">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/predict" element={<Predict />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/model" element={<ModelPerformance />} />
                <Route path="/dataset" element={<DatasetManager />} />
                <Route path="/training" element={<ModelTraining />} />
                <Route path="/history" element={<History />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/about" element={<About />} />
                <Route path="/team" element={<Team />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
