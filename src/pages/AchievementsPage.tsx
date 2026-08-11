import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AchievementCard from '../components/AchievementCard';
import { getAchievementsForProfile } from '../data/achievements';
import { UserProfile, Achievement } from '../types';
import { Award, Trophy, Sparkles, CheckCircle2, Lock, Download, ArrowLeft, Star, ShieldCheck, X } from 'lucide-react';

interface AchievementsPageProps {
  profile: UserProfile | null;
}

const AchievementsPage: React.FC<AchievementsPageProps> = ({ profile }) => {
  const achievements = getAchievementsForProfile(profile);
  const unlockedCount = achievements.filter((achievement) => achievement.unlocked).length;

  // Filter Status tab state
  const [activeTab, setActiveTab] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  // Calculate Total XP Points (100 XP per unlocked achievement)
  const totalXp = unlockedCount * 100;
  const totalPossibleXp = achievements.length * 100;
  const xpPct = achievements.length > 0 ? Math.round((totalXp / totalPossibleXp) * 100) : 0;

  const filteredAchievements = achievements.filter((ach) => {
    if (activeTab === 'unlocked') return ach.unlocked;
    if (activeTab === 'locked') return !ach.unlocked;
    return true;
  });

  const handleDownloadBadges = () => {
    const unlockedAchievements = achievements.filter((achievement) => achievement.unlocked);
    const content = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>EcoNexus Badges</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 24px; color: #14532d; }
      h1 { margin-bottom: 8px; }
      .badge { border: 1px solid #86efac; border-radius: 8px; padding: 12px; margin-bottom: 10px; }
    </style>
  </head>
  <body>
    <h1>EcoNexus Achievement Badges</h1>
    <p>Unlocked: ${unlockedAchievements.length} of ${achievements.length} | Total XP: ${totalXp} Points</p>
    ${unlockedAchievements
      .map((achievement) => `<div class="badge"><strong>${achievement.title}</strong><br />${achievement.description}</div>`)
      .join('')}
  </body>
</html>`;

    const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'econexus-badges.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-green-800 to-teal-900 text-white py-12 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-800/80 rounded-full text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Trophy className="h-3.5 w-3.5 text-amber-400" />
              Gamified Eco Milestones
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Achievements</h1>
            <p className="text-green-100 text-base md:text-lg max-w-3xl leading-relaxed">
              Complete eco-friendly actions, track waste entries, and build recycling streaks to unlock badges and earn Eco XP points.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-center shrink-0">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-300 block">
              Total Earned Score
            </span>
            <div className="flex items-center justify-center gap-1.5 text-3xl font-black text-amber-300 mt-0.5">
              <Sparkles size={24} /> {totalXp} <span className="text-sm font-semibold text-emerald-100">XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Controls Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-gray-900">Your Achievement Library</h2>
                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                  Level {Math.floor(totalXp / 300) + 1}
                </span>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm">
                {unlockedCount} of {achievements.length} badges unlocked ({xpPct}% Progress).
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleDownloadBadges}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700 transition-colors shadow-sm"
              >
                <Download size={15} /> Download Badges
              </button>
              <Link
                to="/profile"
                className="inline-flex items-center gap-1 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-800 transition-colors shadow-sm"
              >
                <ArrowLeft size={15} /> Back to Profile
              </Link>
            </div>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Badges ({achievements.length})
            </button>
            <button
              onClick={() => setActiveTab('unlocked')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                activeTab === 'unlocked'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <CheckCircle2 size={14} /> Unlocked ({unlockedCount})
            </button>
            <button
              onClick={() => setActiveTab('locked')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                activeTab === 'locked'
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Lock size={14} /> Locked ({achievements.length - unlockedCount})
            </button>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mt-8">
          {filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              onClick={() => setSelectedAchievement(achievement)}
              className="cursor-pointer transform hover:-translate-y-1 transition-all duration-200"
            >
              <AchievementCard achievement={achievement} />
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedAchievement(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <X size={20} />
            </button>

            <div className="text-center pt-2">
              <div
                className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg ${
                  selectedAchievement.unlocked
                    ? 'bg-emerald-100 text-emerald-700 ring-4 ring-emerald-50'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                <Trophy size={40} />
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider inline-block mb-2 ${
                  selectedAchievement.unlocked
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {selectedAchievement.unlocked ? 'Unlocked Badge' : 'Locked Badge'}
              </span>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedAchievement.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-4">{selectedAchievement.description}</p>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs text-gray-700 space-y-1 text-left mb-4">
                <p>
                  <strong className="text-gray-900">Reward:</strong> +100 Eco XP Points
                </p>
                <p>
                  <strong className="text-gray-900">Status:</strong>{' '}
                  {selectedAchievement.unlocked
                    ? 'Completed & Granted to Profile'
                    : 'Log more waste activities in your tracking dashboard to unlock'}
                </p>
              </div>

              <button
                onClick={() => setSelectedAchievement(null)}
                className="w-full py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementsPage;
