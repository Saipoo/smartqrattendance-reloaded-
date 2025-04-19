import React, { useState } from 'react';
import SubjectSelector from './SubjectSelector';
import QRCodeGenerator from './QRCodeGenerator';
import AttendanceTable from './AttendanceTable';
import TeacherTabs from './TeacherTabs';
import { Subject } from '../../types';

const TeacherDashboard: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [activeTab, setActiveTab] = useState<string>('attendance');

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary-800 mb-2">Teacher Dashboard</h2>
        <p className="text-gray-600">Manage attendance for your classes</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium text-primary-700 mb-4">Choose a Subject</h3>
          <SubjectSelector onSelectSubject={setSelectedSubject} selectedSubject={selectedSubject} />
          
          {selectedSubject && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-primary-700 mb-4">QR Code</h3>
              <QRCodeGenerator subject={selectedSubject} />
            </div>
          )}
        </div>
        
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <TeacherTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {activeTab === 'attendance' && (
            <div className="mt-6">
              <AttendanceTable selectedSubject={selectedSubject} />
            </div>
          )}
          
          {activeTab === 'reports' && (
            <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h4 className="font-medium text-primary-700">Attendance Reports</h4>
              <p className="text-gray-500 mt-2">
                Detailed attendance reports will be shown here
              </p>
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h4 className="font-medium text-primary-700">Attendance History</h4>
              <p className="text-gray-500 mt-2">
                Past attendance records will be shown here
              </p>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h4 className="font-medium text-primary-700">Notifications</h4>
              <p className="text-gray-500 mt-2">
                You have no new notifications
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;