import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface LoginPageProps {
  onLogin: (email: string, password: string) => { success: boolean; error?: string };
  registrationExists: boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, registrationExists }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const registeredEmail = (location.state as { registeredEmail?: string } | null)?.registeredEmail ?? '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!credentials.email || !credentials.password) {
      setError('Please enter both email and password.');
      return;
    }

    const result = onLogin(credentials.email, credentials.password);

    if (result.success) {
      const fromPath = (location.state as { from?: string } | null)?.from || '/sorting-guide';
      window.requestAnimationFrame(() => {
        navigate(fromPath, { replace: true });
      });
    } else {
      setError(result.error || 'Login failed. Check your email and password, or register first.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome Back</h1>
          <p className="text-gray-600 mb-6">
            Login to track your waste, save your entries, and manage your profile.
          </p>

          {!registrationExists && (
            <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-800">
              No account found yet. <Link to="/register" className="font-semibold text-blue-900 underline">Register here</Link>.
            </div>
          )}

          {registeredEmail && (
            <div className="mb-6 rounded-lg border border-green-300 bg-green-50 p-4 text-green-800">
              Account created for <span className="font-semibold">{registeredEmail}</span>. Please sign in to continue.
            </div>
          )}

          {error && <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">{error}</div>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={credentials.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={credentials.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            Need an account? <Link to="/register" className="text-green-700 font-semibold underline">Register now</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
