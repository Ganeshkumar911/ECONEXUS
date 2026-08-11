import { Achievement, UserProfile } from '../types';

type AchievementDefinition = {
  id: string;
  title: string;
  description: string;
  icon: 'Award' | 'Trophy' | 'Flower' | 'Star';
  evaluate: (profile: UserProfile) => boolean;
};

const achievementDefinitions: AchievementDefinition[] = [
  {
    id: 'first-log',
    title: 'First Log',
    description: 'Log your first waste entry.',
    icon: 'Award',
    evaluate: (profile) => profile.trackingData.length >= 1,
  },
  {
    id: 'green-starter',
    title: 'Green Starter',
    description: 'Reach 5 kg of total waste reduced.',
    icon: 'Award',
    evaluate: (profile) => (profile.stats.totalWasteReduced || 0) >= 5,
  },
  {
    id: 'recycling-rookie',
    title: 'Recycling Rookie',
    description: 'Collect 10 kg of recyclables.',
    icon: 'Trophy',
    evaluate: (profile) => (profile.stats.recyclablesCollected || 0) >= 10,
  },
  {
    id: 'compost-collector',
    title: 'Compost Collector',
    description: 'Create 10 kg of compost.',
    icon: 'Flower',
    evaluate: (profile) => (profile.stats.compostCreated || 0) >= 10,
  },
  {
    id: 'streak-keeper',
    title: 'Streak Keeper',
    description: 'Log waste for 3 consecutive days.',
    icon: 'Star',
    evaluate: (profile) => (profile.stats.streakDays || 0) >= 3,
  },
  {
    id: 'zero-landfill',
    title: 'Zero Landfill',
    description: 'Keep landfill entries at 0 for 5 logged activities.',
    icon: 'Star',
    evaluate: (profile) => profile.trackingData.filter((entry) => (entry.landfill || 0) === 0).length >= 5,
  },
  {
    id: 'eco-warrior',
    title: 'Eco Warrior',
    description: 'Log 10 waste entries.',
    icon: 'Trophy',
    evaluate: (profile) => profile.trackingData.length >= 10,
  },
  {
    id: 'sustainability-sage',
    title: 'Sustainability Sage',
    description: 'Reach 50 kg of total waste reduced.',
    icon: 'Flower',
    evaluate: (profile) => (profile.stats.totalWasteReduced || 0) >= 50,
  },
  {
    id: 'planet-protector',
    title: 'Planet Protector',
    description: 'Reach 20 kg of compost and 20 kg of recyclables.',
    icon: 'Trophy',
    evaluate: (profile) => (profile.stats.recyclablesCollected || 0) >= 20 && (profile.stats.compostCreated || 0) >= 20,
  },
  {
    id: 'daily-hero',
    title: 'Daily Hero',
    description: 'Maintain a streak of 7 days.',
    icon: 'Star',
    evaluate: (profile) => (profile.stats.streakDays || 0) >= 7,
  },
  {
    id: 'waste-wizard',
    title: 'Waste Wizard',
    description: 'Reach 100 kg of total waste reduced.',
    icon: 'Award',
    evaluate: (profile) => (profile.stats.totalWasteReduced || 0) >= 100,
  },
  {
    id: 'recycling-legend',
    title: 'Recycling Legend',
    description: 'Collect 50 kg of recyclables.',
    icon: 'Trophy',
    evaluate: (profile) => (profile.stats.recyclablesCollected || 0) >= 50,
  },
  {
    id: 'compost-captain',
    title: 'Compost Captain',
    description: 'Create 50 kg of compost.',
    icon: 'Flower',
    evaluate: (profile) => (profile.stats.compostCreated || 0) >= 50,
  },
  {
    id: 'weekend-warrior',
    title: 'Weekend Warrior',
    description: 'Log waste on 5 different days.',
    icon: 'Star',
    evaluate: (profile) => new Set(profile.trackingData.map((entry) => entry.date)).size >= 5,
  },
  {
    id: 'landfill-free',
    title: 'Landfill Free',
    description: 'Keep landfill at 0 for 10 logged activities.',
    icon: 'Star',
    evaluate: (profile) => profile.trackingData.filter((entry) => (entry.landfill || 0) === 0).length >= 10,
  },
  {
    id: 'consistency-star',
    title: 'Consistency Star',
    description: 'Maintain a streak of 10 days.',
    icon: 'Award',
    evaluate: (profile) => (profile.stats.streakDays || 0) >= 10,
  },
  {
    id: 'green-habit-builder',
    title: 'Green Habit Builder',
    description: 'Track waste for 20 entries.',
    icon: 'Trophy',
    evaluate: (profile) => profile.trackingData.length >= 20,
  },
  {
    id: 'nature-nurturer',
    title: 'Nature Nurturer',
    description: 'Create 75 kg of compost.',
    icon: 'Flower',
    evaluate: (profile) => (profile.stats.compostCreated || 0) >= 75,
  },
  {
    id: 'circular-champion',
    title: 'Circular Champion',
    description: 'Collect 75 kg of recyclables.',
    icon: 'Trophy',
    evaluate: (profile) => (profile.stats.recyclablesCollected || 0) >= 75,
  },
  {
    id: 'daily-dedication',
    title: 'Daily Dedication',
    description: 'Maintain a streak of 21 days.',
    icon: 'Star',
    evaluate: (profile) => (profile.stats.streakDays || 0) >= 21,
  },
  {
    id: 'future-focuser',
    title: 'Future Focuser',
    description: 'Reach 250 kg of total waste reduced.',
    icon: 'Award',
    evaluate: (profile) => (profile.stats.totalWasteReduced || 0) >= 250,
  },
  {
    id: 'bright-future',
    title: 'Bright Future',
    description: 'Reach 25 kg of compost and 25 kg of recyclables.',
    icon: 'Flower',
    evaluate: (profile) => (profile.stats.recyclablesCollected || 0) >= 25 && (profile.stats.compostCreated || 0) >= 25,
  },
  {
    id: 'planet-saver',
    title: 'Planet Saver',
    description: 'Reach 500 kg of total waste reduced.',
    icon: 'Trophy',
    evaluate: (profile) => (profile.stats.totalWasteReduced || 0) >= 500,
  },
  {
    id: 'goal-setter',
    title: 'Goal Setter',
    description: 'Set custom waste reduction goals.',
    icon: 'Star',
    evaluate: (profile) => Boolean(profile.goals),
  },
  {
    id: 'eco-ambassador',
    title: 'Eco Ambassador',
    description: 'Log entries in 10 different months.',
    icon: 'Award',
    evaluate: (profile) => new Set(profile.trackingData.map((entry) => entry.date.slice(0, 7))).size >= 10,
  },
];

export const getAchievementsForProfile = (profile: UserProfile | null): Achievement[] => {
  if (!profile) {
    return [];
  }

  return achievementDefinitions.map((definition) => ({
    id: definition.id,
    title: definition.title,
    description: definition.description,
    icon: definition.icon,
    unlocked: definition.evaluate(profile),
  }));
};
