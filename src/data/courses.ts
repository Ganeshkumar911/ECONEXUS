import { Course, VideoResource, DownloadableResource } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'course-1',
    title: 'Circular Economy: Sustainable Materials & Waste Management',
    subtitle: 'Learn how to transition from a linear waste economy to a regenerative circular framework.',
    category: 'Circular Economy',
    platform: {
      name: 'Coursera',
      type: 'Coursera',
      brandColor: '#0056D2',
      websiteUrl: 'https://www.coursera.org',
      logoBadgeText: 'Coursera Partner'
    },
    platformUrl: 'https://www.coursera.org/learn/circular-economy',
    instructor: 'Prof. Kraaijenhagen & Team',
    institution: 'Lund University, Sweden',
    duration: '4 Weeks (16 hours total)',
    level: 'Beginner',
    rating: 4.8,
    reviewsCount: 1420,
    enrolledCount: 38400,
    isFree: true,
    certificateAvailable: true,
    imageUrl: 'https://images.pexels.com/photos/2547565/pexels-photo-2547565.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Featured',
    overview: 'This course explores how design, business models, and policy can enable closed-loop biological and technical nutrient cycles. You will understand how materials move through ecosystems, how to minimize landfill leakage, and how urban centers can embrace zero-waste principles.',
    learningOutcomes: [
      'Master the core principles of biological & technical nutrient cycles',
      'Analyze life-cycle assessments (LCA) for everyday products',
      'Design business models for product reuse, repair, and recycling',
      'Implement zero-waste strategies in municipal and corporate contexts'
    ],
    modules: [
      {
        id: 'c1-m1',
        title: 'Module 1: Foundations of the Circular Economy',
        duration: '3 hours',
        summary: 'Introduction to linear vs. circular models, resource depletion metrics, and ecological overshoot.',
        topics: ['Linear Take-Make-Waste', 'The Butterfly Diagram', 'Decoupling Economic Growth']
      },
      {
        id: 'c1-m2',
        title: 'Module 2: Business Models for Closed-Loop Systems',
        duration: '4 hours',
        summary: 'Product-as-a-service models, extended producer responsibility (EPR), and remanufacturing.',
        topics: ['Product-Service Systems (PSS)', 'Reverse Logistics', 'Design for Disassembly']
      },
      {
        id: 'c1-m3',
        title: 'Module 3: Urban Waste Systems & Bio-Cycle Composting',
        duration: '4 hours',
        summary: 'Organic waste valorization, anaerobic digestion, and city-scale composting networks.',
        topics: ['Organic Fraction of Municipal Solid Waste', 'Biogas Generation', 'Soil Nutrient Recovery']
      },
      {
        id: 'c1-m4',
        title: 'Module 4: Policy, Metrics & Global Action Plans',
        duration: '5 hours',
        summary: 'EU Circular Economy Action Plan, international trade in recyclables, and measuring circularity.',
        topics: ['Material Flow Analysis (MFA)', 'Circular Indicators', 'Policy Instruments']
      }
    ]
  },
  {
    id: 'course-decompose-mgmt',
    title: 'Decomposition & Bio-Organic Waste Management Systems',
    subtitle: 'Comprehensive scientific course on bio-decomposition mechanics, aerobic humification, thermal decay, anaerobic digestion, and municipal organic waste infrastructure.',
    category: 'Composting & Organic',
    platform: {
      name: 'UNEP / EcoSort Academy',
      type: 'UNEP',
      brandColor: '#059669',
      websiteUrl: 'https://www.unep.org',
      logoBadgeText: 'UNEP Certified'
    },
    platformUrl: 'https://www.unep.org/courses/bio-decomposition-management',
    instructor: 'Dr. Elaine Ingham & Prof. Marco Trevisan',
    institution: 'United Nations Environment Programme (UNEP) & Bio-Cycle Institute',
    duration: '6 Weeks (24 hours total)',
    level: 'Intermediate',
    rating: 4.95,
    reviewsCount: 3820,
    enrolledCount: 56400,
    isFree: true,
    certificateAvailable: true,
    imageUrl: 'https://images.pexels.com/photos/4505168/pexels-photo-4505168.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Featured',
    overview: 'This flagship course delivers end-to-end scientific and practical knowledge on decomposition management systems. Learn how bacteria, actinomycetes, and mycorrhizal fungi break down organic compounds (lignin, cellulose, proteins). Understand Carbon-to-Nitrogen (C:N) ratio mechanics, thermophilic decay phases (up to 65°C), anaerobic methane harvesting, bio-char enhancement, and how municipal facilities manage large-scale bio-decomposition.',
    learningOutcomes: [
      'Master the biochemical stages of organic waste decomposition (Mesophilic, Thermophilic, Maturation)',
      'Calculate precise Carbon-to-Nitrogen (C:N) balance ratios (25:1 to 30:1) for optimal decay rates',
      'Design municipal forced-aerated static pile (ASP) composting & bio-degrader units',
      'Manage leachate containment, odor control bio-filters, and greenhouse gas mitigation',
      'Analyze decomposition rates for various organic and semi-synthetic waste streams'
    ],
    modules: [
      {
        id: 'cdm-m1',
        title: 'Module 1: Fundamentals of Bio-Decomposition Science & Microbiology',
        duration: '4 hours',
        summary: 'Microbial biology of decay: how aerobic bacteria, fungi, and actinomycetes breakdown organic matter.',
        topics: ['Decomposition Biochemistry', 'Cellulose & Lignin Hydrolysis', 'Soil Micro-flora Dynamics']
      },
      {
        id: 'cdm-m2',
        title: 'Module 2: Carbon-to-Nitrogen (C:N) Ratios & Moisture Optimization',
        duration: '4 hours',
        summary: 'Formulating waste feedstock mixes, measuring C:N ratios, moisture holding capacity, and oxygen exchange.',
        topics: ['C:N Stoichiometry', 'Moisture Content (50-60%)', 'Feedstock Blending Matrices']
      },
      {
        id: 'cdm-m3',
        title: 'Module 3: Aerobic Composting & Thermophilic Heat Dynamics',
        duration: '4 hours',
        summary: 'Managing temperature curves (up to 65°C) to kill pathogens and weed seeds during active decomposition.',
        topics: ['Thermophilic Heat Curve', 'PFRP Pathogen Destruction', 'Aerated Static Piles (ASP)']
      },
      {
        id: 'cdm-m4',
        title: 'Module 4: Anaerobic Digestion & Biogas Capture Systems',
        duration: '4 hours',
        summary: 'Decomposition without oxygen: methanogenesis, mesophilic reactors, and digestate bio-fertilizer recovery.',
        topics: ['Anaerobic Methanogenesis', 'Biogas Scrubbing & Utilization', 'Bio-digestate Valorization']
      },
      {
        id: 'cdm-m5',
        title: 'Module 5: Industrial Bio-Degraders, Vermicomposting & Bio-Char',
        duration: '4 hours',
        summary: 'Continuous flow bio-digesters, earthworm vermicomposting kinetics, and bio-char integration.',
        topics: ['In-Vessel Bio-Digesters', 'Vermicomposting Biology', 'Bio-Char Carbon Sequestration']
      },
      {
        id: 'cdm-m6',
        title: 'Module 6: Municipal Bio-Waste Infrastructure & Quality Standards',
        duration: '4 hours',
        summary: 'Leachate capture, bio-filter odor control, regulatory compost heavy-metal testing, and market distribution.',
        topics: ['Leachate Treatment Plants', 'Odor Bio-Filter Systems', 'Heavy Metal & Maturity Testing']
      }
    ]
  },
  {
    id: 'course-2',
    title: 'Solid Waste Management in Developing Countries',
    subtitle: 'Comprehensive guide to municipal waste collection, sanitary landfills, and informal recycling sectors.',
    category: 'Hazardous & Industrial',
    platform: {
      name: 'edX',
      type: 'edX',
      brandColor: '#B2292E',
      websiteUrl: 'https://www.edx.org',
      logoBadgeText: 'edX Verified'
    },
    platformUrl: 'https://www.edx.org/learn/waste-management',
    instructor: 'Dr. Christian Zurbrügg',
    institution: 'TU Delft & SANDEC / Eawag',
    duration: '5 Weeks (20 hours total)',
    level: 'Intermediate',
    rating: 4.9,
    reviewsCount: 2150,
    enrolledCount: 45100,
    isFree: true,
    certificateAvailable: true,
    imageUrl: 'https://images.pexels.com/photos/5240544/pexels-photo-5240544.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Bestseller',
    overview: 'Solid waste management is a key challenge for rapidly growing cities worldwide. This course covers technical solutions for collection, transport, treatment, organic waste composting, and sanitary landfilling, alongside integration of waste pickers.',
    learningOutcomes: [
      'Evaluate municipal solid waste collection and transport routing',
      'Design decentralized organic waste composting plants',
      'Understand sanitary landfill engineering, leachate control, and gas capture',
      'Include informal waste workers into formal waste management frameworks'
    ],
    modules: [
      {
        id: 'c2-m1',
        title: 'Module 1: Municipal Solid Waste Characterization & Audit',
        duration: '4 hours',
        summary: 'Sampling techniques, waste stream composition, and per capita generation rates.',
        topics: ['Waste Characterization Studies', 'Moisture Content & Calorific Value', 'Generation Forecasting']
      },
      {
        id: 'c2-m2',
        title: 'Module 2: Waste Collection & Transfer Operations',
        duration: '4 hours',
        summary: 'Primary vs. secondary collection, transfer stations, and vehicle fleet optimization.',
        topics: ['Door-to-Door Collection Systems', 'Transfer Station Design', 'Fuel & Fleet Efficiency']
      },
      {
        id: 'c2-m3',
        title: 'Module 3: Biological Treatment & Decentralized Composting',
        duration: '4 hours',
        summary: 'Windrow composting, vermicomposting, and odor mitigation strategies.',
        topics: ['Carbon to Nitrogen Ratio', 'Aeration & Moisture Control', 'Compost Quality Standards']
      },
      {
        id: 'c2-m4',
        title: 'Module 4: Landfill Engineering & Environmental Protection',
        duration: '4 hours',
        summary: 'Liner design, leachate treatment ponds, and methane capture system engineering.',
        topics: ['HDPE Liner Systems', 'Leachate Recirculation', 'Landfill Gas to Energy']
      },
      {
        id: 'c2-m5',
        title: 'Module 5: Social Inclusivity & Informal Recycling Sector',
        duration: '4 hours',
        summary: 'Integrating waste pickers, cooperatives, and safety equipment standardizations.',
        topics: ['Waste Picker Cooperatives', 'Occupational Health', 'Fair Trade Recyclables']
      }
    ]
  },
  {
    id: 'course-3',
    title: 'E-Waste Management & Urban Mining',
    subtitle: 'Methods to safely collect, dismantle, and extract precious metals from electronic waste.',
    category: 'E-Waste Management',
    platform: {
      name: 'Coursera',
      type: 'Coursera',
      brandColor: '#0056D2',
      websiteUrl: 'https://www.coursera.org',
      logoBadgeText: 'Coursera Professional'
    },
    platformUrl: 'https://www.coursera.org/learn/e-waste-management',
    instructor: 'Dr. Sarah Jenkins',
    institution: 'University of Geneva',
    duration: '3 Weeks (12 hours total)',
    level: 'Intermediate',
    rating: 4.7,
    reviewsCount: 890,
    enrolledCount: 19200,
    isFree: false,
    certificateAvailable: true,
    imageUrl: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Popular',
    overview: 'Electronic waste (e-waste) is the fastest-growing waste stream in the world. Learn how circuit boards, smartphones, lithium batteries, and CRT screens are dismantled, hazardous toxins like mercury and lead are contained, and gold, copper, and rare-earth elements are recovered through hydrometallurgy.',
    learningOutcomes: [
      'Identify hazardous components in e-waste (BFRs, mercury, heavy metals)',
      'Learn manual vs. automated PCB dismantling and hydrometallurgical extraction',
      'Understand the Basel Convention on transboundary hazardous waste movements',
      'Implement EPR compliance for electronics manufacturers and importers'
    ],
    modules: [
      {
        id: 'c3-m1',
        title: 'Module 1: E-Waste Sources & Hazardous Toxicology',
        duration: '3 hours',
        summary: 'Categorizing WEEE (Waste Electrical and Electronic Equipment) and health risks.',
        topics: ['WEEE Directives', 'Heavy Metals Toxicity', 'Brominated Flame Retardants']
      },
      {
        id: 'c3-m2',
        title: 'Module 2: Dismantling & Mechanical Pre-processing',
        duration: '3 hours',
        summary: 'Safe disassembly techniques, magnetic separation, eddy current separators.',
        topics: ['Manual Depollution', 'Shredding & Air Classification', 'Electrostatic Separation']
      },
      {
        id: 'c3-m3',
        title: 'Module 3: Urban Mining & Metal Recovery Technologies',
        duration: '3 hours',
        summary: 'Hydrometallurgy, pyrometallurgy, and bio-leaching of precious metals.',
        topics: ['Gold & Copper Leaching', 'Rare-Earth Element Recycling', 'Battery Recycling (Li-Ion)']
      },
      {
        id: 'c3-m4',
        title: 'Module 4: Global Regulations & Extended Producer Responsibility',
        duration: '3 hours',
        summary: 'Take-back schemes, RoHS compliance, and international policy frameworks.',
        topics: ['RoHS Standard', 'E-Waste Take-Back System', 'Basel Convention Compliance']
      }
    ]
  },
  {
    id: 'course-4',
    title: 'Global Course on Marine Litter & Plastic Pollution',
    subtitle: 'Action-oriented training to eliminate single-use plastics and prevent marine plastic waste.',
    category: 'Plastics & Recycling',
    platform: {
      name: 'UNEP',
      type: 'UNEP',
      brandColor: '#009EDC',
      websiteUrl: 'https://www.unep.org',
      logoBadgeText: 'UNEP Official'
    },
    platformUrl: 'https://www.unep.org/resources/emerging-issues/global-course-marine-litter',
    instructor: 'UNEP & Open University Team',
    institution: 'United Nations Environment Programme',
    duration: '4 Weeks (14 hours total)',
    level: 'All Levels',
    rating: 4.9,
    reviewsCount: 3410,
    enrolledCount: 62000,
    isFree: true,
    certificateAvailable: true,
    imageUrl: 'https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Certification Course',
    overview: 'Co-developed by the United Nations Environment Programme, this course targets plastic pollution in ocean ecosystems, river catchment areas, and coastal zones. Learn policy options, plastic resin identification, circular plastic design, and community cleanup leadership.',
    learningOutcomes: [
      'Map plastic leakage routes from terrestrial rivers to ocean gyres',
      'Differentiate PET, HDPE, PVC, LDPE, PP, and PS resin codes and recyclable properties',
      'Formulate national single-use plastic bans and plastic tax policies',
      'Lead community river-barrier cleanups and waste-tracing campaigns'
    ],
    modules: [
      {
        id: 'c4-m1',
        title: 'Module 1: Plastics in the Biosphere: Scale & Impact',
        duration: '3 hours',
        summary: 'Microplastics, ghost fishing nets, and marine organism bioaccumulation.',
        topics: ['Microplastics vs Nanoplastics', 'Oceanic Gyres', 'Marine Food Chain Impacts']
      },
      {
        id: 'c4-m2',
        title: 'Module 2: Plastic Polymer Chemistry & Recycling Codes',
        duration: '3 hours',
        summary: 'Plastics 1 through 7, mechanical vs chemical recycling, and bioplastics.',
        topics: ['SPI Resin Codes 1-7', 'Mechanical Granulation', 'Pyrolysis & Chemical Recycling']
      },
      {
        id: 'c4-m3',
        title: 'Module 3: Global Plastic Treaty & Policy Directives',
        duration: '4 hours',
        summary: 'Intergovernmental Negotiating Committee (INC) Global Plastics Treaty provisions.',
        topics: ['Global Plastics Treaty', 'Deposit Return Schemes (DRS)', 'Single-Use Bans']
      },
      {
        id: 'c4-m4',
        title: 'Module 4: Community Action & Upstream Solutions',
        duration: '4 hours',
        summary: 'Refill systems, zero-packaging retail, and river cleaning technology.',
        topics: ['Zero-Packaging Innovation', 'River Interceptors', 'Community Action Toolkit']
      }
    ]
  },
  {
    id: 'course-5',
    title: 'Integrated Waste Management for Smart Cities',
    subtitle: 'IoT-enabled waste collection, automated sorting, and smart city waste logistics.',
    category: 'Zero Waste Living',
    platform: {
      name: 'SWAYAM',
      type: 'SWAYAM',
      brandColor: '#FF6600',
      websiteUrl: 'https://swayam.gov.in',
      logoBadgeText: 'Govt. of India Initiative'
    },
    platformUrl: 'https://swayam.gov.in/courses/integrated-waste-management',
    instructor: 'Prof. Brajesh Kumar Dubey',
    institution: 'IIT Kharagpur',
    duration: '8 Weeks (32 hours total)',
    level: 'Advanced',
    rating: 4.8,
    reviewsCount: 1780,
    enrolledCount: 28900,
    isFree: true,
    certificateAvailable: true,
    imageUrl: 'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Featured',
    overview: 'This advanced course covers the integration of smart sensors, optical sorters, waste-to-energy incineration facilities, and GIS-based collection logistics tailored for modern urban centers and smart cities.',
    learningOutcomes: [
      'Deploy smart ultrasonic bin-level sensors for automated dispatching',
      'Understand near-infrared (NIR) and AI optical sorting at Material Recovery Facilities',
      'Evaluate Waste-to-Energy (WTE) incineration plant mechanics and emission scrubbers',
      'Develop GIS heatmaps for municipal waste route optimization'
    ],
    modules: [
      {
        id: 'c5-m1',
        title: 'Module 1: Smart City Waste Architecture',
        duration: '4 hours',
        summary: 'Overview of smart city waste hubs, automated vacuum collection systems, and IoT sensors.',
        topics: ['Pneumatic Waste Conveyance', 'Bin Ultrasonic Sensors', 'Real-Time Dispatching']
      },
      {
        id: 'c5-m2',
        title: 'Module 2: Automated Material Recovery Facility (MRF) Design',
        duration: '6 hours',
        summary: 'Optical sorters, robotic arms, magnetic separators, and air classifiers.',
        topics: ['NIR Optical Sorting', 'Robotic Sorting Arms', 'MRF Mass Balance']
      },
      {
        id: 'c5-m3',
        title: 'Module 3: Waste-to-Energy & Thermal Technologies',
        duration: '6 hours',
        summary: 'Refuse-Derived Fuel (RDF), grate incinerators, gasification, and flue gas cleaning.',
        topics: ['RDF Production', 'Incineration Thermodynamics', 'Dioxin & Fly Ash Scrubbers']
      },
      {
        id: 'c5-m4',
        title: 'Module 4: Hazardous & Biomedical Waste Control',
        duration: '6 hours',
        summary: 'Autoclaving, plasma pyrolysis, and hospital waste segregation standards.',
        topics: ['Biomedical Color-Coded Bins', 'Autoclaving & Shredding', 'Plasma Pyrolysis']
      }
    ]
  },
  {
    id: 'course-6',
    title: 'Home Composting & Soil Regeneration Masterclass',
    subtitle: 'Turn kitchen scraps into rich black gold fertilizer using hot, cold, and vermicomposting.',
    category: 'Composting & Organic',
    platform: {
      name: 'YouTube',
      type: 'YouTube',
      brandColor: '#FF0000',
      websiteUrl: 'https://www.youtube.com',
      logoBadgeText: 'YouTube Series'
    },
    platformUrl: 'https://www.youtube.com/watch?v=compost_masterclass',
    instructor: 'Master Composter David Eco',
    institution: 'EcoSort Academy',
    duration: '2.5 Hours (Video Series)',
    level: 'Beginner',
    rating: 4.9,
    reviewsCount: 5200,
    enrolledCount: 89000,
    isFree: true,
    certificateAvailable: false,
    imageUrl: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Free Course',
    overview: 'A hands-on video masterclass explaining how to convert food waste, coffee grounds, and yard trimmings into nutrient-rich compost at home. Covers indoor worm bins (vermicomposting), tumbler composting, bokashi fermentation, and troubleshooting foul odors.',
    learningOutcomes: [
      'Maintain the optimal 30:1 Greens (Nitrogen) to Browns (Carbon) balance',
      'Set up a red wiggler (Eisenia fetida) indoor vermicomposting bin',
      'Execute Bokashi anaerobic fermentation for meat and dairy waste',
      'Diagnose and cure common issues like fruit flies, soggy bins, and bad smells'
    ],
    modules: [
      {
        id: 'c6-m1',
        title: 'Module 1: The Chemistry of Composting (Greens vs Browns)',
        duration: '30 mins',
        summary: 'Understanding nitrogen-rich kitchen waste vs carbon-rich cardboard/leaves.',
        topics: ['Greens & Browns Guide', 'Moisture Sponge Test', 'Aeration Techniques']
      },
      {
        id: 'c6-m2',
        title: 'Module 2: Indoor Vermicomposting with Worm Bins',
        duration: '45 mins',
        summary: 'Building a DIY bin, worm feeding rules, and worm tea harvesting.',
        topics: ['Red Wiggler Care', 'Bedding Preparation', 'Harvesting Worm Castings']
      },
      {
        id: 'c6-m3',
        title: 'Module 3: Bokashi Fermentation for All Food Scraps',
        duration: '35 mins',
        summary: 'Fermenting cooked foods, cheese, and bones using EM (Effective Microorganisms) bran.',
        topics: ['Bokashi Bucket Setup', 'EM Bran Application', 'Soil Burial Method']
      },
      {
        id: 'c6-m4',
        title: 'Module 4: Garden Application & Soil Microbes',
        duration: '30 mins',
        summary: 'Using finished compost to boost garden yield, mycorrhizal fungi, and moisture retention.',
        topics: ['Soil Microbe Boost', 'Compost Top-Dressing', 'Potted Plant Application']
      }
    ]
  },
  {
    id: 'course-7',
    title: 'Zero Waste Home & Mindful Consumption',
    subtitle: 'Practical step-by-step strategies to achieve 90%+ household waste diversion.',
    category: 'Zero Waste Living',
    platform: {
      name: 'Udemy',
      type: 'Udemy',
      brandColor: '#A435F0',
      websiteUrl: 'https://www.udemy.com',
      logoBadgeText: 'Udemy Verified'
    },
    platformUrl: 'https://www.udemy.com/course/zero-waste-living',
    instructor: 'Bea Johnson & Green Experts',
    institution: 'Zero Waste Institute',
    duration: '3.5 Hours',
    level: 'Beginner',
    rating: 4.8,
    reviewsCount: 3100,
    enrolledCount: 41200,
    isFree: false,
    certificateAvailable: true,
    imageUrl: 'https://images.pexels.com/photos/2547565/pexels-photo-2547565.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Popular',
    overview: 'Learn the 5 Rs of zero waste living: Refuse, Reduce, Reuse, Recycle, and Rot. Transform your bathroom, kitchen, wardrobe, and grocery habits to dramatically cut down single-use plastic waste and save money.',
    learningOutcomes: [
      'Master the 5 Rs hierarchy in daily household decisions',
      'Conduct a 7-day home trash audit to pinpoint main waste sources',
      'Transition to plastic-free grocery shopping and bulk buying',
      'Make DIY natural cleaning products and bathroom cosmetics'
    ],
    modules: [
      {
        id: 'c7-m1',
        title: 'Module 1: The 5 Rs Framework & Mindset Shift',
        duration: '45 mins',
        summary: 'Refuse unnecessary items, reduce purchases, reuse items, recycle correctly, rot organics.',
        topics: ['The 5 Rs Explained', 'Decluttering Responsibly', 'Minimalism & Sustainability']
      },
      {
        id: 'c7-m2',
        title: 'Module 2: Zero Waste Kitchen & Bulk Grocery Shopping',
        duration: '60 mins',
        summary: 'Replacing plastic wrap, produce bags, paper towels, and shopping in bulk with jars.',
        topics: ['Bulk Store Shopping', 'Beeswax Wraps', 'Food Waste Prevention']
      },
      {
        id: 'c7-m3',
        title: 'Module 3: Plastic-Free Bathroom & Self-Care',
        duration: '50 mins',
        summary: 'Shampoo bars, safety razors, bamboo toothbrushes, and DIY toothpaste.',
        topics: ['Solid Beauty Bars', 'Safety Razor Tutorial', 'Zero Waste Toiletries']
      },
      {
        id: 'c7-m4',
        title: 'Module 4: Zero Waste on the Go & Travel',
        duration: '45 mins',
        summary: 'Building a portable zero-waste kit for eating out, commuting, and traveling.',
        topics: ['To-Go Utensils & Straws', 'Stainless Steel Containers', 'Zero Waste Travel Kit']
      }
    ]
  },
  {
    id: 'course-8',
    title: 'Industrial Ecology & Hazardous Waste Safety Protocols',
    subtitle: 'Chemical safety, toxic waste storage, radiation safety, and industrial symbiosis.',
    category: 'Hazardous & Industrial',
    platform: {
      name: 'OpenLearn',
      type: 'OpenLearn',
      brandColor: '#0072CE',
      websiteUrl: 'https://www.open.edu/openlearn',
      logoBadgeText: 'Open University UK'
    },
    platformUrl: 'https://www.open.edu/openlearn/nature-environment/waste-management',
    instructor: 'Prof. Alan Thompson',
    institution: 'The Open University, UK',
    duration: '6 Weeks (24 hours total)',
    level: 'Advanced',
    rating: 4.7,
    reviewsCount: 650,
    enrolledCount: 14300,
    isFree: true,
    certificateAvailable: true,
    imageUrl: 'https://images.pexels.com/photos/5240544/pexels-photo-5240544.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Free Course',
    overview: 'An in-depth environmental engineering course covering industrial waste streams, hazardous chemical containment, heavy metal stabilization, radiation waste storage, and industrial symbiosis where one factory’s waste becomes another’s raw material.',
    learningOutcomes: [
      'Understand industrial symbiosis networks (Kalundborg eco-industrial park model)',
      'Manage hazardous waste drum storage, spill response, and secondary containment',
      'Apply stabilization/solidification (S/S) using cementitious binders for toxic ash',
      'Comply with international hazardous transport laws (DOT/ADR/UN Dangerous Goods)'
    ],
    modules: [
      {
        id: 'c8-m1',
        title: 'Module 1: Industrial Symbiosis & Eco-Industrial Parks',
        duration: '5 hours',
        summary: 'Exchanging heat, water, and material by-products between co-located industries.',
        topics: ['Industrial Metabolism', 'By-Product Synergies', 'Kalundborg Model Case Study']
      },
      {
        id: 'c8-m2',
        title: 'Module 2: Hazardous Waste Classification & Spill Safety',
        duration: '6 hours',
        summary: 'Corrosive, reactive, toxic, and ignitable waste management under RCRA protocols.',
        topics: ['RCRA Listed Wastes', 'HAZWOPER Emergency Response', 'PPE Selection']
      },
      {
        id: 'c8-m3',
        title: 'Module 3: Toxic Waste Treatment & Stabilization',
        duration: '7 hours',
        summary: 'Chemical oxidation/reduction, neutralization, and cementitious encapsulation.',
        topics: ['Heavy Metal Stabilization', 'Supercritical Water Oxidation', 'Vitrification']
      },
      {
        id: 'c8-m4',
        title: 'Module 4: Radioactive & High-Hazard Containment',
        duration: '6 hours',
        summary: 'Low-level vs high-level nuclear waste, deep geological repositories, and glass vitrification.',
        topics: ['Nuclear Waste Classes', 'Vitrified Waste Canisters', 'Geological Repositories']
      }
    ]
  }
];

export const VIDEO_RESOURCES: VideoResource[] = [
  {
    id: 'vid-1',
    title: 'How Modern Recycling Facilities Sort Tons of Waste in Seconds',
    description: 'Take a high-tech tour inside an automated Material Recovery Facility (MRF) using optical infrared lasers and AI robotic arms.',
    duration: '10:45',
    views: '1.2M views',
    platform: 'YouTube',
    channelName: 'Science & Sustainability Tech',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    embedId: 'dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Recycling Technology'
  },
  {
    id: 'vid-2',
    title: 'Zero Waste Home Tour: 1 Year of Trash in a Single Mason Jar',
    description: 'Bea Johnson demonstrates how a family of four produces virtually zero landfill waste using five core rules.',
    duration: '14:20',
    views: '890K views',
    platform: 'YouTube',
    channelName: 'Zero Waste Living',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    embedId: 'dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.pexels.com/photos/2547565/pexels-photo-2547565.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Zero Waste Living'
  },
  {
    id: 'vid-3',
    title: 'Composting for Beginners: Step-by-Step Food Scrap Recycling',
    description: 'Learn the exact ratio of nitrogen vs carbon, how often to turn your compost bin, and how to prevent smells.',
    duration: '8:50',
    views: '450K views',
    platform: 'YouTube',
    channelName: 'Urban Organic Gardener',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    embedId: 'dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Composting'
  },
  {
    id: 'vid-4',
    title: 'The Truth About Plastic Recycling: Numbers 1 to 7 Explained',
    description: 'Breakdown of plastic codes on bottles, food containers, and packaging to ensure proper curbside sorting.',
    duration: '12:15',
    views: '620K views',
    platform: 'YouTube',
    channelName: 'Eco Explained',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    embedId: 'dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Plastics'
  }
];

export const DOWNLOADABLE_RESOURCES: DownloadableResource[] = [
  {
    id: 'doc-1',
    title: 'Comprehensive Resin Code & Recycling Symbol Guide',
    fileType: 'PDF Guide',
    description: 'Printable standard cheat-sheet detailing plastic numbers 1-7, paper grades, glass types, e-waste, and hazardous warnings.',
    fileSize: '2.4 MB',
    downloadCount: '15,400 downloads',
    downloadUrl: '#',
    previewContent: [
      'PETE (1): Soda bottles, water containers - Highly Recyclable',
      'HDPE (2): Milk jugs, shampoo bottles - Highly Recyclable',
      'PVC (3): Piping, vinyl - Requires Special Facility Handling',
      'LDPE (4): Grocery bags - Recycle at Grocery Drop-off Bins',
      'PP (5): Yogurt tubs, medicine bottles - Recyclable in Most Bins',
      'PS (6): Styrofoam - Avoid, Not Recyclable in Standard Bins',
      'OTHER (7): Polycarbonate/Mixed resins - Special E-Waste Facility Only'
    ]
  },
  {
    id: 'doc-2',
    title: '7-Day Household Waste Audit Worksheet',
    fileType: 'Worksheet',
    description: 'Track daily weight and volume of food scraps, paper, plastic packaging, and landfill trash to calculate your diversion rate.',
    fileSize: '1.1 MB',
    downloadCount: '9,800 downloads',
    downloadUrl: '#',
    previewContent: [
      'Day 1-7 Logs: Weight in Kg for Recyclables, Organic, Landfill',
      'Category Checklist: Single-use plastics, food packaging, organic scraps',
      'Waste Diversion Formula: (Recycled + Composted / Total Waste) * 100',
      'Action Plan Template: 3 High-impact swaps for next week'
    ]
  },
  {
    id: 'doc-3',
    title: 'Zero-Waste Grocery & Pantry Shopping Checklist',
    fileType: 'Checklist',
    description: 'Handy pocket guide for buying loose produce, bulk grains, refillable liquids, and avoiding plastic packaging.',
    fileSize: '850 KB',
    downloadCount: '18,200 downloads',
    downloadUrl: '#',
    previewContent: [
      'Pre-Shop Kit: Cloth produce bags, stainless steel containers, tare weight jars',
      'Bulk Aisle Guide: Grains, nuts, spices, oils, soaps',
      'Produce Swap Rules: Loose fruits & veggies vs plastic clamshells',
      'Store Request Template: Asking local grocer for plastic-free options'
    ]
  },
  {
    id: 'doc-4',
    title: 'Home Composting Ratio & Troubleshooting Matrix',
    fileType: 'Infographic',
    description: 'Quick reference chart showing exact Nitrogen (Greens) to Carbon (Browns) ratios and quick fixes for bin smells.',
    fileSize: '3.2 MB',
    downloadCount: '12,100 downloads',
    downloadUrl: '#',
    previewContent: [
      'Optimal Ratio: 30 Parts Carbon (Browns) to 1 Part Nitrogen (Greens)',
      'Green Materials: Fruit peels, coffee grounds, fresh grass, vegetable scraps',
      'Brown Materials: Dry leaves, cardboard boxes, straw, wood chips',
      'Troubleshooting: Rotten smell -> Add dry browns & turn; Fruit flies -> Bury greens under 3 inches of browns'
    ]
  }
];
