import { Container, Paper, TextField } from '@mui/material';
import PageWrapper from '../components/general/BackgroundWrapper';
import { Header } from '../components/general/Header';
import Navigation from '../components/general/Navigation';
import { useEffect, useState } from 'react';
import { SearchQueryInput } from '../components/input/SearchQueryInput';
import { ClassSearchQuery } from '../types/ClassSearchQuery';
import { classApi } from '../classes.api';
import { ClassList } from '../components/class/ClassList';
import { Key, StorageIO } from '../lib/storage';
import { Class } from '../types/global';
import { queryDefault } from '../types/filter/QueryDefault';

const SearchPage = () => {
  const [query, setQuery] = useState<ClassSearchQuery>(
    JSON.parse(StorageIO.get(Key.SEARCH_QUERY) || JSON.stringify(queryDefault))
  );
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);
  useEffect(() => {
    classApi.getClasses(query).then((classes) => {
      setFilteredClasses(classes);
    });
  }, [query]);

  useEffect(() => {
    StorageIO.set(Key.SEARCH_QUERY, JSON.stringify(query));
  }, [query]);

  return (
    <PageWrapper>
      <Header pageTitle="講義検索" />
      <SearchQueryInput query={query} setQuery={setQuery} />
      <Container maxWidth="xl">
        <Paper sx={{ p: 2, my: 2 }}>
          <TextField multiline fullWidth value={JSON.stringify(query, null, '\t')} />
        </Paper>
      </Container>
      <ClassList classes={filteredClasses} />
      <Navigation page={1} />
    </PageWrapper>
  );
};

export default SearchPage;
