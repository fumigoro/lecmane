import { Container } from '@mui/material';
import { useState } from 'react';
import PageWrapper from '../components/general/BackgroundWrapper';
import { Header } from '../components/general/Header';
import MobileNavigation from '../components/general/Navigation';
import { SingleSelector } from '../components/input/common/SingleSelector';
import { Timetable } from '../components/schedule/Timetable';
import { SEMESTER, semesters } from '../types/filter/Semester';
import { years } from '../types/filter/Year';

const SchedulePage = () => {
  const [year, setYear] = useState(years[0].value);
  const [semester, setSemester] = useState(SEMESTER.SPRING);

  return (
    <PageWrapper>
      <Header pageTitle="時間割" />
      <Container maxWidth="xl">
        <SingleSelector
          options={years}
          selectedValue={year}
          onChange={(v) => v && setYear(v)}
          type="dropdown"
          label="年度"
        />
        <SingleSelector
          options={semesters}
          selectedValue={semester}
          onChange={(v) => v && setSemester(v)}
          type="button"
          label=""
        />
      </Container>
      <Timetable year={year} semester={semester} />
      <MobileNavigation page="schedule" />
    </PageWrapper>
  );
};

export default SchedulePage;
