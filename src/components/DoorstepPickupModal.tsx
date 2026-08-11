import React, { useState } from 'react';
import { X, Truck, Calendar, MapPin, Phone, CheckCircle2, Package, Sparkles } from 'lucide-react';
import { RecyclingCenter } from '../types';

interface DoorstepPickupModalProps {
  center: RecyclingCenter | null;
  onClose: () => void;
}

export const DoorstepPickupModal: React.FC<DoorstepPickupModalProps> = ({ center, onClose }) => {
  if (!center) return null;

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '600032',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: '10:00 AM - 1:00 PM',
    wasteType: 'Paper & Cardboard Scrap',
    estimatedWeight: '10 - 20 kg',
    specialNotes: ''
  });

  const [bookingId, setBookingId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `TN-PICKUP-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(generatedId);
    setStep('success');
  };

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
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 bg-emerald-700/80 rounded-lg text-emerald-300">
              <Truck size={20} />
            </span>
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-300">
              Chennai Doorstep Service
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold">Schedule Scrap Pickup</h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            Partner Center: <strong>{center.name}</strong> ({center.zone || 'Chennai'})
          </p>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Mobile Number (Tamil Nadu)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Doorstep Pickup Address (Chennai & TN)
              </label>
              <textarea
                required
                rows={2}
                placeholder="Door No, Street Name, Area (e.g. Velachery / Guindy / Anna Nagar)..."
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Preferred Pickup Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Preferred Time Slot
                </label>
                <select
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                >
                  <option value="09:00 AM - 12:00 PM">Morning (09:00 AM - 12:00 PM)</option>
                  <option value="12:00 PM - 03:00 PM">Afternoon (12:00 PM - 03:00 PM)</option>
                  <option value="03:00 PM - 06:00 PM">Evening (03:00 PM - 06:00 PM)</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Primary Scrap Category
                </label>
                <select
                  value={formData.wasteType}
                  onChange={(e) => setFormData({ ...formData, wasteType: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                >
                  <option value="Paper & Cardboard Scrap">Paper & Cardboard Scrap</option>
                  <option value="Plastic Bottles & Containers">Plastic Bottles & Containers</option>
                  <option value="E-Waste & Electronics">E-Waste & Electronics</option>
                  <option value="Scrap Metal & Iron">Scrap Metal & Iron</option>
                  <option value="Old Home Appliances">Old Home Appliances</option>
                  <option value="Mixed Recyclables">Mixed Recyclables</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Estimated Weight
                </label>
                <select
                  value={formData.estimatedWeight}
                  onChange={(e) => setFormData({ ...formData, estimatedWeight: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                >
                  <option value="Under 10 kg">Under 10 kg</option>
                  <option value="10 - 20 kg">10 - 20 kg</option>
                  <option value="20 - 50 kg">20 - 50 kg</option>
                  <option value="Over 50 kg">Over 50 kg (Bulk Industrial)</option>
                </select>
              </div>
            </div>

            <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 text-xs text-emerald-800 flex items-center justify-between">
              <span>Verified Local Recycler Dispatch:</span>
              <strong className="font-bold text-emerald-950">Cash payout upon weighing at doorstep</strong>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-md transition-colors inline-flex items-center gap-1.5"
              >
                <Truck size={16} /> Confirm Pickup Slot
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 size={36} />
            </div>

            <h3 className="text-2xl font-bold text-gray-900">Doorstep Pickup Scheduled!</h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
              Your scrap pickup request has been assigned to <strong>{center.name}</strong>. A collection agent will call your mobile before arriving.
            </p>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 max-w-md mx-auto text-left text-xs space-y-1.5">
              <p><span className="font-bold text-gray-500">Booking Tracking ID:</span> <strong className="text-emerald-800 font-mono text-sm">{bookingId}</strong></p>
              <p><span className="font-bold text-gray-500">Pickup Date:</span> {formData.date} ({formData.timeSlot})</p>
              <p><span className="font-bold text-gray-500">Address:</span> {formData.address}</p>
              <p><span className="font-bold text-gray-500">Waste Category:</span> {formData.wasteType} ({formData.estimatedWeight})</p>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
            >
              Done & Return to Map
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
