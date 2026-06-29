import React, { useState, useEffect } from 'react';
import { History as HistoryIcon, Search, Download, Trash2, ChevronLeft, ChevronRight, ShieldAlert, CheckCircle } from 'lucide-react';

const formatTimestamp = (dateVal: any) => {
  if (!dateVal) return "N/A";
  const str = typeof dateVal === 'string' && !dateVal.endsWith('Z') && !dateVal.includes('+') ? `${dateVal}Z` : dateVal;
  return new Date(str).toLocaleString();
};

export const History: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;

  const fetchHistory = () => {
    setLoading(true);
    const token = localStorage.getItem('roadsense_token');
    const headers: any = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    fetch(`http://localhost:8000/api/v1/history?page=${page}&limit=${limit}&search=${encodeURIComponent(searchTerm)}`, { headers })
      .then((res) => res.json())
      .then((data) => {
        setHistory(data.data || []);
        setTotalPages(data.total_pages || 1);
        setLoading(false);
      })
      .catch(() => {
        // Fallback demo history
        const demoHistory = [
          { id: 101, predicted_class_name: "Speed limit (50km/h)", confidence_score: 98.4, processing_time_ms: 11.2, created_at: new Date().toISOString(), road_sign_description: "Maximum permitted speed is 50 km/h." },
          { id: 102, predicted_class_name: "Stop", confidence_score: 99.1, processing_time_ms: 12.8, created_at: new Date(Date.now() - 3600000).toISOString(), road_sign_description: "Mandatory full stop before proceeding." },
          { id: 103, predicted_class_name: "Yield", confidence_score: 95.7, processing_time_ms: 10.9, created_at: new Date(Date.now() - 7200000).toISOString(), road_sign_description: "Yield right-of-way to cross traffic." },
          { id: 104, predicted_class_name: "Priority road", confidence_score: 97.2, processing_time_ms: 13.1, created_at: new Date(Date.now() - 10800000).toISOString(), road_sign_description: "You are on a priority road." },
        ];
        const filtered = demoHistory.filter(item => item.predicted_class_name.toLowerCase().includes(searchTerm.toLowerCase()));
        setHistory(filtered);
        setTotalPages(1);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHistory();
  }, [page, searchTerm]);

  const handleDeleteAll = () => {
    if (!confirm("Are you sure you want to clear all prediction scan logs?")) return;
    const token = localStorage.getItem('roadsense_token');
    const headers: any = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    fetch('http://localhost:8000/api/v1/history', { method: 'DELETE', headers })
      .then(() => {
        setHistory([]);
      })
      .catch(() => {
        setHistory([]);
      });
  };

  const downloadCSV = () => {
    if (history.length === 0) return;
    const headers = ["ID", "Sign Class", "Confidence (%)", "Latency (ms)", "Timestamp"];
    const rows = history.map(item => [
      item.id,
      `"${item.predicted_class_name}"`,
      item.confidence_score,
      item.processing_time_ms,
      `"${formatTimestamp(item.created_at)}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `RoadSense_History_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <HistoryIcon className="w-8 h-8 text-blue-500" /> Prediction Scan History
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review past classifications, confidence ratings, and export telemetry logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={downloadCSV}
            disabled={history.length === 0}
            className="btn-secondary px-4 text-xs font-bold disabled:opacity-50"
          >
            <Download className="w-4 h-4 text-blue-500" /> Export CSV
          </button>
          <button
            onClick={handleDeleteAll}
            disabled={history.length === 0}
            className="btn-secondary px-4 text-xs font-bold text-red-500 hover:text-red-600 disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" /> Clear Logs
          </button>
        </div>
      </div>

      {/* Search Filter */}
      <div className="glass-card p-4 flex items-center gap-3">
        <Search className="w-5 h-5 text-slate-400 ml-2" />
        <input
          type="text"
          placeholder="Filter logs by road sign classification name..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
          className="w-full bg-transparent text-sm focus:outline-none text-slate-800 dark:text-slate-200"
        />
      </div>

      {/* History Table */}
      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : history.length === 0 ? (
          <div className="p-16 text-center text-slate-400">
            <ShieldAlert className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-bold">No prediction records found</p>
            <p className="text-xs mt-1">Try launching a scan on the Predict page or adjusting your filter keywords.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 uppercase bg-slate-50/50 dark:bg-slate-800/40">
                  <th className="py-3.5 px-6">ID</th>
                  <th className="py-3.5 px-6">Sign Classification</th>
                  <th className="py-3.5 px-6">Confidence</th>
                  <th className="py-3.5 px-6">Latency</th>
                  <th className="py-3.5 px-6">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                {history.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs text-slate-400">#{item.id}</td>
                    <td className="py-4 px-6 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      {item.predicted_class_name}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-extrabold text-xs">
                        {item.confidence_score}%
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500 font-mono text-xs">{item.processing_time_ms}ms</td>
                    <td className="py-4 px-6 text-slate-400 text-xs">
                      {formatTimestamp(item.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Page {page} of {totalPages}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg glass-panel disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg glass-panel disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
