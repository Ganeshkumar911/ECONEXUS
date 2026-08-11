import React from 'react';
import { Achievement } from '../types';
import { Award, Trophy, Flower, Star } from 'lucide-react';

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const getIcon = () => {
    switch (achievement.icon) {
      case 'Award':
        return <Award className={`h-8 w-8 ${achievement.unlocked ? 'text-yellow-500' : 'text-gray-400'}`} />;
      case 'Trophy':
        return <Trophy className={`h-8 w-8 ${achievement.unlocked ? 'text-yellow-500' : 'text-gray-400'}`} />;
      case 'Flower':
        return <Flower className={`h-8 w-8 ${achievement.unlocked ? 'text-green-500' : 'text-gray-400'}`} />;
      case 'Star':
        return <Star className={`h-8 w-8 ${achievement.unlocked ? 'text-blue-500' : 'text-gray-400'}`} />;
      default:
        return <Award className={`h-8 w-8 ${achievement.unlocked ? 'text-yellow-500' : 'text-gray-400'}`} />;
    }
  };

  return (
    <div 
      className={`rounded-lg ${
        achievement.unlocked ? 'bg-white' : 'bg-gray-50'
      } p-4 shadow-md border ${
        achievement.unlocked ? 'border-green-200' : 'border-gray-200'
      } transition-all duration-300 transform hover:scale-105`}
    >
      <div className="flex items-center">
        <div className={`p-2 rounded-full ${
          achievement.unlocked ? 'bg-green-50' : 'bg-gray-100'
        }`}>
          {getIcon()}
        </div>
        <div className="ml-3">
          <h3 className={`font-semibold ${
            achievement.unlocked ? 'text-gray-800' : 'text-gray-500'
          }`}>
            {achievement.title}
          </h3>
          <p className={`text-sm ${
            achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
          }`}>
            {achievement.description}
          </p>
        </div>
      </div>
      {!achievement.unlocked && (
        <div className="mt-2 text-xs text-gray-500 italic">
          Keep going to unlock this achievement!
        </div>
      )}
    </div>
  );
};

export default AchievementCard;