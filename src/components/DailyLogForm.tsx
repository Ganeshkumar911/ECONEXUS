import React, { useState } from 'react';

interface DailyLogFormProps {
  onSubmit: (data: { recyclable: number; compostable: number; hazardous: number; landfill: number; itemDescription: string }) => void;
}

const DailyLogForm: React.FC<DailyLogFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    recyclable: 0,
    compostable: 0,
    hazardous: 0,
    landfill: 0,
    itemDescription: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'itemDescription' ? value : parseFloat(value) || 0
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form after submission
    setFormData({
      recyclable: 0,
      compostable: 0,
      hazardous: 0,
      landfill: 0,
      itemDescription: ''
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Log Today's Waste</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="recyclable" className="block text-sm font-medium text-gray-700">
              Recyclable (kg)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              id="recyclable"
              name="recyclable"
              value={formData.recyclable}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          
          <div>
            <label htmlFor="compostable" className="block text-sm font-medium text-gray-700">
              Compostable (kg)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              id="compostable"
              name="compostable"
              value={formData.compostable}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
            />
          </div>
          
          <div>
            <label htmlFor="hazardous" className="block text-sm font-medium text-gray-700">
              Hazardous (kg)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              id="hazardous"
              name="hazardous"
              value={formData.hazardous}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
            />
          </div>
          
          <div>
            <label htmlFor="landfill" className="block text-sm font-medium text-gray-700">
              Landfill (kg)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              id="landfill"
              name="landfill"
              value={formData.landfill}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-500 focus:ring-opacity-50"
            />
          </div>
        </div>

        <div>
          <label htmlFor="itemDescription" className="block text-sm font-medium text-gray-700">
            What did you log?
          </label>
          <textarea
            id="itemDescription"
            name="itemDescription"
            value={formData.itemDescription}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
            placeholder="e.g. plastic bottles, food scraps, batteries"
          />
        </div>
        
        <button
          type="submit"
          className="mt-6 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
        >
          Log Today's Waste
        </button>
      </form>
    </div>
  );
};

export default DailyLogForm;