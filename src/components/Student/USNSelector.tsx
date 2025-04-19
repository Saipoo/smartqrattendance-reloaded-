import React from 'react';
import { USN_LIST } from '../../data';

interface USNSelectorProps {
  selectedUSN: string | null;
  onSelectUSN: (usn: string) => void;
}

const USNSelector: React.FC<USNSelectorProps> = ({ selectedUSN, onSelectUSN }) => {
  return (
    <div className="w-full">
      <label htmlFor="usn-select" className="block text-sm font-medium text-gray-700 mb-2">
        Select your USN
      </label>
      <select
        id="usn-select"
        value={selectedUSN || ''}
        onChange={(e) => onSelectUSN(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-accent-500 focus:border-accent-500 bg-white"
      >
        <option value="" disabled>Select your USN</option>
        {USN_LIST.map((usn) => (
          <option key={usn} value={usn}>
            {usn}
          </option>
        ))}
      </select>
      
      {selectedUSN && (
        <div className="mt-4 p-3 bg-accent-50 border border-accent-100 rounded-lg">
          <p className="text-sm text-accent-700">
            <span className="font-medium">Selected USN:</span> {selectedUSN}
          </p>
        </div>
      )}
    </div>
  );
};

export default USNSelector;