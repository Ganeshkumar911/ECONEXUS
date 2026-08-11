import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import YearlyWasteChart from '../components/YearlyWasteChart';
import { UserProfile } from '../types';
import { getSavedCourseIds, getCourseProgress } from '../utils/courseStorage';
import { COURSES_DATA } from '../data/courses';
import {
  Award,
  BookOpen,
  Sparkles,
  TreePine,
  Zap,
  Droplets,
  Download,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface ProfilePageProps {
  profile: UserProfile | null;
  onUpdateProfile: (profile: UserProfile) => void;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ profile, onUpdateProfile, onLogout }) => {
  const [formData, setFormData] = useState<UserProfile | null>(profile);
  const [reportDownloaded, setReportDownloaded] = useState(false);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md">
          <h2 className="text-xl font-semibold text-gray-900">No profile found.</h2>
          <p className="text-gray-600 mt-2 mb-4">Please login or register to access your profile.</p>
          <Link
            to="/login"
            className="inline-block bg-green-700 text-white px-5 py-2 rounded-lg font-bold text-sm"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? ({ ...prev, [name]: value } as UserProfile) : prev));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please choose an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setFormData((prev) => (prev ? ({ ...prev, avatar: result } as UserProfile) : prev));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (formData) {
      onUpdateProfile(formData);
    }
  };

  // Existing Totals Calculation
  const todayKey = new Date().toISOString().slice(0, 10);
  const monthKey = new Date().toISOString().slice(0, 7);
  const yearKey = new Date().getFullYear().toString();

  const todayTotal = formData.trackingData
    .filter((entry) => entry.date === todayKey)
    .reduce(
      (sum, entry) =>
        sum + ((entry.recyclable || 0) + (entry.compostable || 0) + (entry.hazardous || 0) + (entry.landfill || 0)),
      0
    );
  const monthTotal = formData.trackingData
    .filter((entry) => entry.date.startsWith(monthKey))
    .reduce(
      (sum, entry) =>
        sum + ((entry.recyclable || 0) + (entry.compostable || 0) + (entry.hazardous || 0) + (entry.landfill || 0)),
      0
    );
  const yearTotal = formData.trackingData
    .filter((entry) => entry.date.startsWith(yearKey))
    .reduce(
      (sum, entry) =>
        sum + ((entry.recyclable || 0) + (entry.compostable || 0) + (entry.hazardous || 0) + (entry.landfill || 0)),
      0
    );

  // NEW ENHANCEMENT 1: Dynamic Eco Tier & Level System
  const totalWasteReduced = formData.stats?.totalWasteReduced || yearTotal || 0;
  const streakDays = formData.stats?.streakDays || 0;

  let rankTitle = 'Eco Novice';
  let rankColor = 'bg-blue-100 text-blue-800 border-blue-200';
  let nextRankGoal = 25;
  let rankIcon = '🌱';

  if (totalWasteReduced >= 300) {
    rankTitle = 'Planet Guardian';
    rankColor = 'bg-amber-100 text-amber-900 border-amber-300';
    nextRankGoal = 500;
    rankIcon = '🏆';
  } else if (totalWasteReduced >= 100) {
    rankTitle = 'Zero-Waste Ambassador';
    rankColor = 'bg-purple-100 text-purple-900 border-purple-300';
    nextRankGoal = 300;
    rankIcon = '🌍';
  } else if (totalWasteReduced >= 25) {
    rankTitle = 'Recycling Ranger';
    rankColor = 'bg-emerald-100 text-emerald-900 border-emerald-300';
    nextRankGoal = 100;
    rankIcon = '♻️';
  }

  const progressToNext = Math.min(100, Math.round((totalWasteReduced / nextRankGoal) * 100));

  // NEW ENHANCEMENT 2: Environmental Savings Calculator
  const co2SavedKg = (totalWasteReduced * 1.85).toFixed(1);
  const waterSavedLiters = Math.round(totalWasteReduced * 42);
  const energySavedKwh = (totalWasteReduced * 2.3).toFixed(1);

  // NEW ENHANCEMENT 3: Saved Courses
  const savedCourseIds = getSavedCourseIds();
  const savedCourses = COURSES_DATA.filter((c) => savedCourseIds.includes(c.id));

  // NEW ENHANCEMENT 4: Certificate Exporter
  const handleExportCertificate = () => {
    setReportDownloaded(true);
    const content = `=====================================================
ECOSORT SUSTAINABILITY IMPACT CERTIFICATE
=====================================================
User Name: ${formData.name}
Email: ${formData.email}
Date Issued: ${new Date().toLocaleDateString()}
Location: ${formData.place} (${formData.pincode})

ECO PERFORMANCE SUMMARY:
-----------------------------------------------------
- Current Tier Rank: ${rankTitle}
- Total Waste Diverted: ${totalWasteReduced.toFixed(1)} kg
- Consecutive Day Streak: ${streakDays} days
- Estimated CO2 Avoided: ${co2SavedKg} kg CO2e
- Estimated Water Conserved: ${waterSavedLiters} Liters
- Estimated Energy Saved: ${energySavedKwh} kWh

Thank you for contributing to a cleaner, greener planet!
Official EcoNexus Sustainability Network
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EcoSort_Impact_Report_${formData.name.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    setTimeout(() => setReportDownloaded(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header Section (Preserved Original Content) */}
      <div className="bg-green-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">My Profile</h1>
            <p className="text-green-100 text-lg max-w-3xl">
              Track your progress, view your achievements, and manage your account settings.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCertificate}
              className="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 px-4 py-2 text-white font-semibold hover:bg-emerald-500 transition-colors text-sm shadow-sm"
            >
              <Download size={16} />
              {reportDownloaded ? 'Report Saved!' : 'Export Impact Report'}
            </button>
            <button
              onClick={onLogout}
              className="inline-flex items-center rounded-md bg-white px-4 py-2 text-green-800 font-semibold hover:bg-green-100 transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column Profile Card (Preserved Original Content + Enhanced Tier Badge) */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <img
                  src={formData.avatar}
                  alt={formData.name}
                  className="h-32 w-32 rounded-full object-cover mb-4 ring-4 ring-emerald-50 shadow-md"
                />
                <span className="absolute bottom-3 right-1 text-2xl drop-shadow">{rankIcon}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{formData.name}</h2>

              {/* NEW Tier Badge */}
              <div className={`mt-1 mb-3 px-3 py-1 rounded-full text-xs font-bold border inline-flex items-center gap-1.5 ${rankColor}`}>
                <ShieldCheck size={14} />
                <span>{rankTitle}</span>
              </div>

              <p className="text-gray-600 mb-3 text-sm">{formData.bio || 'EcoNexus user passionate about reducing waste.'}</p>
              <div className="space-y-2 text-sm text-gray-700 w-full text-left bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p><span className="font-semibold text-gray-500">Email:</span> {formData.email}</p>
                <p><span className="font-semibold text-gray-500">Place:</span> {formData.place}</p>
                <p><span className="font-semibold text-gray-500">Pincode:</span> {formData.pincode}</p>
              </div>
            </div>

            {/* NEW Eco Tier Progress */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-1">
                <span>Rank XP Progress</span>
                <span>{totalWasteReduced.toFixed(1)} / {nextRankGoal} kg</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressToNext}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-gray-500 mt-1.5">
                Log {Math.max(0, nextRankGoal - totalWasteReduced).toFixed(1)} kg more waste to reach the next tier!
              </p>
            </div>
          </div>

          {/* Right Column Edit Form (Preserved Original Content) */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Profile</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Place</label>
                <input
                  type="text"
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Profile photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm file:mr-4 file:rounded-full file:border-0 file:bg-green-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-green-700"
                />
                <p className="mt-2 text-sm text-gray-500">Choose a photo from your browser or local drive.</p>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio || ''}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 transition-colors"
              >
                Save Profile
              </button>
              <p className="text-sm text-gray-600">Your details are saved locally and can be updated anytime.</p>
            </div>
          </div>
        </div>
      </div>

      {/* NEW FEATURE: Environmental Savings Footprint Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-gradient-to-r from-emerald-900 to-teal-900 rounded-2xl p-6 text-white shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-amber-400" size={22} />
            <h3 className="text-xl font-bold">Your Calculated Environmental Savings</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-3">
              <div className="p-3 bg-emerald-500/20 rounded-lg text-emerald-300">
                <TreePine size={24} />
              </div>
              <div>
                <h4 className="text-2xl font-extrabold">{co2SavedKg} kg</h4>
                <p className="text-xs text-emerald-200">CO2 Emissions Avoided</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-3">
              <div className="p-3 bg-blue-500/20 rounded-lg text-blue-300">
                <Droplets size={24} />
              </div>
              <div>
                <h4 className="text-2xl font-extrabold">{waterSavedLiters} L</h4>
                <p className="text-xs text-blue-200">Water Conserved</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-3">
              <div className="p-3 bg-amber-500/20 rounded-lg text-amber-300">
                <Zap size={24} />
              </div>
              <div>
                <h4 className="text-2xl font-extrabold">{energySavedKwh} kWh</h4>
                <p className="text-xs text-amber-200">Clean Energy Saved</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats & Yearly Chart (Preserved Original Content) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <YearlyWasteChart data={formData.trackingData} />
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Current Streak</h3>
              <p className="text-4xl font-bold text-green-700">{formData.stats?.streakDays || 0}</p>
              <p className="text-sm text-gray-600 mt-2">days with waste logged consecutively</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Waste Overview</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center justify-between rounded-md bg-green-50 p-3">
                  <span>Today</span>
                  <span className="font-semibold text-green-700">{todayTotal.toFixed(1)} kg</span>
                </div>
                <div className="flex items-center justify-between rounded-md bg-emerald-50 p-3">
                  <span>This month</span>
                  <span className="font-semibold text-emerald-700">{monthTotal.toFixed(1)} kg</span>
                </div>
                <div className="flex items-center justify-between rounded-md bg-lime-50 p-3">
                  <span>This year</span>
                  <span className="font-semibold text-lime-700">{yearTotal.toFixed(1)} kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW FEATURE: My Saved Courses Library Widget */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="text-emerald-700" size={22} />
              <h3 className="text-xl font-bold text-gray-900">My Saved Learning Courses</h3>
            </div>
            <Link
              to="/education"
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
            >
              Browse All Courses <ArrowRight size={14} />
            </Link>
          </div>

          {savedCourses.length === 0 ? (
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center">
              <p className="text-xs sm:text-sm text-gray-600 mb-2">
                You haven't bookmarked any waste management courses yet.
              </p>
              <Link
                to="/education"
                className="inline-block px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold"
              >
                Explore Course Catalog
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedCourses.map((course) => {
                const progress = getCourseProgress(course.id);
                const completedCount = progress?.completedModuleIds?.length || 0;
                const percentage = Math.round((completedCount / course.modules.length) * 100);

                return (
                  <div
                    key={course.id}
                    className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className="px-2 py-0.5 text-[10px] font-extrabold text-white rounded"
                          style={{ backgroundColor: course.platform.brandColor }}
                        >
                          {course.platform.name}
                        </span>
                        <span className="text-[11px] font-semibold text-gray-500">
                          {course.duration}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 line-clamp-1 mb-1">
                        {course.title}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-1 mb-3">{course.institution}</p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-[11px] font-bold text-emerald-900 mb-1">
                        <span>Progress</span>
                        <span>{percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                        <div
                          className="bg-emerald-600 h-1.5 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>

                      <Link
                        to="/education"
                        className="w-full py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold text-center block"
                      >
                        Continue Course
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;