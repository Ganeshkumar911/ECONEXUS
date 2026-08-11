import React, { useState, useEffect } from 'react';
import { RecyclingCenter } from '../types';
import { MapPin, Navigation, Clock, Phone, ExternalLink, Compass, ShieldAlert, Sparkles, Layers, Truck } from 'lucide-react';

interface RecyclingMapProps {
  centers: RecyclingCenter[];
  selectedCenterId?: string | null;
  onSelectCenter?: (center: RecyclingCenter) => void;
  onBookPickup?: (center: RecyclingCenter) => void;
  userLocation?: { lat: number; lng: number } | null;
}

const getCategoryColor = (category?: string) => {
  switch (category) {
    case 'hazardous':
      return { bg: 'bg-rose-600', text: 'text-rose-600', border: 'border-rose-600', badge: 'bg-rose-100 text-rose-900 border-rose-200' };
    case 'e-waste':
      return { bg: 'bg-indigo-600', text: 'text-indigo-600', border: 'border-indigo-600', badge: 'bg-indigo-100 text-indigo-900 border-indigo-200' };
    case 'compost':
      return { bg: 'bg-emerald-600', text: 'text-emerald-600', border: 'border-emerald-600', badge: 'bg-emerald-100 text-emerald-900 border-emerald-200' };
    default:
      return { bg: 'bg-green-600', text: 'text-green-600', border: 'border-green-600', badge: 'bg-green-100 text-green-900 border-green-200' };
  }
};

const RecyclingMap: React.FC<RecyclingMapProps> = ({
  centers,
  selectedCenterId,
  onSelectCenter,
  onBookPickup,
  userLocation
}) => {
  const [activeCenter, setActiveCenter] = useState<RecyclingCenter | null>(null);
  const [mapMode, setMapMode] = useState<'standard' | 'satellite'>('standard');

  useEffect(() => {
    if (selectedCenterId) {
      const found = centers.find((c) => c.id === selectedCenterId);
      if (found) {
        setActiveCenter(found);
      }
    } else if (centers.length > 0 && !activeCenter) {
      setActiveCenter(centers[0]);
    }
  }, [selectedCenterId, centers]);

  const currentCenter = activeCenter || (centers.length > 0 ? centers[0] : null);

  const getGoogleMapsDirectionsUrl = (center: RecyclingCenter) => {
    if (center.lat && center.lng) {
      return `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(center.address)}`;
  };

  // Chennai Default Map Center
  const defaultLat = 13.0827;
  const defaultLng = 80.2707;
  const mapCenterLat = currentCenter?.lat ?? defaultLat;
  const mapCenterLng = currentCenter?.lng ?? defaultLng;

  const getPinStyle = (lat?: number, lng?: number) => {
    if (!lat || !lng) return { top: '50%', left: '50%' };
    const dLat = (lat - mapCenterLat) * 90;
    const dLng = (lng - mapCenterLng) * 90;
    const top = 50 - dLat;
    const left = 50 + dLng;
    return {
      top: `${Math.max(12, Math.min(88, top))}%`,
      left: `${Math.max(12, Math.min(88, left))}%`
    };
  };

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-slate-950 group">
      {/* Embedded Map Tile Overlay */}
      <div className="absolute inset-0 transition-opacity duration-500">
        <iframe
          title="Chennai & Tamil Nadu Recycling Centers Map"
          width="100%"
          height="100%"
          className="border-0 opacity-90"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapCenterLng - 0.08},${mapCenterLat - 0.05},${mapCenterLng + 0.08},${mapCenterLat + 0.05}&layer=mapnik&marker=${mapCenterLat},${mapCenterLng}`}
        />
      </div>

      {/* Map Header Overlay Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
        <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg border border-gray-200/80 flex items-center gap-3 pointer-events-auto">
          <MapPin className="h-5 w-5 text-emerald-700 animate-bounce" />
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800">
              Chennai & Tamil Nadu Region
            </span>
            <p className="text-xs sm:text-sm font-extrabold text-gray-900">
              {centers.length} Drop-Off Centers Active
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setMapMode((prev) => (prev === 'standard' ? 'satellite' : 'standard'))}
            className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md hover:bg-white text-xs font-bold text-gray-800 flex items-center gap-1.5 transition-all border border-gray-200"
          >
            <Layers className="h-4 w-4 text-emerald-700" />
            {mapMode === 'standard' ? 'Satellite View' : 'Street View'}
          </button>
        </div>
      </div>

      {/* Map Pins */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {userLocation && (
          <div
            style={getPinStyle(userLocation.lat, userLocation.lng)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-30 group/user"
          >
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-sky-400 opacity-75"></span>
              <div className="relative h-6 w-6 rounded-full bg-sky-600 border-2 border-white shadow-lg flex items-center justify-center text-white">
                <Compass className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className="opacity-0 group-hover/user:opacity-100 transition-opacity absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-2.5 py-1 rounded-md shadow-lg whitespace-nowrap">
              Your Current GPS Location (Chennai)
            </div>
          </div>
        )}

        {centers.map((center) => {
          const isSelected = currentCenter?.id === center.id;
          const colors = getCategoryColor(center.category);

          return (
            <div
              key={center.id}
              style={getPinStyle(center.lat, center.lng)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-30"
            >
              <button
                onClick={() => {
                  setActiveCenter(center);
                  if (onSelectCenter) onSelectCenter(center);
                }}
                className={`group/pin relative transition-transform duration-300 hover:scale-125 focus:outline-none ${
                  isSelected ? 'scale-125 z-40' : ''
                }`}
              >
                {isSelected && (
                  <span className={`animate-ping absolute -inset-1 rounded-full ${colors.bg} opacity-75`}></span>
                )}
                <div
                  className={`relative p-2 rounded-full shadow-xl border-2 border-white flex items-center justify-center transition-colors ${colors.bg} text-white`}
                >
                  <MapPin className="h-5 w-5" />
                </div>
                {center.distance && (
                  <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-slate-900/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap">
                    {center.distance.toFixed(1)} km
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Active Selected Center Bottom Card */}
      {currentCenter && (
        <div className="absolute bottom-4 left-4 right-4 z-30">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-5 border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize border ${getCategoryColor(currentCenter.category).badge}`}>
                  {currentCenter.category || 'General Drop-Off'}
                </span>
                {currentCenter.zone && (
                  <span className="bg-slate-100 text-slate-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-slate-200">
                    📍 {currentCenter.zone}
                  </span>
                )}
                {currentCenter.distance && (
                  <span className="bg-sky-100 text-sky-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {currentCenter.distance.toFixed(1)} km away
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-900">{currentCenter.name}</h3>

              <div className="flex flex-wrap items-center text-xs text-gray-600 mt-1 gap-4">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                  {currentCenter.address}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                  {currentCenter.hours}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {currentCenter.doorstepPickupAvailable && onBookPickup && (
                <button
                  onClick={() => onBookPickup(currentCenter)}
                  className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-colors"
                >
                  <Truck size={16} /> Book Doorstep Pickup
                </button>
              )}

              <a
                href={getGoogleMapsDirectionsUrl(currentCenter)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-gray-900 hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-colors"
              >
                <Navigation size={14} /> Get Directions
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecyclingMap;
