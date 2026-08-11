import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Play,
  FileText,
  Download,
  ArrowRight,
  Search,
  Filter,
  Star,
  Clock,
  Award,
  ExternalLink,
  Bookmark,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Layers,
  GraduationCap
} from 'lucide-react';
import { Course, CourseCategory, PlatformType, VideoResource, DownloadableResource } from '../types';
import { COURSES_DATA, VIDEO_RESOURCES, DOWNLOADABLE_RESOURCES } from '../data/courses';
import { CourseDetailModal } from '../components/CourseDetailModal';
import { VideoPreviewModal, DocumentPreviewModal } from '../components/ResourcePreviewModal';
import { getSavedCourseIds, getCourseProgress } from '../utils/courseStorage';

const CATEGORIES: CourseCategory[] = [
  'All',
  'Circular Economy',
  'E-Waste Management',
  'Plastics & Recycling',
  'Composting & Organic',
  'Hazardous & Industrial',
  'Zero Waste Living'
];

const PLATFORMS: { label: string; value: string }[] = [
  { label: 'All Platforms', value: 'All' },
  { label: 'Coursera', value: 'Coursera' },
  { label: 'edX', value: 'edX' },
  { label: 'UNEP', value: 'UNEP' },
  { label: 'SWAYAM', value: 'SWAYAM' },
  { label: 'YouTube', value: 'YouTube' },
  { label: 'Udemy', value: 'Udemy' },
  { label: 'OpenLearn', value: 'OpenLearn' }
];

const EducationPage: React.FC = () => {
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>('All');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [onlySaved, setOnlySaved] = useState(false);
  const [onlyFree, setOnlyFree] = useState(false);
  const [onlyCertified, setOnlyCertified] = useState(false);

  // Modal States
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoResource | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<DownloadableResource | null>(null);

  // Bookmark tracking trigger
  const [savedCourseIds, setSavedCourseIds] = useState<string[]>(() => getSavedCourseIds());

  const refreshSavedCourses = () => {
    setSavedCourseIds(getSavedCourseIds());
  };

  // Filtered Courses
  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      // Category
      if (selectedCategory !== 'All' && course.category !== selectedCategory) {
        return false;
      }
      // Platform
      if (selectedPlatform !== 'All' && course.platform.type !== selectedPlatform) {
        return false;
      }
      // Level
      if (selectedLevel !== 'All' && course.level !== selectedLevel) {
        return false;
      }
      // Saved only
      if (onlySaved && !savedCourseIds.includes(course.id)) {
        return false;
      }
      // Free only
      if (onlyFree && !course.isFree) {
        return false;
      }
      // Certificate only
      if (onlyCertified && !course.certificateAvailable) {
        return false;
      }
      // Search
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = course.title.toLowerCase().includes(q);
        const matchesSubtitle = course.subtitle.toLowerCase().includes(q);
        const matchesInstructor = course.instructor.toLowerCase().includes(q);
        const matchesPlatform = course.platform.name.toLowerCase().includes(q);
        const matchesInstitution = course.institution.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSubtitle && !matchesInstructor && !matchesPlatform && !matchesInstitution) {
          return false;
        }
      }
      return true;
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedPlatform,
    selectedLevel,
    onlySaved,
    onlyFree,
    onlyCertified,
    savedCourseIds
  ]);

  // Featured Course (first featured or course-1)
  const featuredCourse = COURSES_DATA.find((c) => c.badge === 'Featured') || COURSES_DATA[0];

  // FAQ Accordion Toggle State
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Which platforms host these waste management courses?',
      a: 'Courses featured on EcoSort are hosted on leading accredited platforms including Coursera, edX, UNEP (United Nations Environment Programme), SWAYAM (Govt. of India), YouTube, Udemy, and OpenLearn. Selecting "Enroll on Platform" takes you directly to the official platform enrollment page.'
    },
    {
      q: 'Are certificates provided upon course completion?',
      a: 'Yes, most courses on Coursera, edX, UNEP, and SWAYAM offer verified digital certificates upon completion. Free courses often allow free auditing of all video lectures, with optional paid certification.'
    },
    {
      q: 'Can pizza boxes and greasy cardboard be recycled?',
      a: 'Pizza boxes or paper contaminated with heavy food oils cannot be processed in standard paper recycling mills as oil weakens paper fibers. However, clean lids can be torn off and recycled, while greasy bottoms can be composted in home or municipal organic bins.'
    },
    {
      q: 'How does EcoSort track my learning progress?',
      a: 'When you open any course details on EcoSort, you can mark individual syllabus modules as completed. EcoSort automatically saves your progress and bookmarks locally in your browser so you can pick up right where you left off.'
    },
    {
      q: 'What is E-Waste and how should it be disposed of safely?',
      a: 'E-Waste includes old phones, computers, circuit boards, batteries, and appliances. They contain valuable recoverable metals (gold, copper) but also toxic heavy metals (lead, mercury). Never throw e-waste in regular household bins—use EcoSort’s Recycling Center locator to find certified E-Waste collection facilities.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-green-800 to-teal-900 text-white py-14 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="p-2 bg-emerald-700/60 rounded-lg text-emerald-200 border border-emerald-600/50">
              <GraduationCap size={28} />
            </span>
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-300">
              EcoSort Sustainability Academy
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
            Learn About Waste Management
          </h1>
          <p className="text-emerald-100 text-base sm:text-lg max-w-3xl leading-relaxed">
            Explore world-class courses, verified syllabus modules, platform learning links (Coursera, edX, UNEP, SWAYAM, YouTube), video masterclasses, and printable guides.
          </p>

          {/* Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 max-w-4xl">
            <div className="bg-emerald-800/50 backdrop-blur-sm border border-emerald-700/60 rounded-xl p-3 text-center">
              <span className="text-2xl font-bold text-white block">{COURSES_DATA.length}+</span>
              <span className="text-xs text-emerald-200">Accredited Courses</span>
            </div>
            <div className="bg-emerald-800/50 backdrop-blur-sm border border-emerald-700/60 rounded-xl p-3 text-center">
              <span className="text-2xl font-bold text-white block">8</span>
              <span className="text-xs text-emerald-200">Learning Platforms</span>
            </div>
            <div className="bg-emerald-800/50 backdrop-blur-sm border border-emerald-700/60 rounded-xl p-3 text-center">
              <span className="text-2xl font-bold text-white block">100%</span>
              <span className="text-xs text-emerald-200">Free Audit Access</span>
            </div>
            <div className="bg-emerald-800/50 backdrop-blur-sm border border-emerald-700/60 rounded-xl p-3 text-center">
              <span className="text-2xl font-bold text-emerald-300 block">{savedCourseIds.length}</span>
              <span className="text-xs text-emerald-200">Saved in My Library</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100/80 transform hover:-translate-y-1 transition-all duration-300">
          <div className="md:flex items-stretch">
            <div className="md:w-1/2 relative min-h-[260px] md:min-h-full">
              <img
                src={featuredCourse.imageUrl}
                alt={featuredCourse.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:hidden" />
              <span className="absolute top-4 left-4 px-3 py-1 bg-amber-400 text-amber-950 text-xs font-bold rounded-full shadow-md flex items-center gap-1">
                <Sparkles size={13} /> {featuredCourse.badge || 'Featured Course'}
              </span>
            </div>

            <div className="p-6 sm:p-8 md:w-1/2 flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="px-2.5 py-0.5 text-xs font-bold text-white rounded-md"
                    style={{ backgroundColor: featuredCourse.platform.brandColor }}
                  >
                    {featuredCourse.platform.name}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {featuredCourse.category}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                  {featuredCourse.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {featuredCourse.subtitle}
                </p>

                <div className="flex flex-wrap items-center gap-3 mb-6 text-xs text-gray-600">
                  <span className="flex items-center text-amber-500 font-bold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">
                    <Star size={14} className="fill-amber-400 mr-1" />
                    {featuredCourse.rating.toFixed(1)} ({featuredCourse.reviewsCount} reviews)
                  </span>
                  <span className="flex items-center bg-gray-100 px-2.5 py-1 rounded-lg font-medium">
                    <Clock size={14} className="mr-1 text-emerald-600" />
                    {featuredCourse.duration}
                  </span>
                  <span className="flex items-center bg-gray-100 px-2.5 py-1 rounded-lg font-medium">
                    <BookOpen size={14} className="mr-1 text-emerald-600" />
                    {featuredCourse.modules.length} Modules
                  </span>
                  <span className="flex items-center bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-lg font-bold">
                    {featuredCourse.isFree ? '100% Free' : 'Paid Course'}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setSelectedCourse(featuredCourse)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md inline-flex items-center gap-2"
                >
                  View Full Syllabus & Details
                  <ArrowRight size={16} />
                </button>

                <a
                  href={featuredCourse.platformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl font-semibold text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors inline-flex items-center gap-1.5"
                >
                  Enroll on {featuredCourse.platform.name}
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Course Explorer & Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              <BookOpen className="text-emerald-700" size={26} />
              Explore Course Catalog
            </h2>
            <p className="text-sm text-gray-600">
              Filter by platform, topic, skill level, or search specific waste management subjects.
            </p>
          </div>

          <div className="text-xs text-gray-500 font-medium">
            Showing <strong>{filteredCourses.length}</strong> of <strong>{COURSES_DATA.length}</strong> available courses
          </div>
        </div>

        {/* Search Bar & Primary Filters */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-200 space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3.5 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by topic, keyword, platform, or instructor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 text-gray-900 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-xs text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Level Select */}
            <div className="w-full sm:w-48">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full py-2.5 px-3 bg-gray-50 text-gray-900 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
              >
                <option value="All">All Skill Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
              Categories:
            </span>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      active
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-900'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Platform Filter Badges */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
              Learning Platforms:
            </span>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map((plat) => {
                const active = selectedPlatform === plat.value;
                return (
                  <button
                    key={plat.value}
                    onClick={() => setSelectedPlatform(plat.value)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      active
                        ? 'bg-gray-900 text-white ring-2 ring-emerald-500'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {plat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Toggles */}
          <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-gray-100 text-xs font-medium text-gray-700">
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-emerald-700">
              <input
                type="checkbox"
                checked={onlySaved}
                onChange={(e) => setOnlySaved(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <Bookmark size={14} className={onlySaved ? 'fill-emerald-600 text-emerald-600' : 'text-gray-400'} />
              <span>Saved Courses Only ({savedCourseIds.length})</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer hover:text-emerald-700">
              <input
                type="checkbox"
                checked={onlyFree}
                onChange={(e) => setOnlyFree(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>100% Free Courses</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer hover:text-emerald-700">
              <input
                type="checkbox"
                checked={onlyCertified}
                onChange={(e) => setOnlyCertified(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <Award size={14} className="text-amber-500" />
              <span>With Certificate</span>
            </label>

            {(searchQuery || selectedCategory !== 'All' || selectedPlatform !== 'All' || selectedLevel !== 'All' || onlySaved || onlyFree || onlyCertified) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedPlatform('All');
                  setSelectedLevel('All');
                  setOnlySaved(false);
                  setOnlyFree(false);
                  setOnlyCertified(false);
                }}
                className="text-emerald-700 hover:underline font-bold ml-auto"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl text-center border border-gray-200 shadow-sm">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-bold text-gray-800 mb-1">No Courses Match Your Filter</h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto mb-4">
              Try adjusting your search terms, clearing platform filters, or turning off specific toggles.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedPlatform('All');
                setSelectedLevel('All');
                setOnlySaved(false);
                setOnlyFree(false);
                setOnlyCertified(false);
              }}
              className="px-4 py-2 bg-emerald-700 text-white rounded-xl font-bold text-xs hover:bg-emerald-800 transition-colors"
            >
              Show All Courses
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const isSaved = savedCourseIds.includes(course.id);
              const progress = getCourseProgress(course.id);
              const completedCount = progress?.completedModuleIds?.length || 0;

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col justify-between group"
                >
                  <div>
                    {/* Course Thumbnail Container */}
                    <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Platform Logo Badge */}
                      <span
                        className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-extrabold text-white rounded-md shadow-md"
                        style={{ backgroundColor: course.platform.brandColor }}
                      >
                        {course.platform.name}
                      </span>

                      {/* Course Badge */}
                      {course.badge && (
                        <span className="absolute top-3 right-3 px-2.5 py-1 text-[11px] font-bold bg-amber-400 text-amber-950 rounded-full shadow-md flex items-center gap-1">
                          <Sparkles size={11} /> {course.badge}
                        </span>
                      )}

                      {/* Category Label bottom overlay */}
                      <span className="absolute bottom-3 left-3 text-xs font-semibold text-white/90 drop-shadow-md">
                        {course.category}
                      </span>
                    </div>

                    {/* Content Section */}
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-2 mb-2 text-xs text-gray-500">
                        <div className="flex items-center text-amber-500 font-bold">
                          <Star size={14} className="fill-amber-400 mr-1" />
                          <span>{course.rating.toFixed(1)}</span>
                          <span className="text-gray-400 font-normal ml-1">({course.reviewsCount})</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={13} className="mr-1 text-gray-400" />
                          <span>{course.duration}</span>
                        </div>
                        <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-700 font-medium">
                          {course.level}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
                        {course.title}
                      </h3>

                      <p className="text-xs text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {course.subtitle}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 pt-3 border-t border-gray-100">
                        <GraduationCap size={14} className="text-emerald-600 shrink-0" />
                        <span className="truncate font-medium">{course.institution}</span>
                      </div>

                      {/* User Progress Indicator if started */}
                      {completedCount > 0 && (
                        <div className="mb-4 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100">
                          <div className="flex items-center justify-between text-[11px] font-bold text-emerald-900 mb-1">
                            <span>Your Progress</span>
                            <span>{completedCount}/{course.modules.length} Modules</span>
                          </div>
                          <div className="w-full bg-emerald-200 rounded-full h-1.5">
                            <div
                              className="bg-emerald-600 h-1.5 rounded-full"
                              style={{ width: `${(completedCount / course.modules.length) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-5 pt-0 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white py-2 px-3 rounded-xl text-xs font-bold transition-colors inline-flex items-center justify-center gap-1 shadow-sm"
                    >
                      Syllabus & Details <ArrowRight size={14} />
                    </button>

                    <a
                      href={course.platformUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
                      title={`Enroll on ${course.platform.name}`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Video Resources Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Play className="text-red-600 fill-red-600" size={24} />
              Video Masterclasses & Facility Tours
            </h2>
            <p className="text-sm text-gray-600">
              Watch high-tech sorting tours, home composting tutorials, and zero-waste living guides.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VIDEO_RESOURCES.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video overflow-hidden bg-gray-900">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 group-hover:bg-red-600 text-red-600 group-hover:text-white flex items-center justify-center shadow-lg transition-all duration-300 transform group-hover:scale-110">
                      <Play size={20} className="ml-0.5 fill-current" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-white text-[11px] font-semibold rounded">
                    {video.duration}
                  </span>
                </div>

                <div className="p-4">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                    {video.category}
                  </span>
                  <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                    {video.description}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4 pt-0 text-[11px] text-gray-400 flex items-center justify-between border-t border-gray-100 font-medium">
                <span>{video.channelName}</span>
                <span>{video.views}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Downloadable Resources */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="text-blue-600" size={24} />
            Printable Guides & Audit Checklists
          </h2>
          <p className="text-sm text-gray-600">
            Download reference cards, waste audit sheets, and compost matrices for household use.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DOWNLOADABLE_RESOURCES.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setSelectedDocument(doc)}
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FileText size={22} />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800">
                    {doc.fileType}
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-blue-700 transition-colors">
                  {doc.title}
                </h3>
                <p className="text-xs text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {doc.description}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-blue-700">
                <span>Preview & Download</span>
                <Download size={15} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-emerald-700 text-white rounded-xl">
              <HelpCircle size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <p className="text-sm text-gray-600">Quick answers about courses, platforms, and waste sorting.</p>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-emerald-100 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left font-bold text-gray-900 flex items-center justify-between gap-4 hover:text-emerald-700 transition-colors text-sm sm:text-base"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={20}
                      className={`text-gray-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'transform rotate-180 text-emerald-700' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-4 pt-0 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onBookmarkChange={refreshSavedCourses}
      />

      {/* Video Preview Modal */}
      <VideoPreviewModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      {/* Document Preview Modal */}
      <DocumentPreviewModal
        document={selectedDocument}
        onClose={() => setSelectedDocument(null)}
      />
    </div>
  );
};

export default EducationPage;