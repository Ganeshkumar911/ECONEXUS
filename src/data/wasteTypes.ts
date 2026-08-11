import { WasteType } from '../types';
import { Recycle, Apple, Battery, Trash } from 'lucide-react';

export const wasteTypes: WasteType[] = [
  {
    id: 'plastic',
    name: 'Plastic',
    category: 'recyclable',
    icon: 'Recycle',
    description: 'Most plastic containers with recycling symbols 1-7',
    disposalInstructions: 'Rinse containers, remove labels when possible, and place in recycling bin.',
    environmentalImpact: 'Plastic can take 450+ years to decompose and contributes to ocean pollution.'
  },
  {
    id: 'paper',
    name: 'Paper',
    category: 'recyclable',
    icon: 'Recycle',
    description: 'Newspapers, magazines, office paper, cardboard',
    disposalInstructions: 'Keep dry and clean. Fold cardboard boxes to save space.',
    environmentalImpact: 'Recycling paper reduces deforestation and saves energy.'
  },
  {
    id: 'glass',
    name: 'Glass',
    category: 'recyclable',
    icon: 'Recycle',
    description: 'Bottles and jars of any color',
    disposalInstructions: 'Rinse containers, remove lids, and place in recycling bin.',
    environmentalImpact: 'Glass is 100% recyclable and can be recycled endlessly without degradation.'
  },
  {
    id: 'food-waste',
    name: 'Food Waste',
    category: 'compostable',
    icon: 'Apple',
    description: 'Fruit and vegetable scraps, coffee grounds, eggshells',
    disposalInstructions: 'Place in compost bin or designated compostable collection.',
    environmentalImpact: 'When composted properly, food waste becomes nutrient-rich soil instead of producing methane in landfills.'
  },
  {
    id: 'yard-waste',
    name: 'Yard Waste',
    category: 'compostable',
    icon: 'Apple',
    description: 'Leaves, grass clippings, small branches',
    disposalInstructions: 'Collect in compost pile or yard waste bin.',
    environmentalImpact: 'Composting yard waste returns nutrients to soil and reduces methane emissions.'
  },
  {
    id: 'batteries',
    name: 'Batteries',
    category: 'hazardous',
    icon: 'Battery',
    description: 'All types of batteries including AA, AAA, button cells, and rechargeable',
    disposalInstructions: 'Never throw in regular trash. Take to designated collection centers.',
    environmentalImpact: 'Batteries contain toxic chemicals that can leach into soil and water systems.'
  },
  {
    id: 'electronics',
    name: 'Electronics',
    category: 'hazardous',
    icon: 'Battery',
    description: 'Computers, phones, TVs, and other electronic devices',
    disposalInstructions: 'Take to e-waste recycling centers or retailer take-back programs.',
    environmentalImpact: 'Electronics contain valuable materials that can be recovered as well as toxic components.'
  },
  {
    id: 'general-waste',
    name: 'General Waste',
    category: 'landfill',
    icon: 'Trash',
    description: 'Items that cannot be recycled or composted',
    disposalInstructions: 'Place in regular trash bin as a last resort.',
    environmentalImpact: 'Landfill waste contributes to greenhouse gas emissions and takes up valuable land space.'
  }
];

export const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Recycle':
      return Recycle;
    case 'Apple':
      return Apple;
    case 'Battery':
      return Battery;
    case 'Trash':
      return Trash;
    default:
      return Recycle;
  }
};