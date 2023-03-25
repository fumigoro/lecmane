import { Typography } from '@mui/material';
import useDateInfo from '../../../hooks/useDateInfo';
import { FullClass } from '../../../types/global';

type Props = {
  fullClass: FullClass;
  classCount: number;
};

/**
 * x月y日(曜日) (学年暦上の曜日曜授業日) を表示する
 * @param param0
 * @returns
 */
export const ClassDateInfo = ({ fullClass, classCount }: Props) => {
  const dateInfo = useDateInfo({ fullClass, classCount });
  if (typeof dateInfo !== 'object') {
    return <></>;
  }
  const { schoolWeekday, date } = dateInfo;
  // 暦上の曜日
  const weekday = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];

  return (
    <Typography variant="body2">
      {date.getMonth() + 1}/{date.getDate()} {weekday} ({schoolWeekday}曜授業日){' '}
    </Typography>
  );
};
