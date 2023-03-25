import { useMemo } from 'react';
import { ClassSearchQuery } from '../../../types/ClassSearchQuery';
import { Categories } from '../../../types/filter/Category';
import { SingleSelector } from './SingleSelector';

type Props = {
  query: ClassSearchQuery;
  onChange: (c: string | undefined) => void;
};
export const CategorySelector = ({ query, onChange }: Props) => {
  const categoryOptions = useMemo(() => {
    return Categories.flatMap((c) => {
      if (c.target === query.faculty) {
        return [
          {
            label: c.displayText,
            value: c.id
          }
        ];
      }
      return [];
    });
  }, [query.faculty]);
  return (
    <>
      {categoryOptions.length > 0 && (
        <SingleSelector
          options={categoryOptions}
          selectedValue={query.category}
          onChange={(v) => onChange(v)}
          type="dropdown"
          label="分類"
          noneOptionLabel="全て"
        />
      )}
    </>
  );
};
