import { Subject, StudentAttendance } from './types';

export const SUBJECTS: Subject[] = ['FSD', 'ML', 'CC', 'SEC', 'WC'];

export const generateUSNList = (): string[] => {
  const usnList: string[] = [];
  for (let i = 1; i <= 64; i++) {
    const paddedNumber = i.toString().padStart(3, '0');
    usnList.push(`1VE22IS${paddedNumber}`);
  }
  return usnList;
};

export const USN_LIST = generateUSNList();

// This is a mock database for frontend only
export const attendanceRecords: StudentAttendance[] = [];