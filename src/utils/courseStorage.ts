import { Course, CourseCategory, PlatformType } from '../types';
import { COURSES_DATA } from '../data/courses';

const SAVED_COURSES_KEY = 'ecoSortSavedCourses';
const PROGRESS_STORAGE_KEY = 'ecoSortCourseProgress';

export interface UserCourseProgress {
  courseId: string;
  completedModuleIds: string[];
  enrolledAt: string;
  lastAccessed: string;
}

/**
 * Returns all courses with optional dynamic query, category, and platform filtering.
 */
export const getCourses = (filters?: {
  category?: string;
  platform?: string;
  level?: string;
  searchQuery?: string;
  onlyFree?: boolean;
  onlyCertified?: boolean;
}): Course[] => {
  let list = [...COURSES_DATA];

  if (!filters) return list;

  const { category, platform, level, searchQuery, onlyFree, onlyCertified } = filters;

  if (category && category !== 'All') {
    list = list.filter((c) => c.category === category);
  }

  if (platform && platform !== 'All') {
    list = list.filter((c) => c.platform.type === (platform as PlatformType));
  }

  if (level && level !== 'All') {
    list = list.filter((c) => c.level === level || c.level === 'All Levels');
  }

  if (onlyFree) {
    list = list.filter((c) => c.isFree);
  }

  if (onlyCertified) {
    list = list.filter((c) => c.certificateAvailable);
  }

  if (searchQuery && searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q) ||
        c.institution.toLowerCase().includes(q) ||
        c.platform.name.toLowerCase().includes(q) ||
        c.overview.toLowerCase().includes(q)
    );
  }

  return list;
};

/**
 * Returns single course details by ID.
 */
export const getCourseById = (id: string): Course | undefined => {
  return COURSES_DATA.find((c) => c.id === id);
};

/**
 * Retrieves bookmarked/saved course IDs from localStorage.
 */
export const getSavedCourseIds = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SAVED_COURSES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('Failed to parse saved courses from localStorage:', error);
    return [];
  }
};

/**
 * Toggles bookmark status for a course ID. Returns updated array of saved course IDs.
 */
export const toggleSavedCourse = (courseId: string): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const saved = getSavedCourseIds();
    let updated: string[];
    if (saved.includes(courseId)) {
      updated = saved.filter((id) => id !== courseId);
    } else {
      updated = [...saved, courseId];
    }
    localStorage.setItem(SAVED_COURSES_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to toggle saved course:', error);
    return getSavedCourseIds();
  }
};

/**
 * Retrieves progress for all courses.
 */
export const getAllCourseProgress = (): Record<string, UserCourseProgress> => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.error('Failed to parse course progress:', error);
    return {};
  }
};

/**
 * Retrieves progress record for a single course.
 */
export const getCourseProgress = (courseId: string): UserCourseProgress | null => {
  const all = getAllCourseProgress();
  return all[courseId] || null;
};

/**
 * Toggles a module completion for a specific course.
 */
export const toggleModuleCompletion = (courseId: string, moduleId: string): UserCourseProgress => {
  const all = getAllCourseProgress();
  const existing = all[courseId] || {
    courseId,
    completedModuleIds: [],
    enrolledAt: new Date().toISOString(),
    lastAccessed: new Date().toISOString()
  };

  const completed = new Set(existing.completedModuleIds);
  if (completed.has(moduleId)) {
    completed.delete(moduleId);
  } else {
    completed.add(moduleId);
  }

  const updatedProgress: UserCourseProgress = {
    ...existing,
    completedModuleIds: Array.from(completed),
    lastAccessed: new Date().toISOString()
  };

  all[courseId] = updatedProgress;

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(all));
    } catch (error) {
      console.error('Failed to save course progress:', error);
    }
  }

  return updatedProgress;
};
