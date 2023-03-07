import { Year } from './filter/Year';

export type Faculty = {
  name: string;
  id: string;
  departments: Department[];
};
export type Department = {
  name: string;
  id: string;
  courses: Course[];
};
export type Course = {
  name: string;
  id: string;
};
export type Class = {
  takeYear: number;
  id: string;
  customId: string;
  year: Year;
  title: string;
  url: string;
  semester: string;
  weekday: string;
  time: string;
  teachers: string[];
  grade: number;
  department: string;
  category: string;
  field: string;
  room: string;
  type: string;
  credit: number;
};
export type FullClass = Class & {
  timestamp: string;
  details: {
    outline: string;
    goals: string;
    schedule: string[] | null;
    scheduleComment: string | null;
    scheduleOrigin: string;
    grading: string;
    evaluationPerspective: string;
    textbook: TextBook[];
    textComment: string;
    note: string;
  };
};
export type FlagFilterState = {
  id: string;
  target: string;
  state: boolean;
};
export type AllClasses = {
  id: string;
  data: Class[];
};
export type ClassList = {
  year: Number;
  classes: ClassDetails[];
};
export type ClassDetails = {
  hasDetails: boolean;
  id: string;
  customId: string;
  year: Year;
  title: string;
  englishTitle: string;
  teachers: string[];
  department: string;
  category: string;
  field: string;
  grade: number;
  semester: string;
  weekday: string;
  time: string;
  room: string;
  type: string;
  credit: number;
  url: string;
  timestamp: string;
  details: {
    outline: string;
    goals: string;
    schedule: string[] | null;
    scheduleComment: string | null;
    scheduleOrigin: string;
    grading: string;
    evaluationPerspective: string;
    textbook: TextBook[];
    textComment: string;
    note: string;
  };
};
export type TextBook = {
  title: string;
  author: string;
  publisher: string;
  publishYear: string;
  isbn: string;
  imageUrl: string;
  coopId: string;
  source: string;
};
export type SelectedClass = {
  id: string;
  takeYear: number;
};
export type FilterState = {
  flags: FlagFilterState[];
  facultyId: string;
  departmentId: string;
  courseId: string;
  categoryId: string;
  grade: string;
  semester: string;
  weekday: string;
  time: string;
  keyword: string;
};
export type NewsContent = {
  date: string;
  title: string;
  body: string;
};
export type Favorite = {
  classId: string;
  year: Year;
};
