import React, { useState, useEffect } from 'react';
import { Database, Search } from 'lucide-react';

export const DatasetPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/dataset')
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch(() => {
        // Fallback demo classes
        const mockClasses = [];
        const signNames = [
          "Speed limit (20km/h)", "Speed limit (30km/h)", "Speed limit (50km/h)", "Speed limit (60km/h)",
          "Speed limit (70km/h)", "Speed limit (80km/h)", "End of speed limit (80km/h)", "Speed limit (100km/h)",
          "Speed limit (120km/h)", "No passing", "No passing for vehicles > 3.5t", "Right-of-way next intersection",
          "Priority road", "Yield", "Stop", "No vehicles", "Vehicles > 3.5t prohibited", "No entry",
          "General caution", "Dangerous curve left", "Dangerous curve right", "Double curve", "Bumpy road",
          "Slippery road", "Road narrows right", "Road work", "Traffic signals", "Pedestrians",
          "Children crossing", "Bicycles crossing", "Beware of ice/snow", "Wild animals crossing",
          "End speed/passing limits", "Turn right ahead", "Turn left ahead", "Ahead only", "Go straight or right",
          "Go straight or left", "Keep right", "Keep left", "Roundabout mandatory", "End no passing",
          "End no passing > 3.5t"
        ];
        for (let i = 0; i < 43; i++) {
          mockClasses.push({
            class_id: i,
            class_name: signNames[i] || `Class ${i}`,
            description: `Traffic regulation sign ID ${i} regarding roadway safety and driving speed protocols.`,
            sample_count: Math.floor(Math.random() * 1500) + 300
          });
        }
        setData({
          dataset_name: "German Traffic Sign Recognition Benchmark (GTSRB)",
          total_classes: 43,
          statistics: { total_images: 51839, train_size: 39209, val_size: 6919, test_size: 12630 },
          classes: mockClasses
        });
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const filteredClasses = data.classes?.filter((cls: any) =>
    cls.class_name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Database className="w-8 h-8 text-blue-500" /> GTSRB Dataset Overview
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Explore all 43 benchmark traffic sign classes and distribution volume.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search sign classes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-panel text-sm focus:outline-none focus:ring-2 ring-blue-500/50"
          />
        </div>
      </div>

      {/* Dataset KPI Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-5 text-center">
          <div className="text-xs font-bold text-slate-500 uppercase">Total Benchmark Images</div>
          <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mt-1">{data.statistics?.total_images?.toLocaleString()}</div>
        </div>
        <div className="glass-card p-5 text-center">
          <div className="text-xs font-bold text-slate-500 uppercase">Training Set Split</div>
          <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mt-1">{data.statistics?.train_size?.toLocaleString()}</div>
        </div>
        <div className="glass-card p-5 text-center">
          <div className="text-xs font-bold text-slate-500 uppercase">Validation Split</div>
          <div className="text-3xl font-black text-purple-600 dark:text-purple-400 mt-1">{data.statistics?.val_size?.toLocaleString()}</div>
        </div>
        <div className="glass-card p-5 text-center">
          <div className="text-xs font-bold text-slate-500 uppercase">Testing Set Split</div>
          <div className="text-3xl font-black text-pink-600 dark:text-pink-400 mt-1">{data.statistics?.test_size?.toLocaleString()}</div>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((cls: any) => (
          <div key={cls.class_id} className="glass-card p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-extrabold text-xs">
                  Class ID: {cls.class_id}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  ~{cls.sample_count} Samples
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                {cls.class_name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                {cls.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
