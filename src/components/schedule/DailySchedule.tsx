import { Alert, Container } from '@mui/material';
import useCalender from '../../hooks/useCalender';
import { FullScreenMessage } from '../general/FullScreenMessage';
import useTimetable from '../../hooks/useTimetable';
import { DailyScheduleCell } from './DailyScheduleCell';
import { times } from '../../types/filter/Time';
import { weekdays } from '../../types/filter/Weekday';
import useQueryParams from '../../hooks/useQueryParams';
import { useState } from 'react';
import { DailyScheduleSelectInput } from './DailyScheduleSelectInput';
import { getSchoolYear, getSemester } from '../../lib/main';

export const DailySchedule = () => {
  // クエリパラメータから日付を取得
  const { date: dateString } = useQueryParams<{ date: string }>();

  const [date, setDate] = useState<Date>(dateString ? new Date(dateString) : new Date());
  const dateInfo = useCalender(date);
  const timetable = useTimetable(getSchoolYear(date), getSemester(date));

  if (!dateInfo) {
    return (
      <>
        <FullScreenMessage progress label="読み込み中" />
      </>
    );
  }
  if (dateInfo === 'holiday') {
    return (
      <>
        <DailyScheduleSelectInput date={date} setDate={setDate} />
        <FullScreenMessage height={120} label="講義はありません" />
      </>
    );
  }
  if (dateInfo === 'nodata') {
    return (
      <>
        <DailyScheduleSelectInput date={date} setDate={setDate} />
        <Container sx={{ my: 2 }}>
          <Alert severity="error">{date.toLocaleDateString()}の学年暦データが見つかりませんでした</Alert>
        </Container>
      </>
    );
  }
  if (!dateInfo.semester || !dateInfo.schoolWeekday) {
    return (
      <>
        <DailyScheduleSelectInput date={date} setDate={setDate} dateInfo={dateInfo} />
        <FullScreenMessage height={120} label="講義はありません" />
      </>
    );
  }

  const weekdayIndex = weekdays.findIndex((w) => dateInfo.schoolWeekday === w.value);
  const todayTimetable = timetable.map((times) => times[weekdayIndex]);
  return (
    <>
      <DailyScheduleSelectInput date={date} setDate={setDate} dateInfo={dateInfo} />
      <Container sx={{ my: 2 }}>
        {todayTimetable.map((classes, index) =>
          classes.length > 0 ? (
            <DailyScheduleCell classes={classes} time={times[index].value} key={index} />
          ) : (
            <div key={index}></div>
          )
        )}
      </Container>
    </>
  );
};
