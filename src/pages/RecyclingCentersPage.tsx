import React, { useState } from 'react';
import { recyclingCenters } from '../data/recyclingCenters';
import RecyclingCenterCard from '../components/RecyclingCenterCard';
import RecyclingMap from '../components/RecyclingMap';
import { DoorstepPickupModal } from '../components/DoorstepPickupModal';
import { RecyclingCenter } from '../types';
import {
  Search,
  MapPin,
  Navigation,
  Compass,
  AlertCircle,
  Sparkles,
  Filter,
  Truck,
  IndianRupee,
  Calculator,
  Phone,
  Building2,
  CheckCircle2
} from 'lucide-react';

const ZONES = [
  'All Zones',
  'South Chennai',
  'Central Chennai',
  'West Chennai',
  'Chennai Suburbs',
  'Rest of Tamil Nadu'
];

interface ScrapRate {
  item: string;
  ratePerKg: number;
  icon: string;
  category: string;
}

const CHENNAI_SCRAP_RATES: ScrapRate[] = [
  { item: 'Plastic Water Bottles (PET 1)', ratePerKg: 16, icon: '🍾', category: 'Plastic' },
  { item: 'Paper, Books & Newspapers', ratePerKg: 14, icon: '📰', category: 'Paper' },
  { item: 'Cardboard & Corrugated Boxes', ratePerKg: 11, icon: '📦', category: 'Paper' },
  { item: 'Iron & Steel Scrap', ratePerKg: 34, icon: '⚙️', category: 'Metal' },
  { item: 'Aluminum Cans & Sheet Metal', ratePerKg: 105, icon: '🥤', category: 'Metal' },
  { item: 'Copper Wire & Electrical Motors', ratePerKg: 440, icon: '🔌', category: 'Metal' },
  { item: 'E-Waste & Computer Circuit Boards', ratePerKg: 95, icon: '💻', category: 'E-Waste' },
  { item: 'Old Car & Inverter Batteries', ratePerKg: 75, icon: '🔋', category: 'Hazardous' }
];

const RecyclingCentersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterItems, setFilterItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedZone, setSelectedZone] = useState<string>('All Zones');
  const [selectedCenterId, setSelectedCenterId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Doorstep Pickup Modal State
  const [pickupCenter, setPickupCenter] = useState<RecyclingCenter | null>(null);

  // Scrap Calculator State
  const [selectedScrapIdx, setSelectedScrapIdx] = useState<number>(0);
  const [scrapWeightKg, setScrapWeightKg] = useState<number>(15);

  // Auto-detect location on component load
  React.useEffect(() => {
    handleFindNearMe();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleFilterItem = (item: string) => {
    if (filterItems.includes(item)) {
      setFilterItems(filterItems.filter((i) => i !== item));
    } else {
      setFilterItems([...filterItems, item]);
    }
  };

  // Haversine formula for calculating distance in km
  const calculateDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleFindNearMe = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const uLat = position.coords.latitude;
        const uLng = position.coords.longitude;
        setUserLocation({ lat: uLat, lng: uLng });
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        // Fallback coordinates (Guindy / Chennai City Center, Tamil Nadu)
        const fallbackLat = 13.0067;
        const fallbackLng = 80.2020;
        setUserLocation({ lat: fallbackLat, lng: fallbackLng });
        setLocationError('Could not retrieve precise GPS. Showing distance relative to Tamil Nadu.');
      },
      { timeout: 10000 }
    );
  };

  const allAcceptedItems = Array.from(
    new Set(recyclingCenters.flatMap((center) => center.acceptedItems))
  ).sort();

  let processedCenters = recyclingCenters.map((center) => {
    if (userLocation && center.lat && center.lng) {
      const dist = calculateDistanceKm(userLocation.lat, userLocation.lng, center.lat, center.lng);
      return { ...center, distance: dist };
    }
    return center;
  });

  if (userLocation) {
    processedCenters.sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }

  const filteredCenters = processedCenters.filter((center) => {
    const matchesSearch =
      center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterItems.length === 0 || filterItems.every((item) => center.acceptedItems.includes(item));

    const matchesCategory = selectedCategory === 'all' || center.category === selectedCategory;

    const matchesZone = selectedZone === 'All Zones' || center.zone === selectedZone;

    return matchesSearch && matchesFilter && matchesCategory && matchesZone;
  });

  const handleSelectOnMap = (center: RecyclingCenter) => {
    setSelectedCenterId(center.id);
    const mapElement = document.getElementById('recycling-map-section');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Calculator calculation
  const calculatedEarnings = (CHENNAI_SCRAP_RATES[selectedScrapIdx].ratePerKg * Math.max(0, scrapWeightKg)).toFixed(0);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-green-800 to-teal-900 text-white py-12 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-800/80 rounded-full text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Compass className="h-3.5 w-3.5 text-emerald-300" />
              Tamil Nadu & Chennai Drop-Off Finder
            </div>
            <h1 className="text-3xl md:text-4xl font-black mb-3">Recycling Centers & Map</h1>
            <p className="text-emerald-100 text-base md:text-lg max-w-2xl leading-relaxed">
              Locate authorized drop-off facilities in Chennai (Guindy, Velachery, Ambattur, Tambaram, Anna Nagar) and Tamil Nadu for electronics, hazardous waste, compost, and scrap metals.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleFindNearMe}
              disabled={isLocating}
              className="inline-flex items-center justify-center gap-2 bg-white text-emerald-900 hover:bg-emerald-50 font-extrabold px-5 py-3 rounded-xl shadow-lg transition-all duration-200"
            >
              <Navigation className={`h-5 w-5 text-emerald-700 ${isLocating ? 'animate-spin' : ''}`} />
              {isLocating ? 'Locating...' : '📍 Find Near Me'}
            </button>
          </div>
        </div>
      </div>

      {locationError && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm px-4 py-3 rounded-xl flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
            <span>{locationError}</span>
          </div>
        </div>
      )}

      {/* Main Interactive Map View Section */}
      <div id="recycling-map-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 z-20 relative">
        <RecyclingMap
          centers={filteredCenters}
          selectedCenterId={selectedCenterId}
          onSelectCenter={(center) => setSelectedCenterId(center.id)}
          onBookPickup={(center) => setPickupCenter(center)}
          userLocation={userLocation}
        />
      </div>

      {/* NEW FEATURE 1: Chennai Scrap Price Earnings Calculator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1 bg-emerald-100 text-emerald-800 rounded-md">
                  <Calculator size={18} />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Scrap Valuation Tool
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Chennai Scrap Rate & Earnings Calculator</h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Check current average scrap buyback prices in Chennai and calculate how much money you can earn from recycling!
              </p>
            </div>

            <div className="bg-emerald-50 px-5 py-3 rounded-xl border border-emerald-200 flex items-center gap-3">
              <div className="p-2 bg-emerald-600 text-white rounded-lg">
                <IndianRupee size={22} />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase text-emerald-800 block">Estimated Cash Payout</span>
                <h3 className="text-2xl font-black text-emerald-950">₹ {calculatedEarnings}</h3>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Select Material
              </label>
              <select
                value={selectedScrapIdx}
                onChange={(e) => setSelectedScrapIdx(Number(e.target.value))}
                className="w-full py-2.5 px-3 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500"
              >
                {CHENNAI_SCRAP_RATES.map((scrap, idx) => (
                  <option key={idx} value={idx}>
                    {scrap.icon} {scrap.item} (₹{scrap.ratePerKg}/kg)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Quantity / Weight (Kg)
              </label>
              <input
                type="number"
                min="1"
                max="500"
                value={scrapWeightKg}
                onChange={(e) => setScrapWeightKg(Number(e.target.value))}
                className="w-full py-2.5 px-3 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  if (filteredCenters.length > 0) {
                    setPickupCenter(filteredCenters[0]);
                  }
                }}
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <Truck size={16} /> Schedule Pickup for Cash
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Zone Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="lg:w-1/3">
              <label htmlFor="search" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Search Location or Facility
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="search"
                  type="text"
                  placeholder="Enter Tamil Nadu area (Guindy, Velachery, Ambattur)..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl bg-gray-50 text-gray-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>
            </div>

            {/* Zone Filter Chips */}
            <div className="lg:w-2/3">
              <span className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Filter by Region / Zone:
              </span>
              <div className="flex flex-wrap gap-2">
                {ZONES.map((zone) => {
                  const active = selectedZone === zone;
                  return (
                    <button
                      key={zone}
                      onClick={() => setSelectedZone(zone)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        active
                          ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-emerald-50'
                      }`}
                    >
                      {zone}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Category Chips */}
          <div className="pt-3 border-t border-gray-100 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              All Centers ({processedCenters.length})
            </button>
            <button
              onClick={() => setSelectedCategory('hazardous')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === 'hazardous'
                  ? 'bg-rose-600 text-white'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              ⚠️ Hazardous Waste
            </button>
            <button
              onClick={() => setSelectedCategory('e-waste')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === 'e-waste'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
              }`}
            >
              ⚡ E-Waste / Electronics
            </button>
            <button
              onClick={() => setSelectedCategory('compost')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === 'compost'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}
            >
              🌱 Organic Compost
            </button>
          </div>
        </div>
      </div>

      {/* Centers Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Available Drop-Off Centers ({filteredCenters.length})
          </h2>
          {userLocation && (
            <span className="text-xs font-bold text-sky-800 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
              Sorted by proximity to your GPS position
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCenters.length > 0 ? (
            filteredCenters.map((center) => (
              <RecyclingCenterCard
                key={center.id}
                center={center}
                onSelectOnMap={handleSelectOnMap}
                isSelected={selectedCenterId === center.id}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-white rounded-2xl shadow-sm border border-gray-200">
              <MapPin className="h-10 w-10 text-gray-300 mx-auto mb-2" />
              <h3 className="text-lg font-bold text-gray-900 mb-1">No recycling centers match your filters</h3>
              <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto mb-4">
                Try selecting "All Zones" or clearing specific category filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterItems([]);
                  setSelectedCategory('all');
                  setSelectedZone('All Zones');
                }}
                className="bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tamil Nadu Govt & GCC Helpline Guidelines */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider mb-2">
            <Building2 className="h-4 w-4" />
            Tamil Nadu Pollution Control Board (TNPCB) & GCC Directives
          </div>
          <h2 className="text-2xl font-extrabold mb-4">Official Waste Disposal Helplines :</h2>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">
              <h3 className="font-bold text-amber-300 text-base mb-1 flex items-center gap-1.5">
                <Phone size={16} /> GCC Helpline 1913
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed">
                Greater Chennai Corporation toll-free helpline for municipal waste collection, street bin complaints, and bulky waste pickup.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">
              <h3 className="font-bold text-indigo-300 text-base mb-1 flex items-center gap-1.5">
                <Phone size={16} /> TNPCB E-Waste Portal
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed">
                TNPCB authorized recyclers in Guindy, Ambattur, and Sriperumbudur process electronic circuit boards and lithium batteries under EPR laws.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">
              <h3 className="font-bold text-emerald-300 text-base mb-1 flex items-center gap-1.5">
                <CheckCircle2 size={16} /> Doorstep Scrap Payout
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed">
                Use EcoSort's Doorstep Pickup feature to schedule doorstep weighing and instant cash payout for household paper, plastic, and metal scrap.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Doorstep Pickup Modal */}
      <DoorstepPickupModal center={pickupCenter} onClose={() => setPickupCenter(null)} />
    </div>
  );
};

export default RecyclingCentersPage;