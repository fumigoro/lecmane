import { Alert, Box, Stack, Typography } from '@mui/material';
import useCalender from '../../hooks/useCalender';
import { FullScreenMessage } from '../general/FullScreenMessage';
import useTimetable from '../../hooks/useTimetable';
import { DailyScheduleCell } from './DailyScheduleCell';
import { times } from '../../types/filter/Time';
import { semesterValueToLabel } from '../../types/filter/Semester';
import { DateInfo } from '../../types/global';
import { weekdays } from '../../types/filter/Weekday';

type DateInfoProps = {
  date: Date;
  dateInfo?: DateInfo;
};
const DateInfoDisplay = ({ date, dateInfo }: DateInfoProps) => {
  const weekdaysAll = ['日', '月', '火', '水', '木', '金', '土'];
  return (
    <Box my={1}>
      <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
        {date.getMonth() + 1}月{date.getDate()}日 {weekdaysAll[date.getDay()]}
      </Typography>
      <Typography>{dateInfo?.event}</Typography>
      <Typography>{dateInfo?.holiday}</Typography>
    </Box>
  );
};

type Props = {
  date: Date;
};

export const OneDaySchedule = ({ date }: Props) => {
  const dateInfo = useCalender(date);
  const timetable = useTimetable();
  if (!dateInfo) {
    return (
      <>
        <FullScreenMessage progress label="読み込み中" />
      </>
    );
  }
  if (dateInfo === 'holiday') {
    return (
      <Box my={2}>
        <DateInfoDisplay date={date} />
        <Typography my={4}>講義はありません</Typography>
      </Box>
    );
  }
  if (dateInfo === 'nodata') {
    return (
      <Box my={2}>
        <DateInfoDisplay date={date} />
        <Alert severity="error">{date.toLocaleDateString()}の学年暦データが見つかりませんでした</Alert>
      </Box>
    );
  }
  if (!dateInfo.semester || !dateInfo.schoolWeekday) {
    return (
      <Box my={2}>
        <DateInfoDisplay date={date} dateInfo={dateInfo} />
        <Typography my={4}>講義はありません</Typography>
      </Box>
    );
  }

  const weekdayIndex = weekdays.findIndex((w) => dateInfo.schoolWeekday === w.value);
  const todayTimetable = timetable.map((times) => times[weekdayIndex]);
  return (
    <Box my={2}>
      <DateInfoDisplay date={date} dateInfo={dateInfo} />
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>{semesterValueToLabel(dateInfo.semester)}</Typography>
        <Typography>{dateInfo.schoolWeekday}曜授業日</Typography>
        <Typography>第 {dateInfo.count} 週</Typography>
      </Stack>
      {todayTimetable.map((classes, index) =>
        classes.length > 0 ? (
          <DailyScheduleCell classes={classes} time={times[index].value} key={index} />
        ) : (
          <div key={index}></div>
        )
      )}
    </Box>
  );
};
