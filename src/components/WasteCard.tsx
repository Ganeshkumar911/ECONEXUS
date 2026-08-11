import React from 'react';
import { WasteType } from '../types';
import { getIconComponent } from '../data/wasteTypes';

interface WasteCardProps {
  waste: WasteType;
  onClick?: () => void;
}

const categoryColors = {
  recyclable: {
    bg: 'bg-blue-100',
    border: 'border-blue-500',
    text: 'text-blue-800',
    hover: 'hover:bg-blue-200'
  },
  compostable: {
    bg: 'bg-green-100',
    border: 'border-green-500',
    text: 'text-green-800',
    hover: 'hover:bg-green-200'
  },
  hazardous: {
    bg: 'bg-red-100',
    border: 'border-red-500',
    text: 'text-red-800',
    hover: 'hover:bg-red-200'
  },
  landfill: {
    bg: 'bg-gray-100',
    border: 'border-gray-500',
    text: 'text-gray-800',
    hover: 'hover:bg-gray-200'
  }
};

const WasteCard: React.FC<WasteCardProps> = ({ waste, onClick }) => {
  const colors = categoryColors[waste.category];
  const IconComponent = getIconComponent(waste.icon);
  
  return (
    <div 
      className={`rounded-lg ${colors.bg} ${colors.border} border p-4 shadow-md transition-all duration-300 transform hover:scale-105 ${colors.hover} cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex items-center mb-3">
        <div className={`p-2 rounded-full ${colors.bg}`}>
          <IconComponent className={`h-6 w-6 ${colors.text}`} />
        </div>
        <h3 className={`ml-2 font-semibold ${colors.text}`}>{waste.name}</h3>
      </div>
      <p className="text-gray-700 text-sm mb-2">{waste.description}</p>
      <div className={`text-xs font-semibold uppercase ${colors.text} mt-auto`}>
        {waste.category}
      </div>
    </div>
  );
};

export default WasteCard;