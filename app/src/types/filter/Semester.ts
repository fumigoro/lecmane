export const SEMESTER: {
  SPRING: SemesterSpringAndFall;
  FALL: SemesterSpringAndFall;
  ALL: Semester;
} = {
  SPRING: '1',
  FALL: '2',
  ALL: '3'
};

export type Semester = '1' | '2' | '3';

export type SemesterSpringAndFall = Exclude<Semester, '3'>;

export const semestersSpringAndFall: {
  value: SemesterSpringAndFall;
  label: string;
}[] = [
  {
    value: '1',
    label: '前期'
  },
  {
    value: '2',
    label: '後期'
  }
];

export const semesters: {
  value: Semester;
  label: string;
}[] = [
  ...semestersSpringAndFall,
  {
    value: '3',
    label: '通年'
  }
];

/**
 * 曜日のValueを表示用テキストに変換する
 * @param value
 * @returns
 */
export const semesterValueToLabel = (value: Semester) => {
  const semester = semesters.find((semester) => semester.value === value);
  return semester ? semester.label : '';
};
