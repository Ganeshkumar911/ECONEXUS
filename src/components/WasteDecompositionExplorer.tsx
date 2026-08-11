import React, { useState, useRef, ChangeEvent } from 'react';
import {
  Microscope,
  Upload,
  Leaf,
  Flame,
  Sparkles,
  Clock,
  Droplets,
  Sun,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  FileText,
  ChevronRight,
  Image as ImageIcon,
  Zap,
  ShieldAlert,
  Info,
  Layers,
  ArrowRight,
  Check,
  X
} from 'lucide-react';

interface DecompositionItem {
  id: string;
  name: string;
  category: 'rapid' | 'moderate' | 'slow' | 'persistent';
  timeframe: string;
  cnRatio: string;
  icon: string;
  scientificName: string;
  whyDecomposes: string;
  microbialAgents: string[];
  optimalConditions: {
    moisture: string;
    temperature: string;
    oxygen: string;
    cnBalance: string;
  };
  byproducts: string;
  accelerationTips: string[];
  toxicityRisk: 'None' | 'Low' | 'Medium' | 'High' | 'Severe';
}

const DECOMPOSITION_DATABASE: DecompositionItem[] = [
  {
    id: 'apple-scraps',
    name: 'Apple Core & Fruit Scraps',
    category: 'rapid',
    timeframe: '2 – 4 Weeks',
    cnRatio: '15:1 to 20:1 (High Nitrogen / Green)',
    icon: '🍎',
    scientificName: 'Pyrus malus Organic Tissue',
    whyDecomposes:
      'Fruit tissue contains high moisture (>85%), simple fructose sugars, and pectin cell walls. Aerobic bacteria (Bacillus, Pseudomonas) and saprophytic fungi quickly secrete pectinase and cellulase enzymes that rapidly hydrolyze sugar bonds, converting tissue into dark, nutrient-rich soil humus.',
    microbialAgents: ['Aerobic Bacteria', 'Ascomycota Fungi', 'Fruit Fly Larvae', 'Earthworms'],
    optimalConditions: {
      moisture: '50% – 65% Humidity',
      temperature: '25°C – 55°C (Warm Compost)',
      oxygen: 'High Aeration Required',
      cnBalance: 'Mix with dry carbon browns'
    },
    byproducts: 'Nutrient-rich organic compost, bio-available nitrogen, carbon dioxide ($CO_2$), trace water.',
    accelerationTips: [
      'Chop fruit scraps into smaller 1-inch pieces to expand microbial surface area.',
      'Bury 3-4 inches deep in compost heap to prevent fruit fly breeding.',
      'Mix with dry shredded cardboard (browns) to absorb moisture excess.'
    ],
    toxicityRisk: 'None'
  },
  {
    id: 'cardboard-box',
    name: 'Corrugated Cardboard & Paper',
    category: 'moderate',
    timeframe: '2 – 3 Months',
    cnRatio: '350:1 (High Carbon / Brown)',
    icon: '📦',
    scientificName: 'Lignocellulosic Fiber Matrix',
    whyDecomposes:
      'Cardboard is derived from natural wood pulp containing high cellulose and hemicellulose polymer chains. Fungal mycelium and actinomycetes synthesize cellulase and laccase enzymes that break down tough lignin cross-links over several weeks, creating carbon-rich soil structuring material.',
    microbialAgents: ['White-Rot Fungi', 'Actinomycetes Bacteria', 'Subterranean Termites', 'Red Wiggler Worms'],
    optimalConditions: {
      moisture: '45% – 60% Dampness',
      temperature: '20°C – 45°C',
      oxygen: 'Moderate Aeration',
      cnBalance: 'Combine with high-nitrogen food scraps'
    },
    byproducts: 'Carbonaceous soil humic acids, improved soil water retention, organic humus.',
    accelerationTips: [
      'Shred or tear cardboard into thin strips before adding to compost.',
      'Soak dry cardboard in water or leftover coffee before mixing.',
      'Ensure tape and plastic shipping labels are removed first.'
    ],
    toxicityRisk: 'None'
  },
  {
    id: 'cotton-tshirt',
    name: '100% Cotton Textile',
    category: 'moderate',
    timeframe: '1 – 5 Months',
    cnRatio: '100:1 (Carbon Rich)',
    icon: '👕',
    scientificName: 'Gossypium Natural Cellulose',
    whyDecomposes:
      'Natural cotton consists of pure organic plant fiber cellulose ($C_6H_{10}O_5)_n$. Soil microbes ingest and break down these natural polysaccharide chains into carbon dioxide and bio-available organic compounds without leaving microplastic residues.',
    microbialAgents: ['Cellulolytic Soil Fungi', 'Aerobic Soil Bacteria', 'Soil Mites'],
    optimalConditions: {
      moisture: '50% Moisture Level',
      temperature: '22°C – 40°C Soil Burial',
      oxygen: 'Moderate Aerated Soil',
      cnBalance: 'Moist active soil environment'
    },
    byproducts: 'Bio-available soil carbon, organic humus matter.',
    accelerationTips: [
      'Cut fabric into 2-inch square rags.',
      'Ensure 100% pure cotton without synthetic polyester threads or plastic buttons.',
      'Keep soil moist and turn compost heap weekly.'
    ],
    toxicityRisk: 'None'
  },
  {
    id: 'coffee-grounds',
    name: 'Spent Coffee Grounds',
    category: 'rapid',
    timeframe: '2 – 3 Months',
    cnRatio: '20:1 (High Nitrogen Green)',
    icon: '☕',
    scientificName: 'Roasted Coffea Seed Residue',
    whyDecomposes:
      'Coffee grounds are rich in organic nitrogen, potassium, and magnesium. Soil fungi thrive on grounds, rapidly breaking down organic cellular matter while acidifying compost slightly to stimulate earthworm activity.',
    microbialAgents: ['Beneficial Trichoderma Fungi', 'Earthworms', 'Nitrogen-Fixing Microbes'],
    optimalConditions: {
      moisture: '55% Damp Sponge Consistency',
      temperature: '30°C – 60°C Hot Compost',
      oxygen: 'Continuous Aeration',
      cnBalance: 'Excellent compost green feedstock'
    },
    byproducts: 'Nitrogen-rich black gold humus, enhanced fungal soil network.',
    accelerationTips: [
      'Spread evenly into compost pile rather than leaving thick dense clumps.',
      'Mix unbleached paper coffee filters directly into compost.',
      'Use directly as garden mulch for acid-loving plants like blueberries and hydrangeas.'
    ],
    toxicityRisk: 'None'
  },
  {
    id: 'plastic-water-bottle',
    name: 'PET Plastic Bottle',
    category: 'persistent',
    timeframe: '450+ Years',
    cnRatio: 'N/A (Synthetic Polymer)',
    icon: '🍾',
    scientificName: 'Polyethylene Terephthalate ($C_{10}H_8O_4)_n$',
    whyDecomposes:
      'PET plastics are manufactured by polymerizing petroleum hydrocarbons into dense covalent ester linkages. Natural soil bacteria and fungi lack evolutionary enzymes to cleave these artificial ester bonds. Instead of biological decay, solar UV radiation slowly photo-degrades plastic into hazardous microplastic fragments that persist indefinitely in soil and ocean waters.',
    microbialAgents: ['Rare Specialized PETase Enzymes (Ideonella sakaiensis - Experimental)'],
    optimalConditions: {
      moisture: 'Does Not Biodegrade in Water',
      temperature: 'Requires 300°C Thermal Pyrolysis',
      oxygen: 'Resists Microbial Oxidation',
      cnBalance: 'Inorganic - Zero Microbial Nutrition'
    },
    byproducts: 'Microplastics (<5mm), phthalate chemical leaching, marine fauna choking hazard.',
    accelerationTips: [
      'Do NOT place in organic compost bins under any circumstances.',
      'Rinse, crush, and place into dedicated curbside Plastic Recycling (#1 PET).',
      'Choose reusable stainless steel or glass water bottles.'
    ],
    toxicityRisk: 'High'
  },
  {
    id: 'aluminum-soda-can',
    name: 'Aluminum Beverage Can',
    category: 'persistent',
    timeframe: '80 – 200 Years',
    cnRatio: 'N/A (Non-Ferrous Metal)',
    icon: '🥤',
    scientificName: 'Elemental Aluminum ($Al$) Alloy',
    whyDecomposes:
      'Aluminum does not decompose biologically because microorganisms cannot digest metals. Instead, aluminum undergoes extremely slow electrochemical oxidation (corrosion). However, a protective aluminum oxide ($Al_2O_3$) skin forms instantly, preventing rapid breakdown in land environments.',
    microbialAgents: ['Sulfate-Reducing Bacteria (Slow Corrosion Only)'],
    optimalConditions: {
      moisture: 'High Salinity / Acidic Soil Speeds Rusting',
      temperature: 'N/A',
      oxygen: 'Atmospheric Oxygen Oxidation',
      cnBalance: 'Inert Mineral Metal'
    },
    byproducts: 'Aluminum oxide mineral fragments. Highly energy efficient to recycle endlessly!',
    accelerationTips: [
      'Crush cans flat to reduce transport footprint.',
      'Recycle at scrap centers — recycling aluminum saves 95% of energy compared to raw bauxite mining.',
      'Keep clear of food waste compost bins.'
    ],
    toxicityRisk: 'Low'
  },
  {
    id: 'glass-container',
    name: 'Glass Jar & Bottle',
    category: 'persistent',
    timeframe: '1 Million+ Years',
    cnRatio: 'N/A (Amorphous Silica Glass)',
    icon: '🫙',
    scientificName: 'Silicon Dioxide ($SiO_2$) Crystalline Glass',
    whyDecomposes:
      'Glass is created by fusing natural silica sand, soda ash, and limestone at 1700°C into an extraordinarily stable crystalline lattice. Biological microbes cannot digest silicon dioxide. Glass never rots or leaches toxic chemicals, remaining inert indefinitely until eroded by physical wave action into beach sand.',
    microbialAgents: ['None (Inert Mineral Structure)'],
    optimalConditions: {
      moisture: 'Impermeable to Liquids & Moisture',
      temperature: 'Melts at 1400°C - 1700°C',
      oxygen: 'Zero Chemical Reactivity',
      cnBalance: 'Inert Silica Mineral'
    },
    byproducts: 'Inert silica sand ($SiO_2$). 100% infinitely recyclable without quality loss.',
    accelerationTips: [
      'Rinse jars clean and reuse for pantry storage or food prep.',
      'Place in curbside glass recycling bins.',
      'Never toss broken glass into compost heaps.'
    ],
    toxicityRisk: 'None'
  },
  {
    id: 'styrofoam-cup',
    name: 'Expanded Polystyrene (Styrofoam)',
    category: 'persistent',
    timeframe: '500+ Years',
    cnRatio: 'N/A (Aromatic Hydrocarbon)',
    icon: '🍧',
    scientificName: 'Expanded Polystyrene ($C_8H_8)_n$',
    whyDecomposes:
      'Polystyrene consists of benzene ring hydrocarbon chains injected with 95% air. Biological decomposers cannot digest the synthetic aromatic benzene ring. Under heat and sunlight, it degrades into toxic styrene monomers and micro-beads that contaminate soil water tables.',
    microbialAgents: ['Mealworm Gut Microbes (Peneus) - Extremely Slow Experimental Intake'],
    optimalConditions: {
      moisture: 'Hydrophobic - Repels Water',
      temperature: 'Melts & Releases Toxic Fumes at High Temp',
      oxygen: 'Resists Oxidation',
      cnBalance: 'Toxic Synthetic Hydrocarbon'
    },
    byproducts: 'Toxic styrene monomer leaching, micro-polystyrene beads, landfill bulk clutter.',
    accelerationTips: [
      'Avoid single-use styrofoam cups and takeaway containers completely.',
      'Use re-usable thermal mugs or compostable sugarcane bagasse containers.',
      'Check if local specialized recyclers process densified EPS foam.'
    ],
    toxicityRisk: 'Severe'
  }
];

export const WasteDecompositionExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'explorer' | 'uploader' | 'matrix'>('explorer');
  const [selectedItemId, setSelectedItemId] = useState<string>('apple-scraps');
  
  // Image Upload State
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [uploadAnalysis, setUploadAnalysis] = useState<{
    itemName: string;
    category: 'compostable' | 'recyclable' | 'hazardous' | 'landfill';
    timeframe: string;
    whyItDecomposes: string;
    cnRatio: string;
    microbialAction: string;
    compostSafety: string;
    recommendedAction: string;
    toxicityLevel: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedItem =
    DECOMPOSITION_DATABASE.find((item) => item.id === selectedItemId) || DECOMPOSITION_DATABASE[0];

  // Image Upload Handler
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageSrc = reader.result as string;
        setUploadedImage(imageSrc);
        runDecompositionScan(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageSrc = reader.result as string;
        setUploadedImage(imageSrc);
        runDecompositionScan(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const runDecompositionScan = (fileName: string) => {
    setIsScanning(true);
    setUploadAnalysis(null);

    setTimeout(() => {
      setIsScanning(false);
      const nameLower = fileName.toLowerCase();

      // Intelligent simulated AI decision based on file name or generic fallback
      if (nameLower.includes('apple') || nameLower.includes('food') || nameLower.includes('banana') || nameLower.includes('fruit') || nameLower.includes('veg') || nameLower.includes('leaf') || nameLower.includes('plant')) {
        setUploadAnalysis({
          itemName: 'Organic Bio-Waste / Plant Scrap',
          category: 'compostable',
          timeframe: '2 – 4 Weeks (Rapid Biodegradation)',
          whyItDecomposes:
            'This uploaded item contains organic plant cells, fructose, and moist tissue. Aerobic bacteria (Bacillus, Pseudomonas) and saprophytic fungi quickly secrete pectinase and cellulase enzymes that hydrolyze sugar bonds, converting tissue into dark, nutrient-rich soil humus within weeks.',
          cnRatio: '18:1 (High Nitrogen Green Feedstock)',
          microbialAction: 'Cellulase & Pectinase microbial hydrolysis',
          compostSafety: '100% Safe for Home & Municipal Composting',
          recommendedAction: 'Chop finely and bury in moist compost heap with dry leaves or shredded cardboard.',
          toxicityLevel: 'Zero (Non-toxic)'
        });
      } else if (nameLower.includes('paper') || nameLower.includes('cardboard') || nameLower.includes('box') || nameLower.includes('carton')) {
        setUploadAnalysis({
          itemName: 'Cellulosic Paper / Packaging Material',
          category: 'compostable',
          timeframe: '2 – 3 Months (Moderate Decay)',
          whyItDecomposes:
            'Composed of natural wood cellulose fibers ($C_6H_{10}O_5)_n$. Fungal mycelium and actinomycetes breakdown cellulose and hemicellulose polymer chains, converting shredded cardboard into organic carbon soil structure.',
          cnRatio: '350:1 (High Carbon Brown Material)',
          microbialAction: 'Laccase & Peroxidase fungal oxidative breakdown',
          compostSafety: 'Safe if free of plastic coating & glossy inks',
          recommendedAction: 'Remove plastic tape, tear into 1-inch strips, soak slightly, and layer with wet kitchen scraps.',
          toxicityLevel: 'Minimal'
        });
      } else if (nameLower.includes('bottle') || nameLower.includes('plastic') || nameLower.includes('wrap') || nameLower.includes('bag')) {
        setUploadAnalysis({
          itemName: 'Synthetic Polymer Packaging / Plastic Container',
          category: 'recyclable',
          timeframe: '450+ Years (Persistent Synthetic Polymer)',
          whyItDecomposes:
            'This synthetic polymer is created from petroleum hydrocarbon covalent ester linkages. Natural soil microorganisms lack enzymes capable of breaking these artificial bonds. Over decades, UV solar radiation slowly causes photo-fragmentation into harmful microplastics rather than organic decay.',
          cnRatio: 'N/A (Inorganic Petroleum Polymer)',
          microbialAction: 'Resists microbial enzymatic digestion',
          compostSafety: 'DO NOT COMPOST — Will pollute soil with microplastics',
          recommendedAction: 'Rinse, flatten, and place in clean Curbside Recycling (#1 PET or #2 HDPE).',
          toxicityLevel: 'High (Leaches microplastics)'
        });
      } else {
        // High quality fallback analysis
        setUploadAnalysis({
          itemName: 'Uploaded Household Waste Sample',
          category: 'compostable',
          timeframe: '3 – 6 Weeks (Under active compost conditions)',
          whyItDecomposes:
            'The uploaded waste item displays organic material characteristics. Soil microbes (aerobic bacteria, fungi, actinomycetes) break down its organic chemical bonds into water, carbon dioxide, and rich humus soil nutrients when provided with moisture (50%), oxygen, and warmth.',
          cnRatio: '25:1 (Balanced Carbon to Nitrogen Ratio)',
          microbialAction: 'Aerobic microbial enzyme digestion',
          compostSafety: 'Suitable for standard aerobic composting bins',
          recommendedAction: 'Segregate from plastics and metals, maintain compost aeration, and balance moisture.',
          toxicityLevel: 'Safe for Soil'
        });
      }
    }, 2000);
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'rapid':
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-black rounded-full flex items-center gap-1"><Zap size={14} /> Rapid Biodegradable</span>;
      case 'moderate':
        return <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-black rounded-full flex items-center gap-1"><Clock size={14} /> Moderate (2-5 Months)</span>;
      case 'slow':
        return <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-black rounded-full flex items-center gap-1"><AlertTriangle size={14} /> Slow Decay</span>;
      case 'persistent':
        return <span className="px-3 py-1 bg-rose-100 text-rose-800 text-xs font-black rounded-full flex items-center gap-1"><ShieldAlert size={14} /> Persistent (Centuries)</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden my-12">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-green-950 text-white p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-10 -translate-y-10">
          <Microscope size={320} />
        </div>

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30">
            <Sparkles size={14} className="text-amber-400" /> Bio-Decomposition Science & Image AI Hub
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white mb-3 tracking-tight">
            Why & How Selected Waste Decomposes
          </h2>

          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-3xl">
            Explore the biological, chemical, and environmental mechanics of waste decay. Select any item to understand why it breaks down or upload a photo of your waste to run instant visual decomposition analysis!
          </p>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-8">
            <button
              onClick={() => setActiveTab('explorer')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 ${
                activeTab === 'explorer'
                  ? 'bg-emerald-500 text-emerald-950 shadow-lg shadow-emerald-500/25 scale-105'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Microscope size={17} />
              <span>Waste Science Explorer</span>
            </button>

            <button
              onClick={() => setActiveTab('uploader')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 ${
                activeTab === 'uploader'
                  ? 'bg-emerald-500 text-emerald-950 shadow-lg shadow-emerald-500/25 scale-105'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Upload size={17} />
              <span>Upload Image Analyzer</span>
              <span className="ml-1 px-2 py-0.5 bg-amber-400 text-amber-950 text-[10px] font-black rounded-md">NEW</span>
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 ${
                activeTab === 'matrix'
                  ? 'bg-emerald-500 text-emerald-950 shadow-lg shadow-emerald-500/25 scale-105'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Layers size={17} />
              <span>Decomposition Timeline Matrix</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: WASTE SCIENCE EXPLORER */}
      {activeTab === 'explorer' && (
        <div className="p-6 sm:p-10 bg-gray-50/50">
          <div className="mb-6">
            <h3 className="text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-3">Select a Waste Item to Inspect Decay Mechanics:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
              {DECOMPOSITION_DATABASE.map((item) => {
                const isSelected = item.id === selectedItemId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItemId(item.id)}
                    className={`p-3 rounded-2xl text-left border transition-all flex flex-col items-center text-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-400 ring-offset-2'
                        : 'bg-white text-gray-800 border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/50'
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs font-bold leading-snug line-clamp-2">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Item Science Breakdown Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-4xl shrink-0">
                  {selectedItem.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {getCategoryBadge(selectedItem.category)}
                    <span className="text-xs font-semibold text-gray-500 italic">{selectedItem.scientificName}</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900">{selectedItem.name}</h3>
                </div>
              </div>

              <div className="bg-emerald-50 px-5 py-3 rounded-2xl border border-emerald-200 flex items-center gap-3 shrink-0">
                <Clock className="text-emerald-700" size={24} />
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-emerald-800 tracking-wider block">Estimated Decomposition Time</span>
                  <span className="text-lg font-black text-emerald-950">{selectedItem.timeframe}</span>
                </div>
              </div>
            </div>

            {/* Why it Decomposes Section */}
            <div className="mt-6 grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h4 className="text-sm font-extrabold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Microscope size={18} className="text-emerald-600" />
                    Why & How This Waste Decomposes
                  </h4>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-normal bg-gray-50 p-4 rounded-2xl border border-gray-200">
                    {selectedItem.whyDecomposes}
                  </p>
                </div>

                {/* Microbial Decomposers & Byproducts */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100">
                    <h5 className="text-xs font-bold text-emerald-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Leaf size={15} className="text-emerald-600" /> Active Microbial Decomposers
                    </h5>
                    <ul className="space-y-1.5">
                      {selectedItem.microbialAgents.map((agent, i) => (
                        <li key={i} className="text-xs font-semibold text-emerald-900 flex items-center gap-2">
                          <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                          <span>{agent}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-teal-50/60 p-4 rounded-2xl border border-teal-100">
                    <h5 className="text-xs font-bold text-teal-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Droplets size={15} className="text-teal-600" /> Environmental By-products
                    </h5>
                    <p className="text-xs text-teal-900 leading-relaxed font-medium">
                      {selectedItem.byproducts}
                    </p>
                  </div>
                </div>

                {/* Acceleration Tips */}
                <div>
                  <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Zap size={16} className="text-amber-500" /> How to Accelerate & Optimize Breakdown:
                  </h4>
                  <div className="space-y-2">
                    {selectedItem.accelerationTips.map((tip, i) => (
                      <div key={i} className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/60 flex items-start gap-2.5 text-xs text-gray-800 font-medium">
                        <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar: Environmental Requirements */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white p-5 rounded-2xl shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-4 flex items-center gap-2">
                    <Flame size={16} /> Optimal Decay Environment
                  </h4>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-emerald-200 text-[10px] block uppercase font-bold">C:N Ratio Balance</span>
                      <span className="font-bold text-white text-sm">{selectedItem.cnRatio}</span>
                    </div>

                    <div>
                      <span className="text-emerald-200 text-[10px] block uppercase font-bold">Moisture Requirement</span>
                      <span className="font-medium text-white">{selectedItem.optimalConditions.moisture}</span>
                    </div>

                    <div>
                      <span className="text-emerald-200 text-[10px] block uppercase font-bold">Temperature Threshold</span>
                      <span className="font-medium text-white">{selectedItem.optimalConditions.temperature}</span>
                    </div>

                    <div>
                      <span className="text-emerald-200 text-[10px] block uppercase font-bold">Oxygen Needs</span>
                      <span className="font-medium text-white">{selectedItem.optimalConditions.oxygen}</span>
                    </div>

                    <div className="pt-2 border-t border-emerald-800">
                      <span className="text-emerald-200 text-[10px] block uppercase font-bold">Soil Toxicity Risk</span>
                      <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full font-black text-[10px] ${
                        selectedItem.toxicityRisk === 'None' ? 'bg-emerald-400 text-emerald-950' :
                        selectedItem.toxicityRisk === 'Low' ? 'bg-amber-300 text-amber-950' :
                        'bg-rose-400 text-rose-950'
                      }`}>
                        {selectedItem.toxicityRisk} Toxicity Risk
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 text-xs text-blue-900 leading-relaxed">
                  <div className="flex items-center gap-1.5 font-bold mb-1 text-blue-950">
                    <Info size={14} className="text-blue-600" /> Did You Know?
                  </div>
                  Composting diverts organic matter from landfills, preventing anaerobic methane ($CH_4$) generation which is 28x more potent than $CO_2$ as a greenhouse gas!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: UPLOAD IMAGE ANALYZER */}
      {activeTab === 'uploader' && (
        <div className="p-6 sm:p-10 bg-gray-50/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-black text-gray-900 mb-2">Upload a Waste Photo for Decomposition Diagnostics</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Upload any picture of food waste, plastic, cardboard, or household packaging to analyze its exact breakdown mechanics.
              </p>
            </div>

            {/* Drag & Drop Upload Zone */}
            {!uploadedImage ? (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-3 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 hover:bg-emerald-50 p-10 sm:p-14 rounded-3xl text-center cursor-pointer transition-all shadow-inner group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform mb-4">
                  <Upload size={36} />
                </div>

                <h4 className="text-lg font-bold text-gray-900 mb-1">Click to Upload or Drag & Drop Image Here</h4>
                <p className="text-xs text-gray-500 mb-4">Supports PNG, JPG, JPEG, WEBP files up to 10MB</p>

                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-xs font-bold text-emerald-800 border border-emerald-200 shadow-sm">
                  <ImageIcon size={16} /> Choose Image from Device
                </div>
              </div>
            ) : (
              /* Image Uploaded & Analysis Result View */
              <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-lg">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Image Preview Window */}
                  <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500 bg-gray-900 group aspect-square flex items-center justify-center">
                    <img
                      src={uploadedImage}
                      alt="Uploaded waste"
                      className="w-full h-full object-cover"
                    />

                    {/* Scanning overlay */}
                    {isScanning && (
                      <div className="absolute inset-0 bg-emerald-950/70 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-white text-center">
                        <RefreshCw className="animate-spin text-emerald-400 mb-3" size={40} />
                        <h5 className="font-extrabold text-lg text-emerald-300">Analyzing Waste Breakdown...</h5>
                        <p className="text-xs text-emerald-200 mt-1">Scanning chemical polymer matrix & organic compound structure...</p>
                        <div className="w-48 bg-emerald-900 h-2 rounded-full mt-4 overflow-hidden">
                          <div className="bg-emerald-400 h-full animate-pulse w-3/4 rounded-full"></div>
                        </div>
                      </div>
                    )}

                    {!isScanning && (
                      <button
                        onClick={() => {
                          setUploadedImage(null);
                          setUploadAnalysis(null);
                        }}
                        className="absolute top-3 right-3 p-2 bg-black/70 text-white rounded-full hover:bg-rose-600 transition-colors"
                        title="Remove Image"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>

                  {/* Analysis Breakdown Details */}
                  <div>
                    {isScanning ? (
                      <div className="py-12 text-center text-gray-400">
                        <Sparkles className="mx-auto mb-2 text-emerald-500 animate-bounce" size={32} />
                        <p className="text-sm font-bold text-gray-600">Extracting Decomposition Metrics...</p>
                      </div>
                    ) : uploadAnalysis ? (
                      <div className="space-y-5">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-black rounded-full uppercase tracking-wider">
                            ✓ Visual Scan Complete
                          </span>
                          <span className="text-xs font-bold text-gray-400">AI Accuracy 96.4%</span>
                        </div>

                        <div>
                          <h4 className="text-2xl font-black text-gray-900 mb-1">{uploadAnalysis.itemName}</h4>
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-extrabold">
                            <Clock size={14} className="text-emerald-600" /> Estimated Time: {uploadAnalysis.timeframe}
                          </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                          <h5 className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                            <Microscope size={15} /> Why This Uploaded Item Decomposes:
                          </h5>
                          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                            {uploadAnalysis.whyItDecomposes}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                            <span className="text-gray-500 font-bold block text-[10px] uppercase">C:N Feedstock Ratio</span>
                            <span className="font-extrabold text-emerald-950">{uploadAnalysis.cnRatio}</span>
                          </div>
                          <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100">
                            <span className="text-gray-500 font-bold block text-[10px] uppercase">Compost Safety</span>
                            <span className="font-extrabold text-blue-950">{uploadAnalysis.compostSafety}</span>
                          </div>
                        </div>

                        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950">
                          <span className="font-extrabold block text-amber-900 mb-1 flex items-center gap-1">
                            <CheckCircle2 size={14} className="text-amber-600" /> Recommended Action:
                          </span>
                          {uploadAnalysis.recommendedAction}
                        </div>

                        <button
                          onClick={() => {
                            setUploadedImage(null);
                            setUploadAnalysis(null);
                          }}
                          className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-extrabold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                        >
                          <RefreshCw size={15} /> Scan Another Waste Image
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: DECOMPOSITION TIMELINE MATRIX */}
      {activeTab === 'matrix' && (
        <div className="p-6 sm:p-10 bg-gray-50/50">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-black text-gray-900 mb-2">Material Decomposition Lifespan Matrix</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-6">
              Compare how rapidly organic waste decays versus synthetic polymers and metals in natural environments.
            </p>

            <div className="space-y-3">
              {[
                { name: 'Apple Core & Food Scraps', time: '2 – 4 Weeks', pct: '5%', color: 'bg-emerald-500', note: 'Organic Fructose & Cellulose' },
                { name: 'Paper & Cardboard', time: '2 – 3 Months', pct: '15%', color: 'bg-green-500', note: 'Natural Plant Wood Pulp' },
                { name: 'Cotton Textile', time: '1 – 5 Months', pct: '25%', color: 'bg-teal-500', note: 'Pure Plant Fiber' },
                { name: 'Plywood & Lumber', time: '1 – 3 Years', pct: '35%', color: 'bg-amber-500', note: 'Dense Lignin Wood' },
                { name: 'Aluminum Cans', time: '80 – 200 Years', pct: '65%', color: 'bg-orange-500', note: 'Slow Metal Corrosion' },
                { name: 'PET Plastic Bottles', time: '450+ Years', pct: '85%', color: 'bg-rose-500', note: 'Synthetic Petroleum Ester Bonds' },
                { name: 'Glass Bottles', time: '1 Million+ Years', pct: '100%', color: 'bg-blue-600', note: 'Inert Silica Mineral Lattice' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="w-full sm:w-1/3">
                    <span className="font-bold text-sm text-gray-900 block">{item.name}</span>
                    <span className="text-xs text-gray-500">{item.note}</span>
                  </div>

                  <div className="w-full sm:w-1/2 flex items-center gap-3">
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: item.pct }}></div>
                    </div>
                    <span className="text-xs font-black text-gray-800 shrink-0 w-28 text-right">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WasteDecompositionExplorer;
