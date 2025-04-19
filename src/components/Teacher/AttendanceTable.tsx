import React, { useEffect, useState } from 'react';
import { User, Clock } from 'lucide-react';
import { Subject, StudentAttendance } from '../../types';

interface AttendanceTableProps {
  selectedSubject: Subject | null;
}

const formatTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

const AttendanceTable: React.FC<AttendanceTableProps> = ({ selectedSubject }) => {
  const [attendanceRecords, setAttendanceRecords] = useState<StudentAttendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const url = new URL(`${import.meta.env.VITE_API_URL}/api/attendance`);
        if (selectedSubject) {
          url.searchParams.append('subject', selectedSubject);
        }

        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error('Failed to fetch attendance records');
        }

        const data = await response.json();
        setAttendanceRecords(data);
        setError(null);
      } catch (err) {
        setError('Failed to load attendance records');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [selectedSubject]);

  if (loading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading attendance records...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-error-50 rounded-lg border border-error-200">
        <p className="text-error-700">{error}</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-primary-700">
          {selectedSubject ? `${selectedSubject} Attendance` : 'All Attendance Records'}
        </h3>
        <span className="text-sm text-gray-500">
          {attendanceRecords.length} Records
        </span>
      </div>
      
      {attendanceRecords.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  USN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceRecords.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{record.usn}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                      {record.subject}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock size={16} className="text-gray-400 mr-2" />
                      {formatTime(record.timestamp)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-gray-400 mb-2">
            <User size={48} className="mx-auto" />
          </div>
          <h4 className="text-gray-700 font-medium mb-1">No Attendance Records</h4>
          <p className="text-gray-500 text-sm">
            {selectedSubject
              ? `No students have marked their attendance for ${selectedSubject} yet`
              : 'Select a subject and have students scan the QR code to mark attendance'}
          </p>
        </div>
      )}
    </div>
  );
};

export default AttendanceTable;