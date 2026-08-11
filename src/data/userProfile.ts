import { UserProfile } from '../types';

export const userProfile: UserProfile = {
  name: 'Fusion Hackers',
  email: 'support@econexus.app',
  avatar: 'https://thumbs.dreamstime.com/b/eco-friendly-concept-butterfly-world-42799838.jpg?w=576',
  dateOfBirth: '2000-01-01',
  place: 'New City',
  pincode: '123456',
  phone: '000-000-0000',
  address: '123 Green Street',
  bio: 'EcoNexus user passionate about reducing waste and protecting the environment.',
  goals: {
    totalWasteReduced: 20,
    recyclablesCollected: 15,
    compostCreated: 10,
    streakDays: 5,
    zeroLandfillEntries: 3
  },
  stats: {
    totalWasteReduced: 124,
    recyclablesCollected: 78,
    compostCreated: 32,
    streakDays: 14
  },
  achievements: [
    {
      id: 'first-sort',
      title: 'First Sort',
      description: 'Sorted your first item correctly',
      icon: 'Award',
      unlocked: true
    },
    {
      id: 'recycling-hero',
      title: 'Recycling Hero',
      description: 'Recycled 50 items in a month',
      icon: 'Trophy',
      unlocked: true
    },
    {
      id: 'compost-master',
      title: 'Compost Master',
      description: 'Created 20kg of compost',
      icon: 'Flower',
      unlocked: false
    },
    {
      id: 'zero-waste-week',
      title: 'Zero Waste Week',
      description: 'Produced no landfill waste for a week',
      icon: 'Star',
      unlocked: false
    }
  ],
  trackingData: [
    {
      date: '2025-01-01',
      timestamp: '08:15 AM',
      itemDescription: 'Morning recyclables sorting: plastic bottles and paper',
      recyclable: 2.1,
      compostable: 1.4,
      hazardous: 0.2,
      landfill: 0.9
    },
    {
      date: '2025-01-02',
      timestamp: '07:50 AM',
      itemDescription: 'Recycled cardboard packaging and glass jars',
      recyclable: 1.8,
      compostable: 1.3,
      hazardous: 0,
      landfill: 0.7
    },
    {
      date: '2025-01-03',
      timestamp: '08:30 AM',
      itemDescription: 'Added compostable food scraps and compostable tea bags',
      recyclable: 2.3,
      compostable: 1.1,
      hazardous: 0.1,
      landfill: 0.6
    },
    {
      date: '2025-01-04',
      timestamp: '07:45 AM',
      itemDescription: 'Weekend cleanup with mixed recyclables and small landfill items',
      recyclable: 1.9,
      compostable: 1.5,
      hazardous: 0,
      landfill: 0.5
    },
    {
      date: '2025-01-05',
      timestamp: '08:10 AM',
      itemDescription: 'Sorted garden waste and used packaging into compost and recycle',
      recyclable: 2.4,
      compostable: 1.2,
      hazardous: 0,
      landfill: 0.4
    },
    {
      date: '2025-01-06',
      timestamp: '08:05 AM',
      itemDescription: 'Recycled bottles, composted fruit peels, and tracked hazardous batteries',
      recyclable: 2.0,
      compostable: 1.3,
      hazardous: 0.3,
      landfill: 0.5
    },
    {
      date: '2025-01-07',
      timestamp: '07:55 AM',
      itemDescription: 'Committed to minimal landfill with glass, cardboard, and kitchen scraps',
      recyclable: 2.2,
      compostable: 1.4,
      hazardous: 0,
      landfill: 0.3
    }
  ]
};