import React from 'react';
import { WasteType } from '../types';
import { getIconComponent } from '../data/wasteTypes';
import { X } from 'lucide-react';

interface WasteDetailProps {
  waste: WasteType;
  onClose: () => void;
}

const categoryColors = {
  recyclable: {
    bg: 'bg-blue-50',
    border: 'border-blue-500',
    text: 'text-blue-800',
    darkBg: 'bg-blue-600',
    lightText: 'text-blue-50'
  },
  compostable: {
    bg: 'bg-green-50',
    border: 'border-green-500',
    text: 'text-green-800',
    darkBg: 'bg-green-600',
    lightText: 'text-green-50'
  },
  hazardous: {
    bg: 'bg-red-50',
    border: 'border-red-500',
    text: 'text-red-800',
    darkBg: 'bg-red-600',
    lightText: 'text-red-50'
  },
  landfill: {
    bg: 'bg-gray-50',
    border: 'border-gray-500',
    text: 'text-gray-800',
    darkBg: 'bg-gray-600',
    lightText: 'text-gray-50'
  }
};

const WasteDetail: React.FC<WasteDetailProps> = ({ waste, onClose }) => {
  const colors = categoryColors[waste.category];
  const IconComponent = getIconComponent(waste.icon);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`relative rounded-lg ${colors.bg} p-6 max-w-md w-full shadow-2xl`}>
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="flex items-center mb-6">
          <div className={`p-3 rounded-full ${colors.darkBg}`}>
            <IconComponent className={`h-8 w-8 ${colors.lightText}`} />
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-800">{waste.name}</h2>
            <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${colors.darkBg} ${colors.lightText} mt-1`}>
              {waste.category}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">What to include:</h3>
            <p className="text-gray-700">{waste.description}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">How to dispose:</h3>
            <p className="text-gray-700">{waste.disposalInstructions}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Environmental impact:</h3>
            <p className="text-gray-700">{waste.environmentalImpact}</p>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className={`mt-6 w-full py-2 rounded-lg ${colors.darkBg} ${colors.lightText} font-medium hover:opacity-90 transition-opacity`}
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default WasteDetail;