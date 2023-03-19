import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

type QueryParams = { [key: string]: string };

const useQueryParams = <T extends QueryParams>() => {
  const [searchParams] = useSearchParams();
  return useMemo(() => {
    const result: QueryParams = {};
    for (const [key, value] of Array.from(searchParams.entries())) {
      result[key] = value;
    }
    return result as Partial<T>;
  }, [searchParams]);
};

export default useQueryParams;
