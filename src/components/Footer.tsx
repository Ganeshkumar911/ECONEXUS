import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">EcoNexus</h3>
            <p className="text-green-300 text-sm">
              Helping households reduce waste and make a positive environmental impact through
              proper waste sorting and sustainable practices.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-green-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="/sorting-guide" className="text-green-300 hover:text-white transition-colors">Sorting Guide</a></li>
              <li><a href="/tracking" className="text-green-300 hover:text-white transition-colors">Waste Tracking</a></li>
              <li><a href="/centers" className="text-green-300 hover:text-white transition-colors">Recycling Centers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/education" className="text-green-300 hover:text-white transition-colors">Educational Resources</a></li>
              <li><a href="/faq" className="text-green-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="/blog" className="text-green-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="/contact" className="text-green-300 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-green-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-green-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-green-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="/#connect-with-us" className="text-green-300 hover:text-white transition-colors" title="Send Feedback">
                <Mail size={20} />
              </a>
            </div>
            <p className="mt-4 text-sm text-green-300">
              Sign up for our newsletter to get the latest tips and updates.
            </p>
            <div className="mt-2 flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 text-green-900 rounded-l-md focus:outline-none text-sm"
              />
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r-md transition-colors text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-green-700 text-center text-sm text-green-400">
          <p>© {new Date().getFullYear()} EcoNexus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;