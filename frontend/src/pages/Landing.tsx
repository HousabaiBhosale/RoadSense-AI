import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, Cpu, Zap, Eye, ArrowRight, Layers, Lock, BarChart3 } from 'lucide-react';

export const Landing: React.FC = () => {
  const features = [
    {
      icon: Cpu,
      title: 'Pure ANN Architecture',
      description: 'Engineered exclusively with multi-layer Dense artificial neural networks (64x64 -> 512 -> 256 -> 128) without relying on heavy CNNs or Transformers.'
    },
    {
      icon: Zap,
      title: 'Ultra-Fast Sub-15ms Inference',
      description: 'Optimized vector multiplication delivers real-time prediction speeds vital for autonomous vehicle safety and instant driver alerting.'
    },
    {
      icon: ShieldAlert,
      title: 'GTSRB 43-Class Benchmark',
      description: 'Trained rigorously on over 50,000 real-world traffic sign images covering regulatory, warning, and priority road symbols.'
    },
    {
      icon: Eye,
      title: 'Complete AI Explainability',
      description: 'Inspect top-5 softmax confidence breakdowns, confusion matrices, training loss curves, and per-class precision metrics live.'
    },
    {
      icon: Layers,
      title: 'Actionable Driver Recommendations',
      description: 'Instantly translates predicted road signs into practical driving advice (e.g. speed reduction, intersection right-of-way warnings).'
    },
    {
      icon: Lock,
      title: 'Enterprise SaaS Security',
      description: 'Features JSON Web Token (JWT) authentication, bcrypt password hashing, and role-based access control backed by PostgreSQL.'
    }
  ];

  const workflowSteps = [
    { num: '01', title: 'Image Capture & Upload', desc: 'Driver dashcam or manual drag-and-drop feeds traffic sign images into the platform.' },
    { num: '02', title: 'Bilinear 64x64 Normalization', desc: 'Preprocesses raw pixels into standard [0,1] normalized float tensor arrays.' },
    { num: '03', title: 'Pure ANN Forward Pass', desc: 'Computes dense activations across 512, 256, and 128 neuron layers with dropout regularization.' },
    { num: '04', title: 'Safety Alert & Analytics', desc: 'Outputs top predictions with driver recommendations and logs data to PostgreSQL history.' }
  ];

  return (
    <div className="overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse" />
          
          {/* Moving Floating Geometric Vector Shapes */}
          <motion.div
            animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-16 left-[10%] w-20 h-20 border-4 border-red-500/20 rounded-3xl rotate-12 flex items-center justify-center text-red-500/20 font-extrabold text-2xl shadow-xl"
          >
            STOP
          </motion.div>
          <motion.div
            animate={{ y: [0, 40, 0], rotate: [0, -15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 left-[15%] w-24 h-24 border-4 border-blue-500/20 rounded-full flex items-center justify-center text-blue-500/20 font-extrabold text-xl shadow-xl"
          >
            50
          </motion.div>
          <motion.div
            animate={{ y: [0, -25, 0], rotate: [45, 60, 45] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-1/3 right-[12%] w-20 h-20 border-4 border-yellow-500/20 rotate-45 flex items-center justify-center text-yellow-500/20 font-extrabold shadow-xl"
          />
          <motion.div
            animate={{ x: [-20, 20, -20], y: [0, -20, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-32 right-[18%] w-16 h-16 border-4 border-purple-500/20 rounded-full flex items-center justify-center text-purple-500/20 font-extrabold shadow-xl"
          >
            30
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-blue-600 dark:text-blue-400 text-sm font-semibold mb-8 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            Next-Gen Autonomous Driver Safety Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight"
          >
            Intelligent Road Sign Recognition with{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Pure ANN
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Experience production-grade traffic sign classification trained on the GTSRB dataset. Deliver instant driver safety recommendations and explore deep AI explainability in real time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/predict" className="btn-primary w-full sm:w-auto text-lg px-8 py-4">
              Try Live Predictor <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/dashboard" className="btn-secondary w-full sm:w-auto text-lg px-8 py-4">
              Explore Analytics <BarChart3 className="w-5 h-5 text-blue-500" />
            </Link>
          </motion.div>

          {/* Quick Stats Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">96.8%</div>
              <div className="text-xs font-semibold text-slate-500 uppercase mt-1">Validation Accuracy</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">43</div>
              <div className="text-xs font-semibold text-slate-500 uppercase mt-1">GTSRB Sign Classes</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">12.4ms</div>
              <div className="text-xs font-semibold text-slate-500 uppercase mt-1">Avg Inference Speed</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">50,000+</div>
              <div className="text-xs font-semibold text-slate-500 uppercase mt-1">Benchmark Images</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-100/50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Built to Production Industry Standards
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              RoadSense AI combines Clean Architecture, solid API design, and intuitive UX to deliver seamless road sign recognition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card p-8 group hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{f.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{f.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              End-to-End AI Pipeline Workflow
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Discover how raw image data is transformed into actionable autonomous driving recommendations in milliseconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {workflowSteps.map((step) => (
              <div key={step.num} className="glass-panel p-6 rounded-2xl relative overflow-hidden">
                <span className="text-5xl font-black text-blue-600/10 dark:text-blue-400/10 absolute top-2 right-4">
                  {step.num}
                </span>
                <div className="relative z-10">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm mb-4">
                    {step.num}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{step.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to Test the AI Classifier?
          </h2>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Upload road signs instantly or explore our rich GTSRB dataset visualization and analytical model dashboards today.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/predict" className="px-8 py-4 rounded-xl bg-white text-blue-600 font-bold hover:bg-slate-100 shadow-xl transition-all scale-105">
              Launch Predictor Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
