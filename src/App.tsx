import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SortingGuidePage from './pages/SortingGuidePage';
import TrackingPage from './pages/TrackingPage';
import RecyclingCentersPage from './pages/RecyclingCentersPage';
import EducationPage from './pages/EducationPage';
import ProfilePage from './pages/ProfilePage';
import AchievementsPage from './pages/AchievementsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PleaseLoginView from './components/PleaseLoginView';
import { UserProfile, WasteTrackingData } from './types';
import {
  registerUserAccount,
  authenticateUserAccount,
  getCurrentUserSessionEmail,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  addCurrentUserTrackingEntry,
  setCurrentUserSession,
  hasAnyRegisteredUser
} from './utils/userStorage';

import './index.css';

function App() {
  const [profile, setProfile] = useState<UserProfile | null>(() => getCurrentUserProfile());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => getCurrentUserSessionEmail() !== null);
  const [registrationExists, setRegistrationExists] = useState<boolean>(() => hasAnyRegisteredUser());

  useEffect(() => {
    const activeProfile = getCurrentUserProfile();
    const activeEmail = getCurrentUserSessionEmail();

    if (activeEmail && activeProfile) {
      setProfile(activeProfile);
      setIsAuthenticated(true);
    }
    setRegistrationExists(hasAnyRegisteredUser());
  }, []);

  const handleRegister = (user: { email: string; password: string; profile: UserProfile }) => {
    const result = registerUserAccount(user);
    if (result.success) {
      setRegistrationExists(true);
      return { success: true };
    }
    return { success: false, error: result.error };
  };

  const handleLogin = (email: string, password: string) => {
    const result = authenticateUserAccount(email, password);
    if (result.success && result.profile) {
      setProfile(result.profile);
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: result.error };
  };

  const handleLogout = () => {
    setCurrentUserSession(null);
    setProfile(null);
    setIsAuthenticated(false);
    setRegistrationExists(hasAnyRegisteredUser());
  };

  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    updateCurrentUserProfile(updatedProfile);
    setProfile(updatedProfile);
  };

  const handleAddTrackingEntry = (entry: WasteTrackingData) => {
    const updatedProfile = addCurrentUserTrackingEntry(entry);
    if (updatedProfile) {
      setProfile(updatedProfile);
    }
  };

  const ProtectedRoute: React.FC<{
    isAuthenticated: boolean;
    featureName: string;
    targetPath: string;
    children: React.ReactNode;
  }> = ({ isAuthenticated, featureName, targetPath, children }) => {
    if (!isAuthenticated) {
      return <PleaseLoginView featureName={featureName} targetPath={targetPath} />;
    }
    return <>{children}</>;
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* Protected Feature Routes */}
            <Route
              path="/sorting-guide"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} featureName="Sorting Guide" targetPath="/sorting-guide">
                  <SortingGuidePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tracking"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} featureName="Waste Tracking" targetPath="/tracking">
                  <TrackingPage initialTrackingData={profile?.trackingData ?? []} onNewEntry={handleAddTrackingEntry} profile={profile} onUpdateProfile={handleProfileUpdate} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/centers"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} featureName="Recycling Centers" targetPath="/centers">
                  <RecyclingCentersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/education"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} featureName="Learn" targetPath="/education">
                  <EducationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} featureName="User Profile" targetPath="/profile">
                  <ProfilePage profile={profile} onUpdateProfile={handleProfileUpdate} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/achievements"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} featureName="Achievements" targetPath="/achievements">
                  <AchievementsPage profile={profile} />
                </ProtectedRoute>
              }
            />

            {/* Auth Routes */}
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/sorting-guide" replace /> : <LoginPage onLogin={handleLogin} registrationExists={registrationExists} />}
            />
            <Route
              path="/register"
              element={isAuthenticated ? <Navigate to="/sorting-guide" replace /> : <RegisterPage onRegister={handleRegister} registrationExists={registrationExists} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;