import { Container } from '@mui/material';
import { ClassItemWithTextbooks } from '../components/class/common/ClassItemWithTextbooks';
import PageWrapper from '../components/general/BackgroundWrapper';
import { Header } from '../components/general/Header';
import MobileNavigation from '../components/general/Navigation';
import { SingleSelector } from '../components/input/common/SingleSelector';
import useClasses from '../hooks/useClasses';
import useClassSearchQuery from '../hooks/useClassSearchQuery';
import { semesters } from '../types/filter/Semester';
import { years } from '../types/filter/Year';

const TextbookPage = () => {
  const [query, setQuery] = useClassSearchQuery((q) => ({ ...q, isFavorite: true }));
  const classes = useClasses(query);
  return (
    <PageWrapper>
      <Header pageTitle="教科書リスト" showBackButton />
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
      <MobileNavigation />
    </PageWrapper>
  );
};

export default TextbookPage;
