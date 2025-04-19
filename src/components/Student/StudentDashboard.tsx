import React, { useState } from 'react';
import USNSelector from './USNSelector';
import QRScanner from './QRScanner';
import AttendanceStatus from './AttendanceStatus';

const StudentDashboard: React.FC = () => {
  const [selectedUSN, setSelectedUSN] = useState<string | null>(null);
  const [scanEnabled, setScanEnabled] = useState<boolean>(false);
  const [attendanceMarked, setAttendanceMarked] = useState<boolean>(false);
  const [markedSubject, setMarkedSubject] = useState<string | null>(null);
  
  const handleUSNSelect = (usn: string) => {
    setSelectedUSN(usn);
    setScanEnabled(true);
    setAttendanceMarked(false);
    setMarkedSubject(null);
  };
  
  const handleAttendanceMarked = (subject: string) => {
    setAttendanceMarked(true);
    setMarkedSubject(subject);
    setScanEnabled(false);
  };
  
  const handleScanAgain = () => {
    setScanEnabled(true);
    setAttendanceMarked(false);
    setMarkedSubject(null);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-accent-800 mb-2">Student Dashboard</h2>
        <p className="text-gray-600">Mark your attendance by scanning QR code</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-md">
        <USNSelector 
          onSelectUSN={handleUSNSelect} 
          selectedUSN={selectedUSN} 
        />
        
        {selectedUSN && !attendanceMarked && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-accent-700 mb-4">Scan QR Code</h3>
            {scanEnabled && (
              <QRScanner 
                usn={selectedUSN} 
                onAttendanceMarked={handleAttendanceMarked} 
              />
            )}
          </div>
        )}
        
        {attendanceMarked && markedSubject && (
          <div className="mt-6">
            <AttendanceStatus 
              subject={markedSubject} 
              onScanAgain={handleScanAgain} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;