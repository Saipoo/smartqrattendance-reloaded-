import React from 'react';
import { SUBJECTS } from '../../data';
import { Subject } from '../../types';

interface SubjectSelectorProps {
  selectedSubject: Subject | null;
  onSelectSubject: (subject: Subject) => void;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ selectedSubject, onSelectSubject }) => {
  return (
    <div className="w-full">
      <label htmlFor="subject-select" className="block text-sm font-medium text-gray-700 mb-2">
        Select a Subject
      </label>
      <select
        id="subject-select"
        value={selectedSubject || ''}
        onChange={(e) => onSelectSubject(e.target.value as Subject)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-white"
      >
        <option value="" disabled>Select a subject</option>
        {SUBJECTS.map((subject) => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </select>
      
      {selectedSubject && (
        <div className="mt-4 p-3 bg-primary-50 border border-primary-100 rounded-lg">
          <p className="text-sm text-primary-700">
            <span className="font-medium">Selected Subject:</span> {selectedSubject}
          </p>
        </div>
      )}
    </div>
  );
};

export default SubjectSelector;