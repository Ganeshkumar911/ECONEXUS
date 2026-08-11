import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserProfile } from '../types';
import { userProfile as defaultProfile } from '../data/userProfile';

interface RegisterPageProps {
  onRegister: (user: { email: string; password: string; profile: UserProfile }) => { success: boolean; error?: string };
  registrationExists: boolean;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister, registrationExists }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    place: '',
    pincode: '',
    phone: '',
    address: '',
    bio: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please complete all required fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const profile: UserProfile = {
      name: formData.name,
      email: formData.email,
      avatar: defaultProfile.avatar,
      dateOfBirth: formData.dateOfBirth,
      place: formData.place,
      pincode: formData.pincode,
      phone: formData.phone,
      address: formData.address,
      bio: formData.bio,
      stats: {
        totalWasteReduced: 0,
        recyclablesCollected: 0,
        compostCreated: 0,
        streakDays: 0
      },
      achievements: defaultProfile.achievements.map(achievement => ({
        ...achievement,
        unlocked: false
      })),
      trackingData: []
    };

    const result = onRegister({
      email: formData.email,
      password: formData.password,
      profile
    });

    if (!result.success) {
      setError(result.error || 'Failed to register account.');
      return;
    }

    navigate('/login', { replace: true, state: { registeredEmail: formData.email } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Create Your EcoNexus Account</h1>
          <p className="text-gray-600 mb-6">
            Register once to save your profile, track your waste logs, and unlock progress insights.
          </p>

          {registrationExists && (
            <div className="mb-6 rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-yellow-800">
              A saved account is already present, but you can still create a new account here. <Link to="/login" className="font-semibold text-yellow-900 underline">Go to login</Link>.
            </div>
          )}

          {error && <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">{error}</div>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="place" className="block text-sm font-medium text-gray-700">Place</label>
                <input
                  id="place"
                  name="place"
                  type="text"
                  value={formData.place}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Profile Notes</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                placeholder="Add a few details about yourself, your recycling goals, or your neighborhood."
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Register and Continue
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            Already registered? <Link to="/login" className="text-green-700 font-semibold underline">Login instead</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
