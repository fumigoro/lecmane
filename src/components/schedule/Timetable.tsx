import { Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { classApi } from '../../classes.api';
import { Semester } from '../../types/filter/Semester';
import { times } from '../../types/filter/Time';
import { weekdays } from '../../types/filter/Weekday';
import { Year } from '../../types/filter/Year';
import { Class } from '../../types/global';
import { TimetableCell, TimetableCellBase } from './TimetableCell';

type Props = {
  year: Year;
  semester: Semester;
};

export const Timetable = ({ year, semester }: Props) => {
  const [timetable, setTimetable] = useState<Class[][][]>([]);
  useEffect(() => {
    classApi.getTimetable(year, semester).then((tt) => {
      setTimetable(tt);
      console.log(tt);
    });
  }, [year, semester]);

  return (
    <Container>
      <Grid container spacing={0.5}>
        {[
          // 表の右上のセル
          <Grid item xs={1} key="root">
            <TimetableCellBase>
              <Typography align="center"></Typography>
            </TimetableCellBase>
          </Grid>,
          // 表の1行目、曜日表示セル
          weekdays.map((w) => (
            <Grid item xs={2.2} key={w.value}>
              <TimetableCellBase>
                <Typography align="center">{w.value}</Typography>
              </TimetableCellBase>
            </Grid>
          )),
          ...timetable.flatMap((time, tIndex) => [
            // 表の1列目、時限表示セル
            <Grid item xs={1} key={`${tIndex}-header`}>
              <TimetableCellBase>
                <Typography align="center">{times[tIndex].label}</Typography>
              </TimetableCellBase>
            </Grid>,
            ...time.flatMap((weekday, wIndex) => (
              // 通常セル
              <Grid item xs={2.2} key={`${tIndex}-${wIndex}`}>
                <TimetableCell classes={weekday} />
              </Grid>
            ))
          ])
        ]}
      </Grid>
    </Container>
  );
};
