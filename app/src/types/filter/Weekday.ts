export type Weekday = '月' | '火' | '水' | '木' | '金' | '集中';

// 集中講義を除いたWeekday
export type WeekdayExcludeConcentrated = Exclude<Weekday, '集中'>;

export const weekdays: {
  value: WeekdayExcludeConcentrated;
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
  }
];

export const weekdaysFull: {
  value: Weekday;
  label: string;
}[] = [
  ...weekdays,
  {
    value: '集中',
    label: '集中'
  }
];
