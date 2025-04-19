import React from 'react';
import { CheckCircle, RefreshCw } from 'lucide-react';

interface AttendanceStatusProps {
  subject: string;
  onScanAgain: () => void;
}

const AttendanceStatus: React.FC<AttendanceStatusProps> = ({ subject, onScanAgain }) => {
  return (
    <div className="text-center">
      <div className="flex flex-col items-center p-4 bg-success-50 border border-success-200 rounded-lg">
        <CheckCircle size={48} className="text-success-500 mb-2" />
        <h4 className="text-lg font-medium text-success-700 mb-1">Attendance Marked</h4>
        <p className="text-sm text-success-600 mb-3">
          Your attendance for <span className="font-semibold">{subject}</span> has been recorded
        </p>
        
        <div className="flex items-center text-xs text-gray-500">
          <span className="inline-block bg-white px-2 py-1 rounded-full text-success-700 font-medium">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
      
      <button
        onClick={onScanAgain}
        className="mt-6 w-full flex items-center justify-center gap-2 bg-accent-600 hover:bg-accent-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
      >
        <RefreshCw size={18} />
        Scan Another QR Code
      </button>
    </div>
  );
};

export default AttendanceStatus;