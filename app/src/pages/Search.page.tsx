import { Container, Paper, TextField } from '@mui/material';
import PageWrapper from '../components/general/BackgroundWrapper';
import { Header } from '../components/general/Header';
import MobileNavigation from '../components/general/Navigation';
import { useEffect } from 'react';
import { SearchQueryInput } from '../components/input/SearchQueryInput';
import { ClassList } from '../components/class/ClassList';
import { Key, StorageIO } from '../lib/storage';
import useClasses from '../hooks/useClasses';
import useClassSearchQuery from '../hooks/useClassSearchQuery';
import useQueryParams from '../hooks/useQueryParams';
import useGA4PageEvent from '../hooks/useGA4PageEvent';

const SearchPage = () => {
  useGA4PageEvent();
  const [query, setQuery] = useClassSearchQuery();
  const { debug } = useQueryParams<{ debug: string }>();

  const filteredClasses = useClasses(query);

  useEffect(() => {
    StorageIO.set(Key.SEARCH_QUERY, JSON.stringify(query));
  }, [query]);

  return (
    <PageWrapper>
      <Header pageTitle="講義検索" />
      <SearchQueryInput query={query} setQuery={setQuery} />
      {debug?.toLowerCase() === 'true' && (
        <Container maxWidth="xl">
          <Paper sx={{ p: 2, my: 2 }}>
            <TextField multiline fullWidth value={JSON.stringify(query, null, '\t')} />
          </Paper>
        </Container>
      )}
      <ClassList classes={filteredClasses} />
      <MobileNavigation page="classes" />
    </PageWrapper>
  );
};

export default SearchPage;
