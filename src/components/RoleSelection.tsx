import React from 'react';
import { School, UserCog } from 'lucide-react';
import { RoleType } from '../types';

interface RoleSelectionProps {
  onRoleSelect: (role: RoleType) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onRoleSelect }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-primary-800 mb-4">Welcome to Smart Attendance</h2>
        <p className="text-gray-600">
          Select your role to continue to the attendance system
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <button
          onClick={() => onRoleSelect('teacher')}
          className="flex flex-col items-center bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary-300"
        >
          <div className="bg-primary-100 p-4 rounded-full mb-4">
            <UserCog size={48} className="text-primary-600" />
          </div>
          <h3 className="text-2xl font-bold text-primary-800 mb-2">Teacher</h3>
          <p className="text-gray-600 text-center">
            Generate QR codes for attendance and view student records
          </p>
        </button>
        
        <button
          onClick={() => onRoleSelect('student')}
          className="flex flex-col items-center bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-accent-300"
        >
          <div className="bg-accent-100 p-4 rounded-full mb-4">
            <School size={48} className="text-accent-600" />
          </div>
          <h3 className="text-2xl font-bold text-accent-800 mb-2">Student</h3>
          <p className="text-gray-600 text-center">
            Scan QR codes to mark your attendance in classes
          </p>
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;