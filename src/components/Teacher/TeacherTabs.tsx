import React from 'react';
import { ClipboardList, BarChart3, History, Bell } from 'lucide-react';
import { TabType } from '../../types';

interface TeacherTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TeacherTabs: React.FC<TeacherTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs: TabType[] = [
    { id: 'attendance', label: 'Attendance' },
    { id: 'reports', label: 'Reports' },
    { id: 'history', label: 'History' },
    { id: 'notifications', label: 'Notifications' },
  ];
  
  const getTabIcon = (id: string) => {
    switch (id) {
      case 'attendance':
        return <ClipboardList size={18} />;
      case 'reports':
        return <BarChart3 size={18} />;
      case 'history':
        return <History size={18} />;
      case 'notifications':
        return <Bell size={18} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              py-2 px-1 flex items-center gap-1.5 border-b-2 font-medium text-sm transition-colors
              ${activeTab === tab.id
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            {getTabIcon(tab.id)}
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TeacherTabs;