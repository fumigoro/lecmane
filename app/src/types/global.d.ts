import { Semester } from './filter/Semester';
import { Weekday } from './filter/Weekday';
import { Year } from './filter/Year';

export type Class = {
  id: string;
  customId: string;
  year: Year;
  title: string;
  // url: string;
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

export type Favorite = {
  classId: string;
  year: Year;
};

export type RoomSearchMethod = 'room' | 'time';

export type DateInfo = {
  date: Date;
  semester: Semester | undefined;
  schoolWeekday: Weekday | undefined;
  count: number | undefined;
  event: string | undefined;
  holiday: string | undefined;
};

export type Calender = {
  [key: string]: DateInfo;
};

export type CreditTotal = {
  [faculty: string]: { [category: string]: Class[] };
};
