import React, { useState } from 'react';
import { ConnectbookLogo } from './components/ConnectbookLogo';
import RoleSelection from './components/RoleSelection';
import TeacherDashboard from './components/Teacher/TeacherDashboard';
import StudentDashboard from './components/Student/StudentDashboard';
import { RoleType } from './types';

function App() {
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
  
  const handleRoleSelect = (role: RoleType) => {
    setSelectedRole(role);
  };
  
  const handleBackToRoles = () => {
    setSelectedRole(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
      <header className="bg-white shadow-md py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ConnectbookLogo className="h-8 w-8 text-primary-600" />
            <h1 className="text-xl font-bold text-primary-800">
              Smart Attendance
              <span className="text-xs text-accent-600 ml-2">by Connectbook</span>
            </h1>
          </div>
          
          {selectedRole && (
            <button 
              onClick={handleBackToRoles}
              className="text-sm text-primary-600 hover:text-primary-800 flex items-center gap-1 transition-colors"
            >
              Change Role
            </button>
          )}
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {!selectedRole ? (
          <RoleSelection onRoleSelect={handleRoleSelect} />
        ) : selectedRole === 'teacher' ? (
          <TeacherDashboard />
        ) : (
          <StudentDashboard />
        )}
      </main>
      
      <footer className="bg-white py-4 border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Smart Attendance by Connectbook. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;