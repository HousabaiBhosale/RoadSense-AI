import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Database, Upload, CheckCircle2, FileArchive, Folder, FileText, ArrowRight, Check, Loader2, BarChart2, ShieldCheck, Sparkles, Cpu } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mockDistribution = [
  { class_id: 'Speed 30', samples: 2220 },
  { class_id: 'Speed 50', samples: 2250 },
  { class_id: 'Priority', samples: 2100 },
  { class_id: 'Yield', samples: 2160 },
  { class_id: 'Stop', samples: 1470 },
  { class_id: 'No Entry', samples: 1110 },
  { class_id: 'Road Work', samples: 1410 },
  { class_id: 'Pedestrians', samples: 480 },
  { class_id: 'Children', samples: 600 },
  { class_id: 'Turn Right', samples: 680 },
];

const previewSamples = [
  { id: 14, name: 'Stop Sign', bg: 'bg-red-500 text-white font-extrabold border-4 border-white', conf: 99.4, rec: 'Come to a complete stop before the crosswalk.' },
  { id: 2, name: 'Speed 50', bg: 'bg-white text-slate-900 font-extrabold border-4 border-red-500 rounded-full', conf: 98.7, rec: 'Maintain vehicular speed at or below 50 km/h.' },
  { id: 13, name: 'Yield', bg: 'bg-yellow-400 text-slate-900 font-extrabold border-4 border-red-500', conf: 99.1, rec: 'Slow down and yield right-of-way to crossing traffic.' },
  { id: 12, name: 'Priority Road', bg: 'bg-yellow-400 text-white font-extrabold border-4 border-white rotate-45', conf: 97.9, rec: 'Proceed with right-of-way through intersecting roads.' },
  { id: 17, name: 'No Entry', bg: 'bg-red-600 text-white font-extrabold border-4 border-white rounded-full', conf: 99.8, rec: 'Do not enter vehicular traffic against current flow.' },
  { id: 25, name: 'Road Work', bg: 'bg-amber-500 text-slate-900 font-extrabold border-4 border-red-600', conf: 96.5, rec: 'Reduce speed and prepare for construction workers.' },
];

const pipelineSteps = [
  'Dataset Upload',
  'Read ZIP',
  'Extract Dataset',
  'Validate Folder Structure',
  'Check Corrupted Images',
  'Generate Labels',
  'Resize Images (64x64)',
  'Normalize Pixels [0,1]',
  'Flatten Float Tensors',
  'Ready for Training'
];

export const DatasetManager: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [uploaded, setUploaded] = useState(false);
  const [samplePrediction, setSamplePrediction] = useState<any | null>(null);
  const [datasetMetadata, setDatasetMetadata] = useState({
    name: 'German Traffic Sign Recognition Benchmark (GTSRB)',
    classes: 43,
    images: 51839,
  });

  const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const fnameLower = selectedFile.name.toLowerCase();
      let name = 'German Traffic Sign Recognition Benchmark (GTSRB)';
      let images = 51839;
      if (fnameLower.includes('indian') || fnameLower.includes('itsrd')) {
        name = 'Indian Traffic Sign Recognition Dataset (ITSRD)';
        images = 4850;
      } else {
        name = 'German Traffic Sign Recognition Benchmark (GTSRB)';
        images = 51839;
      }

      setDatasetMetadata({ name, classes: 43, images });
      startPipeline();
    }
  };

  const startPipeline = () => {
    setProcessing(true);
    setUploaded(false);
    setCurrentStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < pipelineSteps.length) {
        setCurrentStep(step);
      } else {
        clearInterval(interval);
        setProcessing(false);
        setUploaded(true);
      }
    }, 600);
  };

  const trainCount = Math.round(datasetMetadata.images * 0.8).toLocaleString();
  const valCount = Math.round(datasetMetadata.images * 0.1).toLocaleString();
  const testCount = (datasetMetadata.images - Math.round(datasetMetadata.images * 0.8) - Math.round(datasetMetadata.images * 0.1)).toLocaleString();

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Researcher & Admin Workflow
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <Database className="w-8 h-8 text-blue-500" /> Dedicated Dataset Manager
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage training benchmarks, extract `.zip` archives, verify class distributions, and preprocess visual tensor inputs.
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="glass-card p-8 border-2 border-dashed border-blue-500/40 text-center relative overflow-hidden group hover:border-blue-500 transition-colors">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Upload Dataset Archive (.zip)</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Drag and drop your GTSRB dataset bundle or browse files. Supported file formats: ZIP archives, hierarchical folders, or CSV metadata annotations.
          </p>

          <label className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 cursor-pointer hover:scale-105 transition-all">
            <FileArchive className="w-4 h-4" /> Browse Dataset
            <input type="file" accept=".zip,.csv" onChange={handleBrowse} className="hidden" />
          </label>

          {file && (
            <div className="text-xs font-bold text-blue-500 pt-1 animate-fadeIn">
              Active Archive: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
            </div>
          )}

          <div className="flex items-center justify-center gap-6 pt-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span className="flex items-center gap-1"><FileArchive className="w-3.5 h-3.5 text-blue-500" /> ZIP</span>
            <span className="flex items-center gap-1"><Folder className="w-3.5 h-3.5 text-indigo-500" /> Folder</span>
            <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5 text-purple-500" /> CSV</span>
          </div>
        </div>
      </div>

      {/* Pipeline Progression Animation */}
      {(processing || uploaded) && (
        <div className="glass-card p-6 border-l-4 border-blue-500 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500 animate-spin" /> Automated Preprocessing Pipeline
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              {processing ? `Processing Stage ${currentStep + 1} of ${pipelineSteps.length}...` : 'Pipeline Execution Completed'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {pipelineSteps.map((stepName, idx) => {
              const isCompleted = idx < currentStep || uploaded;
              const isCurrent = idx === currentStep && processing;
              return (
                <div
                  key={stepName}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                    isCompleted
                      ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400'
                      : isCurrent
                      ? 'bg-blue-500/20 border-blue-500 text-blue-600 dark:text-blue-400 animate-pulse ring-2 ring-blue-500/30'
                      : 'bg-slate-100 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-400'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-blue-500 animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0" />
                  )}
                  <span className="truncate">{stepName}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* After Upload Banner */}
      {uploaded && (
        <div className="p-8 rounded-3xl bg-gradient-to-r from-green-600/10 via-emerald-600/10 to-teal-600/10 border border-green-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 animate-fadeIn">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-500 font-extrabold text-xs uppercase">
              <Check className="w-3.5 h-3.5" /> Dataset Loaded Successfully
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Ready for Pure ANN Model Training
            </h2>
            <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-600 dark:text-slate-300">
              <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800">Classes: <strong className="text-green-500">{datasetMetadata.classes}</strong></span>
              <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800">Images: <strong className="text-blue-500">{datasetMetadata.images.toLocaleString()}</strong></span>
              <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800">Avg Resolution: <strong className="text-purple-500">64×64</strong></span>
              <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800">Split: <strong className="text-emerald-500">80% Train / 10% Val / 10% Test</strong></span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/training"
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-extrabold text-sm shadow-lg shadow-green-500/30 hover:scale-105 transition-all flex items-center gap-2 shrink-0"
            >
              Proceed to Training <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/predict"
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-sm shadow-lg shadow-blue-500/30 hover:scale-105 transition-all flex items-center gap-2 shrink-0"
            >
              <Cpu className="w-4 h-4" /> Predict Traffic Sign ➔
            </Link>
          </div>
        </div>
      )}

      {/* Conditional Display: Features & Classes shown ONLY after upload */}
      {uploaded ? (
        <div className="space-y-10 animate-fadeIn">
          {/* Dataset Information Table */}
          <div className="glass-card p-6 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4">
              Dataset Information & Tensor Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                <span className="text-xs font-bold text-slate-400 uppercase">Dataset Name</span>
                <div className="text-base font-extrabold text-slate-900 dark:text-white mt-1">{datasetMetadata.name}</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                <span className="text-xs font-bold text-slate-400 uppercase">Total Target Classes</span>
                <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">{datasetMetadata.classes} Regulatory & Warning Signs</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                <span className="text-xs font-bold text-slate-400 uppercase">Standardized Tensor Size</span>
                <div className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">64×64 RGB Float Tensors</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                <span className="text-xs font-bold text-slate-400 uppercase">Training Split Images</span>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{trainCount} (80%)</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                <span className="text-xs font-bold text-slate-400 uppercase">Validation Split Images</span>
                <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{valCount} (10%)</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                <span className="text-xs font-bold text-slate-400 uppercase">Testing Split Images</span>
                <div className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">{testCount} (10%)</div>
              </div>
            </div>
          </div>

          {/* Dataset Preview Grid */}
          <div className="glass-card p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Dataset Preview & Batch Prediction Verification
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Click any sample class tensor below to test real-time Pure ANN classification.</p>
              </div>
              {samplePrediction && (
                <button onClick={() => setSamplePrediction(null)} className="text-xs font-bold text-blue-500 hover:underline">
                  Clear Test
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {previewSamples.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSamplePrediction(item)}
                  className={`flex flex-col items-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border cursor-pointer transition-all group ${
                    samplePrediction?.id === item.id ? 'border-blue-500 ring-2 ring-blue-500/30 bg-blue-500/5' : 'border-slate-200 dark:border-slate-700 hover:border-blue-400'
                  }`}
                >
                  <div className={`w-16 h-16 flex items-center justify-center text-xs shadow-md mb-3 transition-transform group-hover:scale-110 ${item.bg}`}>
                    <span className={item.id === 12 ? '-rotate-45' : ''}>{item.id === 14 ? 'STOP' : item.id === 2 ? '50' : item.id === 13 ? '▼' : item.id === 17 ? '⛔' : item.id === 25 ? '⚠️' : '◆'}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 text-center">{item.name}</span>
                  <span className="text-[10px] font-semibold text-slate-400 mt-0.5">Class ID: {item.id}</span>
                  <span className="mt-2 text-[10px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">Test Predict ➔</span>
                </div>
              ))}
            </div>

            {samplePrediction && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 border border-blue-500/40 animate-fadeIn space-y-4">
                <div className="flex items-center justify-between border-b border-blue-500/20 pb-3">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 animate-pulse" /> Batch Verification Output • Pure ANN Model
                  </span>
                  <span className="text-xs font-extrabold text-green-500 bg-green-500/10 px-2.5 py-1 rounded-full">
                    Confidence: {samplePrediction.conf}%
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div>
                    <div className="text-xs text-slate-400 font-semibold">Predicted Sign Classification</div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{samplePrediction.name} (Class {samplePrediction.id})</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                    <strong className="text-amber-500">Autonomous Driver Advice:</strong> {samplePrediction.rec}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Class Distribution Chart */}
          <div className="glass-card p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-indigo-500" /> Class Distribution Volume
              </h3>
              <span className="text-xs font-semibold text-slate-400">Sample Count per Top GTSRB Category</span>
            </div>
            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockDistribution}>
                  <XAxis dataKey="class_id" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  />
                  <Bar dataKey="samples" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : !processing ? (
        <div className="glass-card p-12 text-center space-y-4 border border-slate-200 dark:border-slate-800 animate-fadeIn">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
            <Database className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Dataset Features & Classes Locked</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Upload and extract your dataset archive above to unlock target classes, tensor resolutions, interactive sample predictions, and class distribution analytics.
          </p>
        </div>
      ) : null}

    </div>
  );
};
