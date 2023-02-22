export type Weekday = '月' | '火' | '水' | '木' | '金' | '集中';

export const weekdays: {
  value: Weekday;
  label: string;
}[] = [
  {
    value: '月',
    label: '月'
  },
  {
    value: '火',
    label: '火'
  },
  {
    value: '水',
    label: '水'
  },
  {
    value: '木',
    label: '木'
  },
  {
    value: '金',
    label: '金'
  },
  {
    value: '集中',
    label: '集中'
  }
];
