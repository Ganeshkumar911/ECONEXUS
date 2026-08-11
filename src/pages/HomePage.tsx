import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Recycle,
  Map,
  BookOpen,
  BarChart,
  Search,
  Sparkles,
  Award,
  CheckCircle2,
  TreePine,
  Zap,
  Globe,
  HelpCircle,
  RotateCcw,
  Check,
  Calculator,
  Calendar,
  HeartHandshake,
  Bell,
  Flame,
  Target,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import ConnectWithUsSection from '../components/ConnectWithUsSection';

interface QuickWasteItem {
  name: string;
  category: 'Recyclable' | 'Compostable' | 'Hazardous' | 'Landfill';
  color: string;
  badgeBg: string;
  instruction: string;
}

const QUICK_WASTE_DATABASE: QuickWasteItem[] = [
  {
    name: 'PET Plastic Water Bottle',
    category: 'Recyclable',
    color: 'text-blue-600',
    badgeBg: 'bg-blue-100 text-blue-800',
    instruction: 'Rinse liquid remnants, crush bottle to save space, and place cap back on before putting in blue bin.'
  },
  {
    name: 'Banana Peel & Food Scraps',
    category: 'Compostable',
    color: 'text-green-600',
    badgeBg: 'bg-green-100 text-green-800',
    instruction: 'Place directly in organic compost bin or worm box. Rich in nitrogen for garden soil.'
  },
  {
    name: 'AA Alkaline Battery',
    category: 'Hazardous',
    color: 'text-amber-600',
    badgeBg: 'bg-amber-100 text-amber-800',
    instruction: 'Never throw in regular trash. Take to dedicated hazardous e-waste drop-off box or local retail recycler.'
  },
  {
    name: 'Greasy Pizza Box Bottom',
    category: 'Compostable',
    color: 'text-green-600',
    badgeBg: 'bg-green-100 text-green-800',
    instruction: 'Tear off clean lid for cardboard recycling. Place oil-soaked bottom into compost or organic waste bin.'
  },
  {
    name: 'Fluorescent Light Bulb',
    category: 'Hazardous',
    color: 'text-amber-600',
    badgeBg: 'bg-amber-100 text-amber-800',
    instruction: 'Contains trace mercury gas. Wrap safely and deliver to hazardous municipal recycling depot.'
  },
  {
    name: 'Styrofoam Takeout Box (PS)',
    category: 'Landfill',
    color: 'text-gray-600',
    badgeBg: 'bg-gray-200 text-gray-800',
    instruction: 'Styrofoam cannot be processed in standard municipal recycling bins. Dispose in general landfill bin.'
  }
];

const QUIZ_QUESTIONS = [
  {
    question: 'Should plastic bottle caps be left on or removed before recycling?',
    options: [
      'Left on (after rinsing and crushing bottle)',
      'Thrown into compost bin',
      'Always thrown into general landfill',
      'Burned at home'
    ],
    correctIdx: 0,
    explanation: 'Modern recycling equipment can process caps if attached to crushed PET bottles!'
  },
  {
    question: 'Which waste type accounts for nearly 50% of typical municipal solid waste?',
    options: [
      'Electronic waste',
      'Organic food scraps & yard waste',
      'Glass bottles',
      'Aluminum cans'
    ],
    correctIdx: 1,
    explanation: 'Organic waste makes up almost half of household waste and emits methane if landfilled instead of composted.'
  },
  {
    question: 'What does "wishcycling" mean in environmental terms?',
    options: [
      'Making a wish before throwing items away',
      'Putting non-recyclable items into recycling bins hoping they will be recycled',
      'Cycling to a recycling center',
      'Upcycling old clothes into bags'
    ],
    correctIdx: 1,
    explanation: 'Wishcycling contaminates recycling batches and causes sorting machinery blockages.'
  }
];

const HomePage: React.FC = () => {
  // Interactive Waste Scanner state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuickItem, setSelectedQuickItem] = useState<QuickWasteItem>(QUICK_WASTE_DATABASE[0]);

  // Daily Action state
  const [dailyActionDone, setDailyActionDone] = useState(false);

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // NEW FEATURE A: Interactive Household Eco Calculator State
  const [householdSize, setHouseholdSize] = useState<number>(2);
  const [weeklyCompostKg, setWeeklyCompostKg] = useState<number>(5);
  const [weeklyRecycleKg, setWeeklyRecycleKg] = useState<number>(7);

  // NEW FEATURE B: Local Collection Schedule Finder State
  const [selectedZone, setSelectedZone] = useState<string>('South Chennai');
  const [reminderSet, setReminderSet] = useState(false);

  // NEW FEATURE C: Interactive Eco Pledges State
  const [signedPledges, setSignedPledges] = useState<string[]>(['pledge-1']);
  const [pledgeCounts, setPledgeCounts] = useState<Record<string, number>>({
    'pledge-1': 1420,
    'pledge-2': 980,
    'pledge-3': 1650,
    'pledge-4': 1120
  });

  const togglePledge = (pledgeId: string) => {
    if (signedPledges.includes(pledgeId)) {
      setSignedPledges(signedPledges.filter((id) => id !== pledgeId));
      setPledgeCounts((prev) => ({ ...prev, [pledgeId]: Math.max(0, (prev[pledgeId] || 0) - 1) }));
    } else {
      setSignedPledges([...signedPledges, pledgeId]);
      setPledgeCounts((prev) => ({ ...prev, [pledgeId]: (prev[pledgeId] || 0) + 1 }));
    }
  };

  // Calculator computations
  const annualCo2SavedKg = Math.round((weeklyRecycleKg * 1.5 + weeklyCompostKg * 2.1) * 52 * (householdSize / 2));
  const annualTreesSaved = Math.round(annualCo2SavedKg / 21);
  const annualDiversionRate = Math.min(96, Math.round(((weeklyRecycleKg + weeklyCompostKg) / (weeklyRecycleKg + weeklyCompostKg + 2.5)) * 100));

  const filteredQuickItems = QUICK_WASTE_DATABASE.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAnswer = (optionIdx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIdx);
    if (optionIdx === QUIZ_QUESTIONS[quizIdx].correctIdx) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    if (quizIdx + 1 < QUIZ_QUESTIONS.length) {
      setQuizIdx((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setQuizIdx(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-green-800 text-white">
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 animate-fadeIn">
              Sort Smarter, <span className="text-green-300">Live Greener</span>
            </h1>
            <p className="text-xl mb-8 text-green-50 animate-fadeIn animation-delay-200">
              Join thousands of households making a positive environmental impact through proper waste management.
            </p>
            <div className="flex space-x-4 animate-fadeIn animation-delay-400">
              <Link
                to="/sorting-guide"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
              <Link
                to="/education"
                className="bg-transparent border-2 border-green-300 text-green-300 px-6 py-3 rounded-lg font-medium hover:bg-green-900 hover:bg-opacity-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* NEW FEATURE 1: Instant Waste Classifier Lookup Widget */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 mb-12">
        <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-md">
                  <Sparkles size={18} />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Instant Assistant
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900">Instant Waste Sorting Lookup</h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Unsure which bin an item goes into? Search or select an item below for instant sorting instructions.
              </p>
            </div>

            <div className="relative w-full md:w-72">
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search item (e.g. bottle, battery)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
          </div>

          {/* Quick Select Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {filteredQuickItems.map((item, idx) => {
              const active = selectedQuickItem.name === item.name;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedQuickItem(item)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-emerald-50'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Selected Item Result Card */}
          {selectedQuickItem && (
            <div className="bg-gradient-to-r from-emerald-50/70 via-teal-50/50 to-emerald-50/70 p-5 rounded-xl border border-emerald-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${selectedQuickItem.badgeBg}`}>
                    {selectedQuickItem.category}
                  </span>
                  <h3 className="text-base font-bold text-gray-900">{selectedQuickItem.name}</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed max-w-3xl">
                  {selectedQuickItem.instruction}
                </p>
              </div>

              <Link
                to="/sorting-guide"
                className="shrink-0 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1 shadow-sm"
              >
                Full Sorting Guide <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Features Section (Preserved Original Content) */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How EcoNexus Helps You</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our easy-to-use platform provides all the tools you need to make sustainable waste management a part of your daily routine.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-blue-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow animate-fadeUp">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
                <Recycle className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Sorting Guide</h3>
              <p className="text-gray-600 mb-4">Learn how to properly sort different types of waste with our comprehensive guide.</p>
              <Link to="/sorting-guide" className="text-blue-600 hover:text-blue-800 inline-flex items-center font-medium">
                Explore Guide <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="bg-green-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow animate-fadeUp animation-delay-200">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
                <BarChart className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Waste Tracking</h3>
              <p className="text-gray-600 mb-4">Monitor your waste reduction progress and set personal sustainability goals.</p>
              <Link to="/tracking" className="text-green-600 hover:text-green-800 inline-flex items-center font-medium">
                Track Waste <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="bg-amber-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow animate-fadeUp animation-delay-400">
              <div className="inline-flex items-center justify-center p-3 bg-amber-100 rounded-full mb-4">
                <Map className="h-7 w-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Recycling Centers</h3>
              <p className="text-gray-600 mb-4">Find nearby recycling centers and learn what materials they accept.</p>
              <Link to="/centers" className="text-amber-600 hover:text-amber-800 inline-flex items-center font-medium">
                Find Centers <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="bg-purple-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow animate-fadeUp animation-delay-600">
              <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-4">
                <BookOpen className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Learning Resources</h3>
              <p className="text-gray-600 mb-4">Deepen your understanding of waste management and environmental impact.</p>
              <Link to="/education" className="text-purple-600 hover:text-purple-800 inline-flex items-center font-medium">
                Learn More <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* NEW FEATURE 2: Community Live Impact Metrics */}
      <div className="py-12 bg-gradient-to-r from-emerald-900 to-teal-900 text-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-300">
              Community Progress Dashboard
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">Our Collective Impact So Far</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
              <div className="p-3 bg-emerald-500/20 text-emerald-300 rounded-xl w-fit mx-auto mb-3">
                <Recycle size={28} />
              </div>
              <h3 className="text-3xl font-extrabold text-white">142,850 kg</h3>
              <p className="text-xs text-emerald-200 mt-1">Recyclables Collected</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
              <div className="p-3 bg-emerald-500/20 text-emerald-300 rounded-xl w-fit mx-auto mb-3">
                <Globe size={28} />
              </div>
              <h3 className="text-3xl font-extrabold text-white">89,400 kg</h3>
              <p className="text-xs text-emerald-200 mt-1">CO2 Emissions Avoided</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
              <div className="p-3 bg-emerald-500/20 text-emerald-300 rounded-xl w-fit mx-auto mb-3">
                <TreePine size={28} />
              </div>
              <h3 className="text-3xl font-extrabold text-white">4,210</h3>
              <p className="text-xs text-emerald-200 mt-1">Trees Preserved</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
              <div className="p-3 bg-emerald-500/20 text-emerald-300 rounded-xl w-fit mx-auto mb-3">
                <Zap size={28} />
              </div>
              <h3 className="text-3xl font-extrabold text-white">12,500+</h3>
              <p className="text-xs text-emerald-200 mt-1">Active Eco-Households</p>
            </div>
          </div>
        </div>
      </div>

      {/* NEW FEATURE: Interactive Household Eco-Impact Calculator */}
      <div className="py-16 bg-emerald-50/50 border-y border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 p-6 sm:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2">
                  <Calculator size={14} className="text-emerald-600" /> Real-Time Impact Estimator
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Calculate Your Household Eco Impact</h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Adjust your weekly habits below to see how much $CO_2$, land diversion, and trees your household saves per year!
                </p>
              </div>

              <div className="px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs font-extrabold text-emerald-900 flex items-center gap-2 shrink-0">
                <Sparkles size={16} className="text-amber-500" /> Annual Diversion Score: <span className="text-emerald-700 text-base">{annualDiversionRate}%</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Sliders / Selectors (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Selector 1: Household Size */}
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-gray-800 uppercase tracking-wider block">
                    1. Household Members ({householdSize} {householdSize === 1 ? 'Person' : 'People'})
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { val: 1, label: '1 Person (Single)' },
                      { val: 2, label: '2-3 People (Small)' },
                      { val: 4, label: '4+ People (Family)' }
                    ].map((item) => (
                      <button
                        key={item.val}
                        onClick={() => setHouseholdSize(item.val)}
                        className={`py-3 px-3 rounded-2xl text-xs font-bold transition-all border ${
                          householdSize === item.val
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-300'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-emerald-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selector 2: Weekly Organic Waste Composted */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-extrabold text-gray-800 uppercase tracking-wider">
                    <span>2. Weekly Organic Waste Composted</span>
                    <span className="text-emerald-700 text-sm font-black">{weeklyCompostKg} kg / week</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="1"
                    value={weeklyCompostKg}
                    onChange={(e) => setWeeklyCompostKg(Number(e.target.value))}
                    className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-gray-400">
                    <span>0 kg (None)</span>
                    <span>10 kg (Average)</span>
                    <span>20 kg (Zero-Waste Pro)</span>
                  </div>
                </div>

                {/* Selector 3: Weekly Dry Recyclables Sorted */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-extrabold text-gray-800 uppercase tracking-wider">
                    <span>3. Weekly Recyclables Sorted (Paper, Plastic, Glass)</span>
                    <span className="text-blue-700 text-sm font-black">{weeklyRecycleKg} kg / week</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    step="1"
                    value={weeklyRecycleKg}
                    onChange={(e) => setWeeklyRecycleKg(Number(e.target.value))}
                    className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-gray-400">
                    <span>0 kg (Minimal)</span>
                    <span>12 kg (Standard)</span>
                    <span>25 kg (Max Diversion)</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Results Card (5 cols) */}
              <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 border border-emerald-800">
                <div className="flex items-center gap-2">
                  <Flame className="text-amber-400" size={20} />
                  <h3 className="text-sm font-black uppercase tracking-wider text-emerald-300">Your Annual Eco Savings</h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-200 block">Carbon Footprint Saved</span>
                      <span className="text-2xl font-black text-white">{annualCo2SavedKg} kg CO2e / yr</span>
                    </div>
                    <Globe className="text-emerald-400 shrink-0" size={28} />
                  </div>

                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-200 block">Equivalent Trees Saved</span>
                      <span className="text-2xl font-black text-amber-300">{annualTreesSaved} Mature Trees</span>
                    </div>
                    <TreePine className="text-amber-400 shrink-0" size={28} />
                  </div>

                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-200 block">Landfill Diversion Rate</span>
                      <span className="text-2xl font-black text-emerald-300">{annualDiversionRate}% Diverted</span>
                    </div>
                    <ShieldCheck className="text-emerald-300 shrink-0" size={28} />
                  </div>
                </div>

                <Link
                  to="/tracking"
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 rounded-2xl font-black text-xs text-center shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  Log Scraps to Daily Tracker <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Section (Preserved Original Content) */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Make a Real Impact</h2>
              <p className="text-lg text-gray-600 mb-6">
                Every piece of waste properly sorted makes a difference. Join our community of eco-conscious individuals making the world a cleaner place.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-green-500 rounded-full text-white flex items-center justify-center">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-800">Reduce Landfill Waste</h4>
                    <p className="mt-1 text-gray-600">When you properly sort recyclables and compostables, you significantly reduce what goes to landfills.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-green-500 rounded-full text-white flex items-center justify-center">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-800">Conserve Resources</h4>
                    <p className="mt-1 text-gray-600">Recycling conserves natural resources and reduces the energy needed to produce new materials.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-green-500 rounded-full text-white flex items-center justify-center">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-800">Reduce Pollution</h4>
                    <p className="mt-1 text-gray-600">Proper waste management reduces greenhouse gas emissions and prevents toxic substances from entering our environment.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-5/12">
              <div className="rounded-xl overflow-hidden shadow-xl">
                <img
                  src="https://thaka.bing.com/th/id/OIP.CYyxyseBSiYt2vuN2jePSgHaFj?rs=1&pid=ImgDetMain"
                  alt="Environmental impact"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW FEATURE 3 & 4: Daily Action & Interactive Recycling IQ Quiz */}
      <div className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Daily Eco Action Card */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-emerald-700 text-white text-xs font-bold rounded-full">
                    Action of the Day
                  </span>
                  <span className="text-xs font-semibold text-emerald-800">+50 Eco Points</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Audit Your Pantry for Plastic Clamshell Packaging
                </h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Today's challenge: Check your kitchen pantry for food items packed in single-use plastic clamshells. Write down 3 loose produce alternatives you can buy on your next grocery run!
                </p>
              </div>

              <button
                onClick={() => setDailyActionDone(!dailyActionDone)}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm ${
                  dailyActionDone
                    ? 'bg-emerald-700 text-white'
                    : 'bg-white text-emerald-800 border-2 border-emerald-600 hover:bg-emerald-50'
                }`}
              >
                {dailyActionDone ? (
                  <>
                    <CheckCircle2 size={18} /> Action Completed! (+50 Eco Points)
                  </>
                ) : (
                  'Mark Action Complete Today'
                )}
              </button>
            </div>

            {/* Interactive Recycling IQ Mini Quiz */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="text-emerald-700" size={20} />
                    <h3 className="text-lg font-bold text-gray-900">Recycling IQ Mini Challenge</h3>
                  </div>
                  <span className="text-xs font-bold text-gray-500">
                    Question {quizIdx + 1} of {QUIZ_QUESTIONS.length}
                  </span>
                </div>

                {!quizFinished ? (
                  <div>
                    <h4 className="text-base font-semibold text-gray-800 mb-4">
                      {QUIZ_QUESTIONS[quizIdx].question}
                    </h4>

                    <div className="space-y-2 mb-4">
                      {QUIZ_QUESTIONS[quizIdx].options.map((opt, optionIdx) => {
                        let btnStyle = 'bg-gray-50 text-gray-800 hover:bg-gray-100 border-gray-200';
                        if (selectedAnswer !== null) {
                          if (optionIdx === QUIZ_QUESTIONS[quizIdx].correctIdx) {
                            btnStyle = 'bg-emerald-100 text-emerald-900 border-emerald-400 font-bold';
                          } else if (optionIdx === selectedAnswer) {
                            btnStyle = 'bg-red-50 text-red-800 border-red-300';
                          }
                        }

                        return (
                          <button
                            key={optionIdx}
                            disabled={selectedAnswer !== null}
                            onClick={() => handleSelectAnswer(optionIdx)}
                            className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {selectedAnswer !== null && (
                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-900 mb-4">
                        💡 <strong>Explanation:</strong> {QUIZ_QUESTIONS[quizIdx].explanation}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Award size={48} className="mx-auto text-amber-500 mb-2" />
                    <h4 className="text-xl font-bold text-gray-900 mb-1">Quiz Completed!</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      You scored <strong>{quizScore}</strong> out of <strong>{QUIZ_QUESTIONS.length}</strong>!
                    </p>
                    <button
                      onClick={handleResetQuiz}
                      className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1"
                    >
                      <RotateCcw size={14} /> Try Again
                    </button>
                  </div>
                )}
              </div>

              {!quizFinished && selectedAnswer !== null && (
                <button
                  onClick={handleNextQuiz}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition-colors"
                >
                  {quizIdx + 1 < QUIZ_QUESTIONS.length ? 'Next Question' : 'View Results'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* NEW FEATURE B: Interactive Local Waste Pickup Schedule Finder */}
      <div className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 sm:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2">
                  <Calendar size={14} className="text-emerald-600" /> Municipal Collection Timetable
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Local Waste Pickup Schedule Finder</h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Select your residential zone to view local curbside pickup days and doorstep collection schedules.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-emerald-700" />
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-2xl text-xs sm:text-sm font-bold text-gray-800 focus:ring-2 focus:ring-emerald-500 shadow-xs"
                >
                  <option value="South Chennai">South Chennai (Adyar, Velachery, OMR)</option>
                  <option value="Central Chennai">Central Chennai (T. Nagar, Mylapore, Anna Nagar)</option>
                  <option value="North Chennai">North Chennai (Royapuram, Washermanpet)</option>
                  <option value="West Chennai">West Chennai (Porur, Tambaram, Chromepet)</option>
                  <option value="Rest of Tamil Nadu">Rest of Tamil Nadu / Suburbs</option>
                </select>
              </div>
            </div>

            {/* Schedule Cards Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-emerald-50/70 p-6 rounded-2xl border border-emerald-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">🥬</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-950 text-[10px] font-black uppercase">
                      Daily Morning
                    </span>
                  </div>
                  <h3 className="text-base font-black text-emerald-950 mb-1">Wet Organic Waste & Scraps</h3>
                  <p className="text-xs text-emerald-900 leading-relaxed mb-4">
                    Food scraps, fruit peels, coffee grounds, and yard trimmings.
                  </p>
                </div>
                <div className="text-xs font-bold text-emerald-900 bg-white p-3 rounded-xl border border-emerald-200">
                  ⏰ Pickup Time: 6:00 AM – 9:30 AM (Daily)
                </div>
              </div>

              <div className="bg-blue-50/70 p-6 rounded-2xl border border-blue-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">♻️</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-200 text-blue-950 text-[10px] font-black uppercase">
                      Bi-Weekly
                    </span>
                  </div>
                  <h3 className="text-base font-black text-blue-950 mb-1">Dry Recyclable Packaging</h3>
                  <p className="text-xs text-blue-900 leading-relaxed mb-4">
                    Clean paper, cardboard boxes, plastic bottles (#1 & #2), and glass jars.
                  </p>
                </div>
                <div className="text-xs font-bold text-blue-900 bg-white p-3 rounded-xl border border-blue-200">
                  ⏰ Pickup Days: Wednesday & Saturday
                </div>
              </div>

              <div className="bg-rose-50/70 p-6 rounded-2xl border border-rose-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">🔋</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-200 text-rose-950 text-[10px] font-black uppercase">
                      Monthly Special
                    </span>
                  </div>
                  <h3 className="text-base font-black text-rose-950 mb-1">Hazardous & E-Waste Drive</h3>
                  <p className="text-xs text-rose-900 leading-relaxed mb-4">
                    Household batteries, electronics, bulbs, and chemical containers.
                  </p>
                </div>
                <div className="text-xs font-bold text-rose-900 bg-white p-3 rounded-xl border border-rose-200">
                  ⏰ Special Drive: 1st Sunday of Every Month
                </div>
              </div>
            </div>

            {/* Reminder Alert Banner */}
            <div className="bg-emerald-950 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Bell className="text-amber-400 shrink-0" size={24} />
                <div>
                  <h4 className="text-sm font-bold text-white">Never Miss a Dry Recyclables Pickup Day</h4>
                  <p className="text-xs text-emerald-200">Get automated notifications for {selectedZone} schedule updates.</p>
                </div>
              </div>

              <button
                onClick={() => setReminderSet(!reminderSet)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all shrink-0 flex items-center gap-1.5 ${
                  reminderSet
                    ? 'bg-amber-400 text-amber-950'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-emerald-950'
                }`}
              >
                {reminderSet ? '✓ Reminders Enabled!' : 'Set Schedule Reminder'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* NEW FEATURE C: Interactive Community Eco Pledges Board */}
      <div className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2">
              <HeartHandshake size={14} className="text-emerald-600" /> Join 12,000+ Eco-Citizens
            </div>
            <h2 className="text-3xl font-black text-gray-900">Take the Household Eco-Pledge</h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Commit to simple daily sustainability goals. Sign a pledge below to unlock your digital Eco Badge!
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 'pledge-1',
                title: 'Zero Single-Use Plastic Water Bottles',
                icon: '🥤',
                desc: 'I pledge to carry a reusable stainless steel or glass bottle instead of buying single-use PET bottles.',
                badge: 'Hydration Hero'
              },
              {
                id: 'pledge-2',
                title: '100% Home Food Scrap Composting',
                icon: '🍂',
                desc: 'I pledge to divert all vegetable peels, coffee grounds, and food scraps from landfills into compost.',
                badge: 'Compost Champion'
              },
              {
                id: 'pledge-3',
                title: 'Safe E-Waste & Battery Recycling',
                icon: '🔋',
                desc: 'I pledge never to toss batteries or broken electronics into household trash bins.',
                badge: 'E-Waste Guardian'
              },
              {
                id: 'pledge-4',
                title: 'Reusable Cloth Grocery Bags',
                icon: '🛍️',
                desc: 'I pledge to bring reusable canvas bags whenever shopping for groceries or produce.',
                badge: 'Plastic-Free Pioneer'
              }
            ].map((pledge) => {
              const isSigned = signedPledges.includes(pledge.id);
              const count = pledgeCounts[pledge.id] || 1000;

              return (
                <div
                  key={pledge.id}
                  className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                    isSigned
                      ? 'bg-gradient-to-b from-emerald-50 to-teal-50 border-emerald-300 shadow-md ring-2 ring-emerald-400'
                      : 'bg-white border-gray-200 hover:border-emerald-300 shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl">{pledge.icon}</span>
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                        {count.toLocaleString()} Citizens
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-gray-900 mb-2 leading-snug">{pledge.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4">{pledge.desc}</p>
                  </div>

                  <div>
                    <button
                      onClick={() => togglePledge(pledge.id)}
                      className={`w-full py-3 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                        isSigned
                          ? 'bg-emerald-700 text-white'
                          : 'bg-gray-100 hover:bg-emerald-100 text-gray-800 hover:text-emerald-900'
                      }`}
                    >
                      {isSigned ? (
                        <>
                          <CheckCircle2 size={16} /> Pledge Signed ({pledge.badge})
                        </>
                      ) : (
                        'Sign Eco Pledge Now'
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Connect With Us Feedback Section */}
      <ConnectWithUsSection />

      {/* CTA Section (Preserved Original Content) */}
      <div className="bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Start using EcoNexus today and join thousands of households reducing their environmental footprint.
          </p>
          <Link
            to="/sorting-guide"
            className="inline-block bg-white text-green-700 px-8 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors shadow-lg hover:shadow-xl"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;