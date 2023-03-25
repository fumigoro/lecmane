export const SEMESTER: {
  SPRING: Semester;
  FALL: Semester;
  ALL: Semester;
} = {
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

/**
 * 曜日のValueを表示用テキストに変換する
 * @param value
 * @returns
 */
export const semesterValueToLabel = (value: Semester) => {
  const semester = semesters.find((semester) => semester.value === value);
  return semester ? semester.label : '';
};
