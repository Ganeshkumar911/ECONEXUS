import React, { useState } from 'react';
import {
  X,
  Star,
  Clock,
  Award,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  Bookmark,
  Share2,
  Building2,
  User,
  Sparkles,
  Layers
} from 'lucide-react';
import { Course } from '../types';
import { getCourseProgress, toggleModuleCompletion, toggleSavedCourse, getSavedCourseIds } from '../utils/courseStorage';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onBookmarkChange?: () => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({ course, onClose, onBookmarkChange }) => {
  if (!course) return null;

  const [activeTab, setActiveTab] = useState<'syllabus' | 'overview' | 'platform'>('syllabus');
  const [isSaved, setIsSaved] = useState<boolean>(() => getSavedCourseIds().includes(course.id));
  const [progress, setProgress] = useState(() => getCourseProgress(course.id));
  const [copiedLink, setCopiedLink] = useState(false);

  const completedModuleIds = new Set(progress?.completedModuleIds || []);
  const completionPercentage = course.modules.length > 0
    ? Math.round((completedModuleIds.size / course.modules.length) * 100)
    : 0;

  const handleToggleModule = (moduleId: string) => {
    const updated = toggleModuleCompletion(course.id, moduleId);
    setProgress(updated);
  };

  const handleToggleSave = () => {
    toggleSavedCourse(course.id);
    setIsSaved(!isSaved);
    if (onBookmarkChange) onBookmarkChange();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(course.platformUrl || window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header banner */}
        <div className="relative bg-gradient-to-r from-emerald-900 via-green-800 to-teal-900 text-white p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full text-white shadow-sm"
              style={{ backgroundColor: course.platform.brandColor }}
            >
              {course.platform.name}
            </span>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/15 text-emerald-100 backdrop-blur-md">
              {course.category}
            </span>
            {course.badge && (
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-400 text-amber-950 flex items-center gap-1 shadow-sm">
                <Sparkles size={12} /> {course.badge}
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight">
            {course.title}
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base max-w-3xl mb-4 leading-relaxed">
            {course.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-emerald-100 pt-2 border-t border-emerald-700/50">
            <div className="flex items-center text-amber-300 font-semibold">
              <Star size={16} className="fill-amber-300 mr-1" />
              <span>{course.rating.toFixed(1)}</span>
              <span className="text-emerald-200 ml-1">({course.reviewsCount.toLocaleString()} reviews)</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-1 text-emerald-300" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <Layers size={16} className="mr-1 text-emerald-300" />
              <span>{course.level}</span>
            </div>
            <div className="flex items-center">
              <Award size={16} className="mr-1 text-emerald-300" />
              <span>{course.certificateAvailable ? 'Certificate Included' : 'No Certificate'}</span>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-emerald-50/80 px-6 py-3 border-b border-emerald-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleSave}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                isSaved
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <Bookmark size={16} className={isSaved ? 'fill-white' : ''} />
              {isSaved ? 'Saved to My Courses' : 'Save for Later'}
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-white text-gray-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              <Share2 size={16} />
              {copiedLink ? 'Link Copied!' : 'Share'}
            </button>
          </div>

          <a
            href={course.platformUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-sm font-bold text-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            style={{ backgroundColor: course.platform.brandColor }}
          >
            <span>Learn on {course.platform.name}</span>
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 px-6 bg-white">
          <button
            onClick={() => setActiveTab('syllabus')}
            className={`py-3 px-4 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'syllabus'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Course Syllabus ({course.modules.length} Modules)
          </button>
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Overview & Outcomes
          </button>
          <button
            onClick={() => setActiveTab('platform')}
            className={`py-3 px-4 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'platform'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Platform & Provider Details
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Progress Banner */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Your Learning Tracker
              </span>
              <h4 className="text-sm font-bold text-gray-800">
                {completedModuleIds.size} of {course.modules.length} Modules Completed ({completionPercentage}%)
              </h4>
            </div>
            <div className="w-full sm:w-48 bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* TAB 1: SYLLABUS */}
          {activeTab === 'syllabus' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <BookOpen className="text-emerald-600" size={20} />
                  Curriculum Breakdown
                </h3>
                <span className="text-xs text-gray-500">
                  Check items to mark progress
                </span>
              </div>

              <div className="space-y-3">
                {course.modules.map((module, idx) => {
                  const isDone = completedModuleIds.has(module.id);
                  return (
                    <div
                      key={module.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isDone
                          ? 'bg-emerald-50/60 border-emerald-200'
                          : 'bg-white border-gray-200 hover:border-emerald-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => handleToggleModule(module.id)}
                          className="mt-1 focus:outline-none group"
                          aria-label={`Toggle module ${module.title}`}
                        >
                          <CheckCircle2
                            size={22}
                            className={`transition-colors ${
                              isDone
                                ? 'text-emerald-600 fill-emerald-100'
                                : 'text-gray-300 group-hover:text-emerald-500'
                            }`}
                          />
                        </button>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                            <h4 className={`text-base font-semibold ${isDone ? 'text-emerald-900 line-through' : 'text-gray-900'}`}>
                              {module.title}
                            </h4>
                            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                              {module.duration}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2">
                            {module.summary}
                          </p>

                          {module.topics && module.topics.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-2">
                              {module.topics.map((topic, i) => (
                                <span
                                  key={i}
                                  className="text-[11px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 font-medium"
                                >
                                  • {topic}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: OVERVIEW & OUTCOMES */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">About This Course</h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {course.overview}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-emerald-600" />
                  What You Will Learn
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.learningOutcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
                      <div className="w-2 h-2 rounded-full bg-emerald-600 mt-2 shrink-0"></div>
                      <span className="text-xs sm:text-sm text-gray-800 font-medium leading-snug">
                        {outcome}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PLATFORM & PROVIDER */}
          {activeTab === 'platform' && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Institution */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-lg">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-500 uppercase">Academic Institution</span>
                      <h4 className="text-base font-bold text-gray-900">{course.institution}</h4>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Delivered by world-renowned academic faculty and environmental engineering departments.
                  </p>
                </div>

                {/* Instructor */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 bg-blue-100 text-blue-800 rounded-lg">
                      <User size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-500 uppercase">Lead Instructor</span>
                      <h4 className="text-base font-bold text-gray-900">{course.instructor}</h4>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Recognized expert in sustainable materials, circular economy systems, and municipal waste management.
                  </p>
                </div>
              </div>

              {/* Platform Info */}
              <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl text-white font-extrabold flex items-center justify-center text-lg shadow-sm shrink-0"
                    style={{ backgroundColor: course.platform.brandColor }}
                  >
                    {course.platform.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900">
                      Hosted on {course.platform.name}
                    </h4>
                    <p className="text-xs text-gray-600">
                      Access video lectures, interactive quizzes, peer discussions, and official certificates on {course.platform.name}.
                    </p>
                  </div>
                </div>

                <a
                  href={course.platformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-md hover:shadow-lg transition-all"
                  style={{ backgroundColor: course.platform.brandColor }}
                >
                  Visit Official Course Page
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {course.isFree ? (
              <span className="text-emerald-700 font-bold bg-emerald-100 px-2.5 py-1 rounded-md">
                100% Free Course
              </span>
            ) : (
              <span className="text-gray-700 font-bold bg-gray-200 px-2.5 py-1 rounded-md">
                Paid / Subscription
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold text-sm rounded-xl transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
