import React, { useState } from 'react';
import { Menu, X, Leaf, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-green-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Leaf className="h-8 w-8 text-green-400" />
              <span className="ml-2 text-xl font-bold">EcoNexus</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-green-300 transition-colors text-sm font-medium">
              Home
            </Link>
            <Link to="/sorting-guide" className="hover:text-green-300 transition-colors text-sm font-medium flex items-center gap-1">
              Sorting Guide {!isAuthenticated && <Lock size={12} className="text-amber-300 opacity-90" />}
            </Link>
            <Link to="/tracking" className="hover:text-green-300 transition-colors text-sm font-medium flex items-center gap-1">
              Waste Tracking {!isAuthenticated && <Lock size={12} className="text-amber-300 opacity-90" />}
            </Link>
            <Link to="/centers" className="hover:text-green-300 transition-colors text-sm font-medium flex items-center gap-1">
              Recycling Centers {!isAuthenticated && <Lock size={12} className="text-amber-300 opacity-90" />}
            </Link>
            <Link to="/education" className="hover:text-green-300 transition-colors text-sm font-medium flex items-center gap-1">
              Learn {!isAuthenticated && <Lock size={12} className="text-amber-300 opacity-90" />}
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/achievements" className="hover:text-green-300 transition-colors text-sm font-medium">
                  Achievements
                </Link>
                <Link to="/profile" className="hover:text-green-300 transition-colors text-sm font-medium">
                  Profile
                </Link>
                <button
                  onClick={onLogout}
                  className="bg-green-900 hover:bg-green-950 px-3.5 py-1.5 rounded-xl text-sm font-bold transition-colors text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="bg-amber-400 hover:bg-amber-300 text-amber-950 px-4 py-1.5 rounded-xl text-sm font-black transition-transform active:scale-95 shadow-sm">
                  Login
                </Link>
                <Link to="/register" className="bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 rounded-xl text-sm font-bold border border-white/20 transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-100 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-green-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/sorting-guide" 
              className="px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition-colors flex items-center justify-between"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Sorting Guide</span>
              {!isAuthenticated && <Lock size={14} className="text-amber-300" />}
            </Link>
            <Link 
              to="/tracking" 
              className="px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition-colors flex items-center justify-between"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Waste Tracking</span>
              {!isAuthenticated && <Lock size={14} className="text-amber-300" />}
            </Link>
            <Link 
              to="/centers" 
              className="px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition-colors flex items-center justify-between"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Recycling Centers</span>
              {!isAuthenticated && <Lock size={14} className="text-amber-300" />}
            </Link>
            <Link 
              to="/education" 
              className="px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition-colors flex items-center justify-between"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Learn</span>
              {!isAuthenticated && <Lock size={14} className="text-amber-300" />}
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/achievements" 
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Achievements
                </Link>
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;