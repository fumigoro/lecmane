import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { classApi } from '../classes.api';
import { ClassItemWithTextbooks } from '../components/class/common/ClassItemWithTextbooks';
import PageWrapper from '../components/general/BackgroundWrapper';
import { Header } from '../components/general/Header';
import Navigation from '../components/general/Navigation';
import { SingleSelector } from '../components/input/common/SingleSelector';
import { ClassSearchQuery } from '../types/ClassSearchQuery';
import { queryDefault } from '../types/filter/QueryDefault';
import { semesters } from '../types/filter/Semester';
import { years } from '../types/filter/Year';
import { Class } from '../types/global';

const TextbookPage = () => {
  const [query, setQuery] = useState<ClassSearchQuery>({ ...queryDefault, isFavorite: true });
  const [classes, setClasses] = useState<Class[]>([]);
  useEffect(() => {
    classApi.getClasses(query).then((classes) => {
      setClasses(classes);
    });
  }, [query]);
  return (
    <PageWrapper>
      <Header pageTitle="教科書リスト" />
      <Container>
        <SingleSelector
          options={years}
          selectedValue={query.year}
          onChange={(v) => setQuery({ ...query, year: v })}
          type="dropdown"
          label="年度"
        />
        <SingleSelector
          options={semesters}
          selectedValue={query.semester}
          onChange={(v) => setQuery({ ...query, semester: v })}
          noneOptionLabel="全て"
          type="button"
          label="開講時期"
        />
        {classes.map((c, index) => (
          <ClassItemWithTextbooks classItem={c} key={index} />
        ))}
      </Container>
      <Navigation page={-1} />
    </PageWrapper>
  );
};

export default TextbookPage;