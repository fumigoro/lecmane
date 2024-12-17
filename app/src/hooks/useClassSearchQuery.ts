import { useMemo, useState } from 'react';
import { Key, StorageIO } from '../lib/storage';
import { ClassSearchQuery } from '../types/ClassSearchQuery';
import { years } from '../types/filter/Year';

const queryDefault: ClassSearchQuery = {
  year: years[0].value,
  flags: []
};

const useClassSearchQuery = (getInitQuery?: (q: ClassSearchQuery) => ClassSearchQuery) => {
  const cashedQueryString = useMemo(() => StorageIO.get(Key.SEARCH_QUERY), []);
  const initialQuery = useMemo(() => {
    if (getInitQuery) {
      return getInitQuery(queryDefault);
    }
    if (cashedQueryString) {
      return JSON.parse(cashedQueryString) as ClassSearchQuery;
    }
    return queryDefault;
  }, [cashedQueryString, getInitQuery]);
  const queryState = useState<ClassSearchQuery>(initialQuery);
  return queryState;
};

export default useClassSearchQuery;
