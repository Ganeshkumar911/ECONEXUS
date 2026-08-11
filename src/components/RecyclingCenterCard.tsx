import React from 'react';
import { RecyclingCenter } from '../types';
import { MapPin, Clock, Phone, Globe, Navigation, Compass, AlertTriangle } from 'lucide-react';

interface RecyclingCenterCardProps {
  center: RecyclingCenter;
  onSelectOnMap?: (center: RecyclingCenter) => void;
  isSelected?: boolean;
}

const RecyclingCenterCard: React.FC<RecyclingCenterCardProps> = ({ center, onSelectOnMap, isSelected }) => {
  const getDirectionsUrl = () => {
    if (center.lat && center.lng) {
      return `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(center.address)}`;
  };

  const isSpecialItem = (item: string) => {
    return ['batteries', 'electronics', 'chemicals', 'paint', 'hazardous', 'light-bulbs'].includes(item.toLowerCase());
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border flex flex-col justify-between ${
        isSelected ? 'ring-2 ring-green-600 border-green-500 bg-green-50/20' : 'border-gray-100'
      }`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-gray-900 leading-snug">{center.name}</h3>
          {center.distance && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-sky-100 text-sky-800 text-xs font-bold rounded-full shrink-0">
              <Compass className="h-3 w-3" />
              {center.distance.toFixed(1)} km
            </span>
          )}
        </div>

        {center.category === 'hazardous' && (
          <div className="mb-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 text-amber-900 text-xs font-semibold rounded-md">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-700" />
            Special Hazardous Drop-Off
          </div>
        )}

        <div className="space-y-2.5 text-sm text-gray-700 mb-4">
          <div className="flex items-start">
            <MapPin className="h-4 w-4 text-green-600 mt-1 mr-2 shrink-0" />
            <span>{center.address}</span>
          </div>

          <div className="flex items-start">
            <Clock className="h-4 w-4 text-green-600 mt-1 mr-2 shrink-0" />
            <span>{center.hours}</span>
          </div>

          <div className="flex items-start">
            <Phone className="h-4 w-4 text-green-600 mt-1 mr-2 shrink-0" />
            <span>{center.phone}</span>
          </div>

          {center.website && (
            <div className="flex items-start">
              <Globe className="h-4 w-4 text-green-600 mt-1 mr-2 shrink-0" />
              <a
                href={center.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium hover:underline flex items-center gap-1"
              >
                Visit Website
              </a>
            </div>
          )}
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Accepted Items:</h4>
          <div className="flex flex-wrap gap-1.5">
            {center.acceptedItems.map((item, index) => {
              const special = isSpecialItem(item);
              return (
                <span
                  key={index}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium capitalize transition-colors ${
                    special
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {special && '⚠️ '}
                  {item}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 pt-3 bg-gray-50/50 border-t border-gray-100 flex gap-2">
        {onSelectOnMap && (
          <button
            onClick={() => onSelectOnMap(center)}
            className="flex-1 py-2 px-3 bg-white text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
          >
            <MapPin className="h-3.5 w-3.5 text-green-600" />
            Show on Map
          </button>
        )}
        <a
          href={getDirectionsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 px-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Navigation className="h-3.5 w-3.5" />
          Directions
        </a>
      </div>
    </div>
  );
};

export default RecyclingCenterCard;