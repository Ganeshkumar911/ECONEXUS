import React, { useState } from 'react';
import { X, Award, RotateCcw, CheckCircle2, XCircle, Sparkles, HelpCircle, Trophy, Play } from 'lucide-react';
import { wasteTypes } from '../data/wasteTypes';
import { WasteType } from '../types';

interface SortingGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GAME_ITEMS: WasteType[] = [
  wasteTypes[0], // Plastic Water Bottle
  wasteTypes[1], // Aluminum Can
  wasteTypes[2], // Food Scraps
  wasteTypes[3], // Household Batteries
  wasteTypes[4], // Cardboard Box
  wasteTypes[5], // Glass Bottle
  wasteTypes[6] || wasteTypes[0],
  wasteTypes[7] || wasteTypes[1]
].filter(Boolean);

const BINS: { category: 'recyclable' | 'compostable' | 'hazardous' | 'landfill'; label: string; color: string; bg: string }[] = [
  { category: 'recyclable', label: 'Blue Recycling Bin', color: 'text-blue-600', bg: 'bg-blue-600 hover:bg-blue-700' },
  { category: 'compostable', label: 'Green Compost Bin', color: 'text-emerald-600', bg: 'bg-emerald-600 hover:bg-emerald-700' },
  { category: 'hazardous', label: 'Red Hazardous Depot', color: 'text-rose-600', bg: 'bg-rose-600 hover:bg-rose-700' },
  { category: 'landfill', label: 'Grey Landfill Trash', color: 'text-gray-700', bg: 'bg-gray-700 hover:bg-gray-800' }
];

export const SortingGameModal: React.FC<SortingGameModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [itemIdx, setItemIdx] = useState(0);
  const [selectedBin, setSelectedBin] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentItem = GAME_ITEMS[itemIdx];

  const handleSelectBin = (category: string) => {
    if (selectedBin !== null) return;
    setSelectedBin(category);
    if (category === currentItem.category) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (itemIdx + 1 < GAME_ITEMS.length) {
      setItemIdx((prev) => prev + 1);
      setSelectedBin(null);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setItemIdx(0);
    setSelectedBin(null);
    setScore(0);
    setFinished(false);
  };

  const accuracyPct = Math.round((score / GAME_ITEMS.length) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-emerald-200 hover:text-white rounded-full p-1 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 bg-amber-400 text-amber-950 rounded font-bold text-[10px] uppercase">
              Interactive Challenge
            </span>
            <span className="text-xs font-semibold text-emerald-200">
              Item {itemIdx + 1} of {GAME_ITEMS.length}
            </span>
          </div>

          <h2 className="text-2xl font-extrabold flex items-center gap-2">
            <Trophy className="text-amber-400" size={24} />
            Waste Sorting Master Challenge
          </h2>
        </div>

        {!finished ? (
          <div className="p-6 space-y-6">
            {/* Item Card */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-center relative">
              <span className="text-5xl block mb-2">{currentItem.icon}</span>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{currentItem.name}</h3>
              <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">{currentItem.description}</p>
            </div>

            {/* Bin Options */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Which bin does this item belong in?
              </label>

              <div className="grid sm:grid-cols-2 gap-3">
                {BINS.map((bin) => {
                  const isChoice = selectedBin === bin.category;
                  const isCorrect = bin.category === currentItem.category;

                  let borderStyle = 'border-gray-200 bg-white hover:border-emerald-300';
                  if (selectedBin !== null) {
                    if (isCorrect) {
                      borderStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                    } else if (isChoice) {
                      borderStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                    }
                  }

                  return (
                    <button
                      key={bin.category}
                      disabled={selectedBin !== null}
                      onClick={() => handleSelectBin(bin.category)}
                      className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${borderStyle}`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${bin.bg.split(' ')[0]}`} />
                        {bin.label}
                      </span>
                      {selectedBin !== null && isCorrect && <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />}
                      {selectedBin !== null && isChoice && !isCorrect && <XCircle size={18} className="text-rose-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation Feedback */}
            {selectedBin !== null && (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1 animate-in fade-in duration-200">
                <p className="font-bold flex items-center gap-1">
                  💡 Disposal Instruction:
                </p>
                <p>{currentItem.disposalInstructions}</p>
              </div>
            )}

            {/* Next Button */}
            {selectedBin !== null && (
              <button
                onClick={handleNext}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-md transition-colors"
              >
                {itemIdx + 1 < GAME_ITEMS.length ? 'Next Waste Item' : 'View Final Score'}
              </button>
            )}
          </div>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <Award size={36} />
            </div>

            <h3 className="text-2xl font-extrabold text-gray-900">Challenge Completed!</h3>
            <p className="text-sm text-gray-600">
              You correctly sorted <strong>{score}</strong> out of <strong>{GAME_ITEMS.length}</strong> items ({accuracyPct}% accuracy)!
            </p>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 max-w-sm mx-auto text-xs text-gray-700">
              <p className="font-bold text-emerald-800 mb-1">Earned Rewards:</p>
              <p>+ {score * 25} Eco-Points added to your Sustainability Profile!</p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="px-5 py-2.5 bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md hover:bg-emerald-800 transition-colors inline-flex items-center gap-1.5"
              >
                <RotateCcw size={14} /> Play Again
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs rounded-xl transition-colors"
              >
                Close Game
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
