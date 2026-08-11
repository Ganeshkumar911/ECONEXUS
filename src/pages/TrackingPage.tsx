import React, { useEffect, useState } from 'react';
import ProgressChart from '../components/ProgressChart';
import DailyLogForm from '../components/DailyLogForm';
import { UserProfile, WasteTrackingData } from '../types';
import {
  CheckCircle,
  Sparkles,
  Search,
  Download,
  FileSpreadsheet,
  Zap,
  TreePine,
  Droplets,
  PlusCircle
} from 'lucide-react';

interface TrackingPageProps {
  initialTrackingData: WasteTrackingData[];
  onNewEntry: (entry: WasteTrackingData) => void;
  profile: UserProfile | null;
  onUpdateProfile: (profile: UserProfile) => void;
}

const defaultGoals = {
  totalWasteReduced: 20,
  recyclablesCollected: 15,
  compostCreated: 10,
  streakDays: 5,
  zeroLandfillEntries: 3,
};

interface QuickPreset {
  label: string;
  icon: string;
  recyclable: number;
  compostable: number;
  hazardous: number;
  landfill: number;
  itemDescription: string;
}

const QUICK_PRESETS: QuickPreset[] = [
  {
    label: '5 PET Water Bottles',
    icon: '🍾',
    recyclable: 0.2,
    compostable: 0,
    hazardous: 0,
    landfill: 0,
    itemDescription: '5 PET Plastic Water Bottles (Recyclable)'
  },
  {
    label: 'Kitchen Food Scraps',
    icon: '🍏',
    recyclable: 0,
    compostable: 1.5,
    hazardous: 0,
    landfill: 0,
    itemDescription: 'Daily Kitchen Food & Fruit Scraps'
  },
  {
    label: '2 Cardboard Shipping Boxes',
    icon: '📦',
    recyclable: 0.8,
    compostable: 0,
    hazardous: 0,
    landfill: 0,
    itemDescription: '2 Cardboard Boxes (Recyclable)'
  },
  {
    label: '2 Used AA Batteries',
    icon: '🔋',
    recyclable: 0,
    compostable: 0,
    hazardous: 0.1,
    landfill: 0,
    itemDescription: '2 AA Alkaline Batteries (Hazardous E-Waste)'
  },
  {
    label: '1 Coffee Cup Takeout',
    icon: '☕',
    recyclable: 0,
    compostable: 0,
    hazardous: 0,
    landfill: 0.1,
    itemDescription: '1 Plastic-lined Coffee Cup (Landfill)'
  }
];

const TrackingPage: React.FC<TrackingPageProps> = ({ initialTrackingData, onNewEntry, profile, onUpdateProfile }) => {
  const [trackingData, setTrackingData] = useState<WasteTrackingData[]>(initialTrackingData);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [goals, setGoals] = useState(profile?.goals || defaultGoals);

  // Search log query
  const [logSearchQuery, setLogSearchQuery] = useState('');

  const handleLogSubmit = (data: { recyclable: number; compostable: number; hazardous: number; landfill: number; itemDescription: string }) => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newEntry: WasteTrackingData = {
      date: today,
      timestamp,
      itemDescription: data.itemDescription,
      recyclable: data.recyclable,
      compostable: data.compostable,
      hazardous: data.hazardous,
      landfill: data.landfill
    };

    setTrackingData([...trackingData, newEntry]);
    onNewEntry(newEntry);
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleQuickPresetLog = (preset: QuickPreset) => {
    handleLogSubmit({
      recyclable: preset.recyclable,
      compostable: preset.compostable,
      hazardous: preset.hazardous,
      landfill: preset.landfill,
      itemDescription: preset.itemDescription
    });
  };

  // Calculate statistics
  const calculateStats = () => {
    return trackingData.reduce(
      (acc, day) => {
        acc.totalWaste += day.recyclable + day.compostable + day.hazardous + day.landfill;
        acc.recycledWaste += day.recyclable;
        acc.compostedWaste += day.compostable;
        return acc;
      },
      { totalWaste: 0, recycledWaste: 0, compostedWaste: 0 }
    );
  };

  useEffect(() => {
    setGoals(profile?.goals || defaultGoals);
  }, [profile]);

  const stats = calculateStats();
  const divertedPercentage = stats.totalWaste > 0
    ? Math.round(((stats.recycledWaste + stats.compostedWaste) / stats.totalWaste) * 100)
    : 0;

  // Calculated Carbon Offset Metrics
  const co2AvoidedKg = (stats.totalWaste * 1.85).toFixed(1);
  const waterSavedLiters = Math.round(stats.totalWaste * 42);
  const energySavedKwh = (stats.totalWaste * 2.3).toFixed(1);

  const currentGoalValues = {
    totalWasteReduced: stats.totalWaste,
    recyclablesCollected: stats.recycledWaste,
    compostCreated: stats.compostedWaste,
    streakDays: (() => {
      const dates = Array.from(new Set(trackingData.map((entry) => entry.date))).sort();
      if (dates.length === 0) return 0;
      let streak = 1;
      let current = new Date(dates[dates.length - 1]);
      for (let i = dates.length - 2; i >= 0; i -= 1) {
        const previous = new Date(dates[i]);
        const diff = (current.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24);
        if (diff === 1) {
          streak += 1;
          current = previous;
        } else {
          break;
        }
      }
      return streak;
    })(),
    zeroLandfillEntries: trackingData.filter((entry) => (entry.landfill || 0) === 0).length,
  };

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGoals((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSaveGoals = () => {
    if (!profile) {
      return;
    }

    onUpdateProfile({
      ...profile,
      goals: {
        ...goals,
      },
    });
  };

  const goalProgress = [
    {
      label: 'Total waste reduction',
      current: currentGoalValues.totalWasteReduced,
      goal: goals.totalWasteReduced,
      unit: 'kg',
    },
    {
      label: 'Recyclables collected',
      current: currentGoalValues.recyclablesCollected,
      goal: goals.recyclablesCollected,
      unit: 'kg',
    },
    {
      label: 'Compost created',
      current: currentGoalValues.compostCreated,
      goal: goals.compostCreated,
      unit: 'kg',
    },
    {
      label: 'Streak goal',
      current: currentGoalValues.streakDays,
      goal: goals.streakDays,
      unit: 'days',
    },
    {
      label: 'Landfill-free entries',
      current: currentGoalValues.zeroLandfillEntries,
      goal: goals.zeroLandfillEntries,
      unit: 'entries',
    },
  ];

  // CSV Export Handler
  const handleExportCSV = () => {
    const headers = ['Date', 'Time', 'Item Description', 'Recyclable (kg)', 'Compostable (kg)', 'Hazardous (kg)', 'Landfill (kg)'];
    const rows = trackingData.map((e) => [
      `"${e.date}"`,
      `"${e.timestamp || ''}"`,
      `"${(e.itemDescription || '').replace(/"/g, '""')}"`,
      e.recyclable,
      e.compostable,
      e.hazardous,
      e.landfill
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `waste-tracking-log-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Filtered Tracking Data for Recent Logs
  const filteredTrackingData = trackingData.filter((entry) => {
    if (!logSearchQuery.trim()) return true;
    const q = logSearchQuery.toLowerCase();
    const matchesDesc = (entry.itemDescription || '').toLowerCase().includes(q);
    const matchesDate = entry.date.includes(q);
    return matchesDesc || matchesDate;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-green-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Track Your Waste</h1>
          <p className="text-green-100 text-lg max-w-3xl">
            Monitor your waste production, see your progress, and set goals to reduce your environmental footprint.
          </p>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-24 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md z-50 animate-fadeIn">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Waste log added successfully!</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Overview (Preserved Original Content) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Impact Summary</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Total Waste</h3>
              <p className="text-2xl font-bold text-gray-800">{stats.totalWaste.toFixed(1)} kg</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-700">Recycled</h3>
              <p className="text-2xl font-bold text-blue-800">{stats.recycledWaste.toFixed(1)} kg</p>
              <p className="text-sm text-blue-600">
                {stats.totalWaste > 0 ? Math.round((stats.recycledWaste / stats.totalWaste) * 100) : 0}% of total
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-green-700">Composted</h3>
              <p className="text-2xl font-bold text-green-800">{stats.compostedWaste.toFixed(1)} kg</p>
              <p className="text-sm text-green-600">
                {stats.totalWaste > 0 ? Math.round((stats.compostedWaste / stats.totalWaste) * 100) : 0}% of total
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-purple-700">Diverted from Landfill</h3>
              <p className="text-2xl font-bold text-purple-800">{divertedPercentage}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-purple-600 h-2.5 rounded-full"
                  style={{ width: `${divertedPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW FEATURE 1: Quick 1-Click Logging Presets */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="text-emerald-700" size={20} />
            <h3 className="text-base font-bold text-emerald-950">Quick 1-Click Entry Presets</h3>
          </div>
          <p className="text-xs text-emerald-800 mb-3">
            Tap any preset button to instantly log everyday waste items without manual typing:
          </p>

          <div className="flex flex-wrap gap-2">
            {QUICK_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickPresetLog(preset)}
                className="px-3.5 py-2 bg-white hover:bg-emerald-100 text-gray-800 rounded-xl text-xs font-bold shadow-sm border border-emerald-200 transition-all flex items-center gap-1.5 active:scale-95"
              >
                <span>{preset.icon}</span>
                <span>{preset.label}</span>
                <PlusCircle size={14} className="text-emerald-700 ml-1" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* NEW FEATURE 2: Environmental Carbon Offset Savings Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 rounded-2xl p-6 text-white shadow-md">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <TreePine className="text-emerald-300" size={20} />
            Your Environmental Carbon Offsets
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/20 text-emerald-300 rounded-lg">
                <TreePine size={22} />
              </div>
              <div>
                <h4 className="text-xl font-extrabold">{co2AvoidedKg} kg</h4>
                <p className="text-emerald-200">CO2 Emissions Prevented</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-3">
              <div className="p-2.5 bg-blue-500/20 text-blue-300 rounded-lg">
                <Droplets size={22} />
              </div>
              <div>
                <h4 className="text-xl font-extrabold">{waterSavedLiters} L</h4>
                <p className="text-blue-200">Water Conserved</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/20 text-amber-300 rounded-lg">
                <Zap size={22} />
              </div>
              <div>
                <h4 className="text-xl font-extrabold">{energySavedKwh} kWh</h4>
                <p className="text-amber-200">Clean Energy Saved</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content (Preserved Original Layout & Components) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Progress Chart (Preserved Original Content) */}
          <div className="lg:col-span-2">
            <ProgressChart data={trackingData} />

            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Waste Reduction Goals</h2>

              <div className="space-y-4">
                {goalProgress.map((item) => {
                  const percent = item.goal > 0 ? Math.min(100, Math.round((item.current / item.goal) * 100)) : 0;
                  return (
                    <div key={item.label}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{item.label}</span>
                        <span className="text-sm font-medium text-gray-700">{item.current}/{item.goal} {item.unit}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${percent}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total waste goal (kg)</label>
                  <input type="number" name="totalWasteReduced" value={goals.totalWasteReduced} onChange={handleGoalChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Recycling goal (kg)</label>
                  <input type="number" name="recyclablesCollected" value={goals.recyclablesCollected} onChange={handleGoalChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Compost goal (kg)</label>
                  <input type="number" name="compostCreated" value={goals.compostCreated} onChange={handleGoalChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Streak goal (days)</label>
                  <input type="number" name="streakDays" value={goals.streakDays} onChange={handleGoalChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Zero landfill target</label>
                  <input type="number" name="zeroLandfillEntries" value={goals.zeroLandfillEntries} onChange={handleGoalChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50" />
                </div>
              </div>

              <button onClick={handleSaveGoals} className="mt-6 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium">
                Save goals
              </button>
            </div>
          </div>

          {/* Right Column - Daily Log Form (Preserved Original Content + CSV Export & Search Filter) */}
          <div>
            <DailyLogForm onSubmit={handleLogSubmit} />

            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Recent Waste Logs</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportCSV}
                    className="bg-emerald-700 text-white px-3 py-1 rounded-md hover:bg-emerald-800 transition-colors text-xs font-bold flex items-center gap-1 shadow-sm"
                    title="Export log as CSV Spreadsheet"
                  >
                    <FileSpreadsheet size={14} /> CSV
                  </button>

                  <button
                    onClick={() => {
                      const html = `<!doctype html><html><head><meta charset="utf-8"><title>Waste Logs</title></head><body><h1>Recent Waste Logs</h1><table border="1" cellpadding="6" cellspacing="0"><thead><tr><th>Date</th><th>Time</th><th>Description</th><th>Recyclable (kg)</th><th>Compostable (kg)</th><th>Hazardous (kg)</th><th>Landfill (kg)</th></tr></thead><tbody>${trackingData.slice(-20).reverse().map(e=>`<tr><td>${e.date}</td><td>${e.timestamp||''}</td><td>${(e.itemDescription||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</td><td>${e.recyclable}</td><td>${e.compostable}</td><td>${e.hazardous}</td><td>${e.landfill}</td></tr>`).join('')}</tbody></table></body></html>`;
                      const blob = new Blob([html], { type: 'application/msword' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'waste-logs.doc';
                      document.body.appendChild(a);
                      a.click();
                      a.remove();
                      URL.revokeObjectURL(url);
                    }}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-xs font-bold flex items-center gap-1 shadow-sm"
                  >
                    <Download size={14} /> Word
                  </button>
                </div>
              </div>

              {/* Log Search Filter */}
              {trackingData.length > 0 && (
                <div className="relative mb-4">
                  <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search logs by description or date..."
                    value={logSearchQuery}
                    onChange={(e) => setLogSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
              )}

              {filteredTrackingData.length === 0 ? (
                <p className="text-gray-600 text-sm">
                  {logSearchQuery ? 'No past logs match your search term.' : "No waste logs yet. Add today's waste to save a new entry."}
                </p>
              ) : (
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                  {filteredTrackingData.slice(-10).reverse().map((entry, index) => (
                    <div key={`${entry.date}-${index}`} className="rounded-lg border border-gray-200 p-4 bg-gray-50 hover:bg-white transition-colors">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                        <div>
                          <p className="text-xs font-semibold text-gray-500">{entry.date} {entry.timestamp ? `• ${entry.timestamp}` : ''}</p>
                          <p className="text-sm font-bold text-gray-800 mt-0.5">{entry.itemDescription || 'Waste tracked'}</p>
                        </div>
                        <div className="text-xs text-gray-700 space-y-0.5">
                          {entry.recyclable > 0 && <p className="text-blue-700 font-medium">Recyclable: {entry.recyclable} kg</p>}
                          {entry.compostable > 0 && <p className="text-emerald-700 font-medium">Compostable: {entry.compostable} kg</p>}
                          {entry.hazardous > 0 && <p className="text-rose-700 font-medium">Hazardous: {entry.hazardous} kg</p>}
                          {entry.landfill > 0 && <p className="text-gray-700 font-medium">Landfill: {entry.landfill} kg</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Tips for Reducing Waste</h2>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 bg-green-500 rounded-full text-white flex items-center justify-center text-xs">
                    1
                  </div>
                  <p className="ml-2 text-gray-700">Use reusable shopping bags instead of plastic ones.</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 bg-green-500 rounded-full text-white flex items-center justify-center text-xs">
                    2
                  </div>
                  <p className="ml-2 text-gray-700">Buy in bulk to reduce packaging waste.</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 bg-green-500 rounded-full text-white flex items-center justify-center text-xs">
                    3
                  </div>
                  <p className="ml-2 text-gray-700">Use a reusable water bottle instead of buying bottled water.</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 bg-green-500 rounded-full text-white flex items-center justify-center text-xs">
                    4
                  </div>
                  <p className="ml-2 text-gray-700">Compost food scraps to reduce landfill waste.</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 bg-green-500 rounded-full text-white flex items-center justify-center text-xs">
                    5
                  </div>
                  <p className="ml-2 text-gray-700">Repair items instead of replacing them when possible.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;