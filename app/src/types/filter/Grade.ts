export type Grade = 1 | 2 | 3 | 4 | 5 | 6;

export const grades: {
  value: Grade;
  label: string;
}[] = [
  {
    value: 1,
    label: '1年'
  },
  {
    value: 2,
    label: '2年'
  },
  {
    value: 3,
    label: '3年'
  },
  {
    value: 4,
    label: '4年'
  },
  {
    value: 5,
    label: '5年'
  },
  {
    value: 6,
    label: '6年'
  }
];
