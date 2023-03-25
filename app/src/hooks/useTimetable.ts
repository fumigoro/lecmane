import { useEffect, useState } from 'react';
import { classApi } from '../classes.api';
import { getSchoolYear, getSemester } from '../lib/main';
import { Semester } from '../types/filter/Semester';
import { Year } from '../types/filter/Year';
import { Class } from '../types/global';

const useTimetable = (year: Year = getSchoolYear(new Date()), semester: Semester = getSemester(new Date())) => {
  const [timetable, setTimetable] = useState<Class[][][]>([]);

  useEffect(() => {
    classApi.getTimetable(year, semester).then((tt) => {
      setTimetable(tt);
    });
  }, [year, semester]);

  return timetable;
};

export default useTimetable;
