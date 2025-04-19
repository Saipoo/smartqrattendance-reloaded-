export type RoleType = 'teacher' | 'student';

export type Subject = 'FSD' | 'ML' | 'CC' | 'SEC' | 'WC';

export interface StudentAttendance {
  usn: string;
  subject: Subject;
  timestamp: string;
}

export interface QRData {
  subject: Subject;
  timestamp: number;
  id: string;
}

export interface TabType {
  id: string;
  label: string;
}