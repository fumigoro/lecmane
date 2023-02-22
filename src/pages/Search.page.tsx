import { Container, Paper, TextField } from '@mui/material';
import PageWrapper from '../components/general/BackgroundWrapper';
import { Header } from '../components/general/Header';
import Navigation from '../components/general/Navigation';
import { useState } from 'react';
import { SearchQueryInput } from '../components/input/SearchQueryInput';
import { ClassSearchQuery } from '../types/ClassSearchQuery';

const SearchPage = () => {
  const [query, setQuery] = useState<ClassSearchQuery>({});

  return (
    <PageWrapper>
      <Header pageTitle="講義検索" />
      <SearchQueryInput query={query} setQuery={setQuery} />
      <Container maxWidth="xl">
        <Paper sx={{ p: 2, my: 2 }}>
          <TextField multiline fullWidth value={JSON.stringify(query, null, '\t')} />
        </Paper>
      </Container>
      <Navigation page={1} />
    </PageWrapper>
  );
};

export default SearchPage;
