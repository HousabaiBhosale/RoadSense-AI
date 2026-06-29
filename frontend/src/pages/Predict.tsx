import React, { useState, useRef } from 'react';
import { Upload, RefreshCw, Cpu, AlertTriangle, Download, ShieldAlert, ArrowRight } from 'lucide-react';

export const Predict: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, JPEG).');
      return;
    }
    setError(null);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handlePredict = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const token = localStorage.getItem('roadsense_token');
      const headers: any = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('http://localhost:8000/api/v1/predict', {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.detail || 'Prediction API failed. Ensure AI server is running.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to classify road sign image.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const downloadReport = () => {
    if (!result) return;
    const reportText = `=== ROADSENSE AI PREDICTION REPORT ===\nDate: ${new Date().toLocaleString()}\nSign Detected: ${result.predicted_class_name}\nConfidence Score: ${result.confidence_score}%\nProcessing Time: ${result.processing_time_ms}ms\n\nDescription: ${result.road_sign_description}\nDriver Recommendation: ${result.driver_recommendation}\n\nTop 5 Softmax Probabilities:\n${result.top_5_predictions.map((p: any) => `- ${p.class_name}: ${p.probability}%`).join('\n')}\n======================================`;
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RoadSense_Report_${Date.now()}.txt`;
    a.click();
  };

  return (
    <div className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold uppercase">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" /> End User Prediction Workflow • Trained Pure ANN Active
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-2">
          <Cpu className="w-8 h-8 text-blue-500 animate-pulse" /> Live Traffic Sign Classifier
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Upload any road sign image to receive instant classification, top-5 probability breakdown, and autonomous driving advice.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Column: Upload Box */}
        <div className="glass-card p-6 space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Input Image</h2>

          {!previewUrl ? (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-2xl p-10 text-center cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800/40"
            >
              <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-bounce" />
              <p className="font-semibold text-slate-700 dark:text-slate-300">Drag & drop your road sign image here</p>
              <p className="text-xs text-slate-400 mt-1">or click to browse from local computer</p>
              <span className="inline-block mt-4 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold">
                Browse Files
              </span>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 aspect-video bg-black/5 flex items-center justify-center">
                <img src={previewUrl} alt="Road sign preview" className="max-h-64 object-contain" />
                {loading && (
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse shadow-[0_0_15px_#3b82f6] border-b border-blue-400" />
                )}
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>File: {selectedFile?.name}</span>
                <span>{(selectedFile?.size || 0) / 1024 > 1024 ? `${((selectedFile?.size || 0) / (1024 * 1024)).toFixed(2)} MB` : `${Math.round((selectedFile?.size || 0) / 1024)} KB`}</span>
              </div>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            accept="image/*"
            className="hidden"
          />

          <div className="flex gap-4">
            <button
              onClick={handlePredict}
              disabled={!selectedFile || loading}
              className="btn-primary flex-1 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Running Pure ANN...
                </>
              ) : (
                <>
                  Classify Sign <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            {previewUrl && (
              <button
                onClick={handleReset}
                disabled={loading}
                className="btn-secondary px-4 text-red-500 hover:text-red-600"
                title="Reset Image"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Prediction Results Card */}
        <div className="glass-card p-6 space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. AI Inference Output</h2>

          {!result && !loading && (
            <div className="h-80 flex flex-col items-center justify-center text-center text-slate-400 p-8">
              <ShieldAlert className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4" />
              <p className="font-medium text-slate-600 dark:text-slate-400">Waiting for Image Classification</p>
              <p className="text-xs mt-1">Upload a sign on the left and hit Classify to view top predictions and driver advice.</p>
            </div>
          )}

          {loading && (
            <div className="h-80 flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="font-bold text-slate-800 dark:text-slate-200 animate-pulse">Running Bilinear 64x64 Normalization & Forward Pass...</p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Primary Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Detected Sign</span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{result.predicted_class_name}</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-500 uppercase">Confidence</span>
                  <div className="text-2xl font-black text-green-500">{result.confidence_score}%</div>
                </div>
              </div>

              {/* Driver Advice */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4" /> Driver Safety Recommendation
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {result.driver_recommendation}
                </p>
              </div>

              {/* Top 5 Probability Chart */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Top-5 Softmax Class Probabilities</h4>
                <div className="space-y-2.5">
                  {result.top_5_predictions.map((p: any, idx: number) => (
                    <div key={p.class_name} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-700 dark:text-slate-300">{idx + 1}. {p.class_name}</span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">{p.probability}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${idx === 0 ? 'bg-blue-600' : 'bg-slate-400 dark:bg-slate-600'}`}
                          style={{ width: `${Math.max(p.probability, 2)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meta info and download */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>Inference Time: <strong className="text-slate-800 dark:text-slate-200">{result.processing_time_ms}ms</strong></span>
                <button
                  onClick={downloadReport}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Download Report
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* ANN Challenge Rule 8 Compliance Footer: Model & Team Details */}
      <div className="glass-card p-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-t-2 border-blue-500/30">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-500" /> Model Details
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <strong>Architecture:</strong> Pure Artificial Neural Network (ANN) • <strong>Layers:</strong> Dense (512 → 256 → 128 → 43) • <strong>Input:</strong> 64×64×3 Bilinear Normalization • <strong>Dataset:</strong> GTSRB (43 Traffic Sign Classes) • <strong>Zero CNN Reliance</strong>
          </p>
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-purple-500" /> Team Details
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <strong>Housabai Bhosale</strong> (Backend Developer) • <strong>Aishwarya Andodagi</strong> (Frontend Developer) • <strong>Challenge:</strong> ANN Challenge 2026 (8-Hour Hackathon Submission)
          </p>
        </div>
      </div>

    </div>
  );
};
