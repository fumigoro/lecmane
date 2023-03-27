import { Box, Container, Typography } from '@mui/material';
import { useMemo } from 'react';
import { ClassList } from '../components/class/ClassList';
import PageWrapper from '../components/general/BackgroundWrapper';
import { Header } from '../components/general/Header';
import MobileNavigation from '../components/general/Navigation';
import useClasses from '../hooks/useClasses';
import useGA4PageEvent from '../hooks/useGA4PageEvent';
import { ClassSearchQuery } from '../types/ClassSearchQuery';
import { Year, years } from '../types/filter/Year';

const FavoritePage = () => {
  useGA4PageEvent();
  return (
    <PageWrapper>
      <Header pageTitle="お気に入り" showBackButton />
      <Container maxWidth="xl">
        {years.map((y) => (
          <FavoriteList year={y.value} title={y.label} key={y.value} />
        ))}
      </Container>
      <MobileNavigation />
    </PageWrapper>
  );
};

export default FavoritePage;

type Props = {
  year: Year;
  title: string;
};

const FavoriteList = ({ year, title }: Props) => {
  const query = useMemo(
    () =>
      ({
        flags: [],
        isFavorite: true,
        year
      } as ClassSearchQuery),
    [year]
  );

  const filteredClasses = useClasses(query);

  return (
    <Box mb={2}>
      <Typography variant="h5">{title}</Typography>
      <ClassList classes={filteredClasses} />
    </Box>
  );
};
