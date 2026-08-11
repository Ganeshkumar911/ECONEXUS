import React, { useState } from 'react';
import { Search, Trophy, Star, Bookmark, PlusCircle, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { wasteTypes } from '../data/wasteTypes';
import WasteCard from '../components/WasteCard';
import WasteDetail from '../components/WasteDetail';
import ImageAnalyzer from '../components/ImageAnalyzer';
import WasteDecompositionExplorer from '../components/WasteDecompositionExplorer';
import { SortingGameModal } from '../components/SortingGameModal';
import { WasteType } from '../types';
import { getFavoriteItemIds, toggleFavoriteItem, submitCustomItemRequest } from '../utils/sortingStorage';

const SortingGuidePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<string>('all');
  const [selectedWaste, setSelectedWaste] = useState<WasteType | null>(null);

  // Game Modal State
  const [isGameOpen, setIsGameOpen] = useState(false);

  // Favorites State
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => getFavoriteItemIds());

  // Custom Item Request Form State
  const [requestName, setRequestName] = useState('');
  const [requestDesc, setRequestDesc] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleToggleFav = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    const updated = toggleFavoriteItem(itemId);
    setFavoriteIds(updated);
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestName.trim()) return;
    submitCustomItemRequest(requestName, requestDesc);
    setRequestSubmitted(true);
    setRequestName('');
    setRequestDesc('');
    setTimeout(() => setRequestSubmitted(false), 4000);
  };

  const filteredWasteTypes = wasteTypes.filter((waste) => {
    const matchesSearch =
      waste.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      waste.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || waste.category === filter;
    return matchesSearch && matchesFilter;
  });

  const favoriteWasteTypes = wasteTypes.filter((w) => favoriteIds.includes(w.id));

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-green-800 to-teal-900 text-white py-12 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Waste Sorting Guide</h1>
            <p className="text-green-100 text-base md:text-lg max-w-3xl leading-relaxed">
              Learn how to properly sort your household waste with our comprehensive guide. Use our image analysis tool to identify waste types or test your skills in the sorting challenge.
            </p>
          </div>

          <button
            onClick={() => setIsGameOpen(true)}
            className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black px-6 py-3.5 rounded-2xl shadow-xl transition-transform transform hover:scale-105 active:scale-95 shrink-0"
          >
            <Trophy size={22} />
            <span>Launch Sorting Game</span>
          </button>
        </div>
      </div>

      {/* Image Analyzer Section (Preserved Original Content) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-8">
        <ImageAnalyzer />
      </div>

      {/* NEW FEATURE 1: Bookmarked / Favorite Waste Items Quick Bar */}
      {favoriteWasteTypes.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-200">
            <div className="flex items-center gap-2 mb-3">
              <Star className="text-amber-500 fill-amber-500" size={18} />
              <h3 className="text-sm font-bold text-emerald-950">Your Bookmarked Favorites ({favoriteWasteTypes.length})</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {favoriteWasteTypes.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedWaste(item)}
                  className="px-3 py-1.5 bg-white text-gray-800 rounded-xl text-xs font-bold shadow-sm hover:border-emerald-500 border border-gray-200 flex items-center gap-1.5"
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters (Preserved Original Content) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow max-w-3xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for waste items..."
                value={searchTerm}
                onChange={handleSearch}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('recyclable')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === 'recyclable' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Recyclable
              </button>
              <button
                onClick={() => setFilter('compostable')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === 'compostable' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Compostable
              </button>
              <button
                onClick={() => setFilter('hazardous')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === 'hazardous' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Hazardous
              </button>
              <button
                onClick={() => setFilter('landfill')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === 'landfill' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Landfill
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Waste Items Grid (Preserved Original Content + Favorite Star Button Overlay) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWasteTypes.length > 0 ? (
            filteredWasteTypes.map((waste) => {
              const isFav = favoriteIds.includes(waste.id);
              return (
                <div key={waste.id} className="relative group">
                  <button
                    onClick={(e) => handleToggleFav(e, waste.id)}
                    className={`absolute top-3 right-3 z-10 p-1.5 rounded-full backdrop-blur-md transition-transform active:scale-90 ${
                      isFav ? 'bg-amber-100 text-amber-500' : 'bg-white/80 text-gray-400 hover:text-amber-500'
                    }`}
                    title={isFav ? 'Remove from Favorites' : 'Add to Favorites'}
                  >
                    <Star size={16} className={isFav ? 'fill-amber-500' : ''} />
                  </button>

                  <WasteCard waste={waste} onClick={() => setSelectedWaste(waste)} />
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-10 text-center">
              <p className="text-gray-500 text-lg">
                No waste items match your search. Try a different search term or filter.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* NEW FEATURE 2: Custom Waste Item Request Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <PlusCircle className="text-emerald-700" size={22} />
            <h3 className="text-xl font-bold text-gray-900">Couldn't find an item in our database?</h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mb-4">
            Submit an unlisted household item, packaging, or electronic product and our eco-team will classify it for you!
          </p>

          <form onSubmit={handleSubmitRequest} className="grid sm:grid-cols-3 gap-3">
            <div>
              <input
                type="text"
                required
                placeholder="Item name (e.g. Bubble wrap, TetraPak)..."
                value={requestName}
                onChange={(e) => setRequestName(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Description or material details (optional)..."
                value={requestDesc}
                onChange={(e) => setRequestDesc(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <Send size={15} /> {requestSubmitted ? 'Request Submitted!' : 'Submit for Classification'}
              </button>
            </div>
          </form>

          {requestSubmitted && (
            <p className="text-xs text-emerald-800 mt-2 font-semibold">
              ✓ Item request saved to local database! We will add it to the guide.
            </p>
          )}
        </div>
      </div>

      {/* NEW FEATURE: Waste Decomposition Science & Image Upload Analyzer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <WasteDecompositionExplorer />
      </div>

      {/* Tips Section (Preserved Original Content) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pro Tips for Waste Sorting</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Before Recycling:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Rinse food containers to remove food residue</li>
                <li>Remove plastic caps from glass bottles</li>
                <li>Flatten cardboard boxes to save space</li>
                <li>Don't bag recyclables - keep them loose in the bin</li>
                <li>Keep paper dry and clean</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-gray-800 mb-2">Common Mistakes to Avoid:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Pizza boxes with grease stains can't be recycled</li>
                <li>Bottle caps are often made of different materials than bottles</li>
                <li>Plastic bags clog recycling machinery</li>
                <li>Tissues and paper towels are not recyclable</li>
                <li>Not all plastic is recyclable - check the numbers (1-7)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Waste Detail Modal (Preserved Original Content) */}
      {selectedWaste && <WasteDetail waste={selectedWaste} onClose={() => setSelectedWaste(null)} />}

      {/* Sorting Practice Game Modal */}
      <SortingGameModal isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
    </div>
  );
};

export default SortingGuidePage;