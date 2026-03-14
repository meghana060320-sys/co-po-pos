export type Role = 'student' | 'faculty' | 'lead' | 'hod' | 'admin' | null;

export interface User {
  id: string;
  name: string;
  role: Role;
  department: string;
  email: string;
  employeeId?: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  semester: string;
  studentsCount: number;
  coStatus: 'Pending' | 'Generated';
  marksStatus: 'Not Started' | 'In Progress' | 'Submitted' | 'Approved';
}

export interface CO {
  id: string;
  code: string;
  statement: string;
  btLevel: string;
  mappedPOs: string[];
  mappedPSOs: string[];
  attainment?: number;
  correlation?: Record<string, number>;
}

export interface PO {
  id: string;
  code: string;
  name: string;
  attainment: number;
  target: number;
}

export interface PSO {
  id: string;
  code: string;
  name: string;
  attainment: number;
  target: number;
}

export interface ExamConfig {
  id: string;
  code: 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'SEE';
  name: string;
  maxMarks: number;
  weightage: number;
  date: string;
  unitsCovered: string[];
  questionsCount: number;
}

export interface Question {
  id: string;
  number: string;
  part?: string;
  maxMarks: number;
  type: 'Compulsory' | 'Either-Or' | 'Optional';
  eitherOrPairId?: string;
  coMapped: string;
  btLevel: string;
  text?: string;
}

export interface StudentMarks {
  studentId: string;
  studentName: string;
  rollNumber: string;
  marks: Record<string, number>; // questionId -> marks
  total: number;
  isAbsent: boolean;
}

export interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  title: string;
  message: string;
  timestamp: string;
  link?: string;
  isRead: boolean;
}
