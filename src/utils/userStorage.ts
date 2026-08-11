import { RegisteredUser, UserProfile, WasteTrackingData } from '../types';
import { sendAdminRegistrationNotification } from './adminNotification';

const USERS_STORAGE_KEY = 'ecoNexusUsers';
const SESSION_STORAGE_KEY = 'ecoNexusCurrentSession';
const LEGACY_STORAGE_KEY = 'ecoNexusUser';

/**
 * Normalizes email strings to lowercase for consistent dictionary keys.
 */
export const normalizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

/**
 * Retrieves all registered users from localStorage.
 * Performs automatic migration if legacy single-user storage is detected.
 */
export const getRegisteredUsers = (): Record<string, RegisteredUser> => {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const rawUsers = localStorage.getItem(USERS_STORAGE_KEY);
    let usersMap: Record<string, RegisteredUser> = rawUsers ? JSON.parse(rawUsers) : {};

    // Legacy data migration from single-user storage key 'ecoNexusUser'
    const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacyRaw) {
      try {
        const legacyUser = JSON.parse(legacyRaw);
        if (legacyUser && legacyUser.email && legacyUser.password && legacyUser.profile) {
          const key = normalizeEmail(legacyUser.email);
          if (!usersMap[key]) {
            usersMap[key] = {
              email: legacyUser.email,
              password: legacyUser.password,
              profile: legacyUser.profile
            };
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersMap));
          }
          // Set session if legacy user was logged in
          if (legacyUser.isAuthenticated && !localStorage.getItem(SESSION_STORAGE_KEY)) {
            localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ currentUserEmail: legacyUser.email }));
          }
        }
      } catch (err) {
        console.warn('Failed to migrate legacy user data', err);
      }
    }

    return usersMap;
  } catch (error) {
    console.error('Failed to read registered users from localStorage:', error);
    return {};
  }
};

/**
 * Saves the entire users dictionary back to localStorage.
 */
export const saveRegisteredUsers = (users: Record<string, RegisteredUser>): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Failed to save registered users to localStorage:', error);
  }
};

/**
 * Retrieves a user by email.
 */
export const getUserByEmail = (email: string): RegisteredUser | null => {
  const users = getRegisteredUsers();
  return users[normalizeEmail(email)] || null;
};

/**
 * Registers a new user account. Returns error message string if failed, or null if successful.
 */
export const registerUserAccount = (
  user: { email: string; password: string; profile: UserProfile }
): { success: boolean; error?: string } => {
  const key = normalizeEmail(user.email);
  const users = getRegisteredUsers();

  if (users[key]) {
    return {
      success: false,
      error: 'An account with this email address already exists. Please login instead.'
    };
  }

  // Save new user profile and credentials
  users[key] = {
    email: user.email,
    password: user.password,
    profile: {
      ...user.profile,
      email: user.email // ensure email consistency
    }
  };

  saveRegisteredUsers(users);

  // Automatically send registration details to admin Gmail inbox
  sendAdminRegistrationNotification(users[key].profile);

  return { success: true };
};

/**
 * Authenticates user credentials and sets active session.
 */
export const authenticateUserAccount = (
  email: string,
  password: string
): { success: boolean; profile?: UserProfile; error?: string } => {
  const key = normalizeEmail(email);
  const users = getRegisteredUsers();
  const targetUser = users[key];

  if (!targetUser) {
    return {
      success: false,
      error: 'No account found with this email address. Please register first.'
    };
  }

  if (targetUser.password !== password) {
    return {
      success: false,
      error: 'Incorrect password. Please check your credentials and try again.'
    };
  }

  // Set active session
  setCurrentUserSession(targetUser.email);

  return {
    success: true,
    profile: targetUser.profile
  };
};

/**
 * Sets current logged in session email.
 */
export const setCurrentUserSession = (email: string | null): void => {
  if (typeof window === 'undefined') return;
  try {
    if (email) {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ currentUserEmail: email }));
    } else {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  } catch (error) {
    console.error('Failed to update user session in localStorage:', error);
  }
};

/**
 * Retrieves the currently logged in user email.
 */
export const getCurrentUserSessionEmail = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    const rawSession = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!rawSession) return null;
    const parsed = JSON.parse(rawSession);
    return parsed?.currentUserEmail || null;
  } catch (error) {
    console.error('Failed to read user session from localStorage:', error);
    return null;
  }
};

/**
 * Returns current authenticated UserProfile, or null if no session.
 */
export const getCurrentUserProfile = (): UserProfile | null => {
  const currentEmail = getCurrentUserSessionEmail();
  if (!currentEmail) return null;

  const user = getUserByEmail(currentEmail);
  return user ? user.profile : null;
};

/**
 * Updates profile for currently authenticated user.
 */
export const updateCurrentUserProfile = (updatedProfile: UserProfile): void => {
  const currentEmail = getCurrentUserSessionEmail();
  if (!currentEmail) return;

  const key = normalizeEmail(currentEmail);
  const users = getRegisteredUsers();

  if (users[key]) {
    users[key].profile = updatedProfile;
    saveRegisteredUsers(users);
  }
};

/**
 * Adds a new tracking entry for current user and updates stats & streak.
 */
export const addCurrentUserTrackingEntry = (entry: WasteTrackingData): UserProfile | null => {
  const currentEmail = getCurrentUserSessionEmail();
  if (!currentEmail) return null;

  const key = normalizeEmail(currentEmail);
  const users = getRegisteredUsers();

  if (!users[key]) return null;

  const prevProfile = users[key].profile;
  const updatedTracking = [...(prevProfile.trackingData || []), entry];

  const addedTotal = (entry.recyclable || 0) + (entry.compostable || 0) + (entry.hazardous || 0) + (entry.landfill || 0);

  const prevStats = prevProfile.stats || {
    totalWasteReduced: 0,
    recyclablesCollected: 0,
    compostCreated: 0,
    streakDays: 0
  };

  const updatedStats = {
    ...prevStats,
    totalWasteReduced: (prevStats.totalWasteReduced || 0) + addedTotal,
    recyclablesCollected: (prevStats.recyclablesCollected || 0) + (entry.recyclable || 0),
    compostCreated: (prevStats.compostCreated || 0) + (entry.compostable || 0),
  };

  // compute streak: look for consecutive dates ending at most-recent logged date
  const dateSet = new Set(updatedTracking.map(d => d.date));
  const sortedDates = Array.from(dateSet).sort().reverse();
  let streak = 0;
  if (sortedDates.length > 0) {
    let current = new Date(sortedDates[0]);
    const toISO = (dt: Date) => dt.toISOString().split('T')[0];
    while (dateSet.has(toISO(current))) {
      streak += 1;
      current.setDate(current.getDate() - 1);
    }
  }

  const updatedProfile: UserProfile = {
    ...prevProfile,
    trackingData: updatedTracking,
    stats: {
      ...updatedStats,
      streakDays: streak
    }
  };

  users[key].profile = updatedProfile;
  saveRegisteredUsers(users);

  return updatedProfile;
};

/**
 * Checks if at least one registered account exists.
 */
export const hasAnyRegisteredUser = (): boolean => {
  const users = getRegisteredUsers();
  return Object.keys(users).length > 0;
};
