import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Lock, LogIn, UserPlus, Home, ShieldAlert, Sparkles, CheckCircle2, Recycle, BarChart, Map, BookOpen } from 'lucide-react';

interface PleaseLoginViewProps {
  featureName: string;
  targetPath: string;
}

export const PleaseLoginView: React.FC<PleaseLoginViewProps> = ({ featureName, targetPath }) => {
  const location = useLocation();

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-emerald-50/50 via-gray-50 to-emerald-50/30 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-emerald-100 p-8 sm:p-12 text-center relative overflow-hidden">
        {/* Top Decorative Header */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 border-2 border-amber-300 text-amber-600 flex items-center justify-center shadow-lg mb-6 animate-bounce">
          <Lock size={40} />
        </div>

        {/* Please Login Title */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-black uppercase tracking-wider mb-3">
          <ShieldAlert size={15} /> Access Restricted
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3 tracking-tight">
          Please Login to Access <span className="text-emerald-700">{featureName}</span>
        </h1>

        <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto mb-8 leading-relaxed">
          Access to <strong>{featureName}</strong> and other core features is restricted to registered members. Please log in or create a free EcoSort account to continue.
        </p>

        {/* Feature Highlights Grid */}
        <div className="bg-emerald-50/60 p-6 rounded-2xl border border-emerald-100 mb-8 text-left">
          <h3 className="text-xs font-black text-emerald-950 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Sparkles size={16} className="text-amber-500" /> What You Unlock Upon Logging In:
          </h3>
          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-emerald-100 flex items-center gap-2 font-bold text-gray-800 shadow-xs">
              <Recycle size={18} className="text-emerald-600 shrink-0" />
              <span>Full Waste Sorting Guide & AI Photo Scanner</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-emerald-100 flex items-center gap-2 font-bold text-gray-800 shadow-xs">
              <BarChart size={18} className="text-blue-600 shrink-0" />
              <span>Personalized Waste Tracking & Impact Stats</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-emerald-100 flex items-center gap-2 font-bold text-gray-800 shadow-xs">
              <Map size={18} className="text-amber-600 shrink-0" />
              <span>Recycling Centers Map & Doorstep Pickup</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-emerald-100 flex items-center gap-2 font-bold text-gray-800 shadow-xs">
              <BookOpen size={18} className="text-purple-600 shrink-0" />
              <span>UNEP Accredited Waste Management Courses</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/login"
            state={{ from: targetPath }}
            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-2xl shadow-lg transition-transform transform active:scale-95 flex items-center justify-center gap-2 text-sm"
          >
            <LogIn size={18} /> Log In Now
          </Link>

          <Link
            to="/register"
            state={{ from: targetPath }}
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-emerald-900 border-2 border-emerald-600 hover:bg-emerald-50 font-extrabold rounded-2xl shadow-xs transition-transform transform active:scale-95 flex items-center justify-center gap-2 text-sm"
          >
            <UserPlus size={18} /> Create Free Account
          </Link>

          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Home size={18} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PleaseLoginView;
