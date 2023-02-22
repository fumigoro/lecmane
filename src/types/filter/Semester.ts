export const SEMESTER = {
  SPRING: '1',
  FALL: '2',
  ALL: '3'
};

export type Semester = '1' | '2' | '3';

export const semesters: {
  value: Semester;
  label: string;
}[] = [
  {
    value: '1',
    label: '前期'
  },
  {
    value: '2',
    label: '後期'
  },
  {
    value: '3',
    label: '通年'
  }
];
