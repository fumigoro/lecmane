import { Container, Grid, Typography } from '@mui/material';
import useTimetable from '../../hooks/useTimetable';
import { Semester } from '../../types/filter/Semester';
import { times } from '../../types/filter/Time';
import { weekdays } from '../../types/filter/Weekday';
import { Year } from '../../types/filter/Year';
import { TimetableCell, TimetableCellBase } from './TimetableCell';

type Props = {
  year: Year;
  semester: Semester;
};

export const Timetable = ({ year, semester }: Props) => {
  const timetable = useTimetable(year, semester);

  return (
    <Container>
      <Grid container spacing={0.5}>
        {[
          // 表の右上のセル
          <Grid item xs={0.6} key="root">
            <TimetableCellBase>
              <Typography align="center"></Typography>
            </TimetableCellBase>
          </Grid>,
          // 表の1行目、曜日表示セル
          weekdays.map((w) => (
            <Grid item xs={2.28} key={w.value}>
              <TimetableCellBase>
                <Typography align="center">{w.value}</Typography>
              </TimetableCellBase>
            </Grid>
          )),
          ...timetable.flatMap((time, tIndex) => [
            // 表の1列目、時限表示セル
            <Grid item xs={0.6} key={`${tIndex}-header`}>
              <TimetableCellBase>
                <Typography align="center" variant="body2">
                  {times[tIndex].label}
                </Typography>
              </TimetableCellBase>
            </Grid>,
            ...time.flatMap((weekday, wIndex) => (
              // 通常セル
              <Grid item xs={2.28} key={`${tIndex}-${wIndex}`}>
                <TimetableCell classes={weekday} key={`${tIndex}-${wIndex}`} />
              </Grid>
            ))
          ])
        ]}
      </Grid>
    </Container>
  );
};
