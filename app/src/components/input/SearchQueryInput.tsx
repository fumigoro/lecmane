import { Box, Container, Stack, TextField } from '@mui/material';
import { useEffect } from 'react';
import { ClassSearchQuery } from '../../types/ClassSearchQuery';
import { Flags } from '../../types/filter/Flag';
import { grades } from '../../types/filter/Grade';
import { semesters } from '../../types/filter/Semester';
import { times } from '../../types/filter/Time';
import { weekdaysFull } from '../../types/filter/Weekday';
import { years } from '../../types/filter/Year';
import { CategorySelector } from './common/CategorySelector';
import { FlagCheckbox } from './common/FlagCheckbox';
import { OrganizationSelector } from './common/OrganizationSelector';
import { SingleSelector } from './common/SingleSelector';

type Props = {
  query: ClassSearchQuery;
  setQuery: (q: ClassSearchQuery) => void;
};

export const SearchQueryInput = ({ query, setQuery }: Props) => {
  // 学部変更時にカテゴリー条件をリセット
  useEffect(() => {
    const flags = Flags.filter((f) => f.target === query.faculty).map((f) => f.id);
    setQuery({ ...query, category: undefined, flags });
    // eslint-disable-next-line
  }, [query.faculty]);

  return (
    <Box sx={{ my: 2 }}>
      <Container maxWidth="xl">
        <SingleSelector
          options={years}
          selectedValue={query.year}
          onChange={(v) => setQuery({ ...query, year: v })}
          type="dropdown"
          label="年度"
        />
        <OrganizationSelector selectedOrgId={query} onChange={(v) => setQuery({ ...query, ...v })} />
        <CategorySelector query={query} onChange={(v) => setQuery({ ...query, category: v })} />
        <FlagCheckbox
          query={query}
          onChange={(v) => {
            setQuery({ ...query, flags: v });
          }}
        />
        <Stack gap={1}>
          <SingleSelector
            options={grades}
            selectedValue={query.grade}
            onChange={(v) => setQuery({ ...query, grade: v })}
            noneOptionLabel="全て"
            type="button"
            label="学年"
          />
          <SingleSelector
            options={semesters}
            selectedValue={query.semester}
            onChange={(v) => setQuery({ ...query, semester: v })}
            noneOptionLabel="全て"
            type="button"
            label="開講時期"
          />
          <SingleSelector
            options={weekdaysFull}
            selectedValue={query.weekday}
            onChange={(v) => setQuery({ ...query, weekday: v })}
            noneOptionLabel="全て"
            type="button"
            label="曜日"
          />
          <SingleSelector
            options={times}
            selectedValue={query.time}
            onChange={(v) => setQuery({ ...query, time: v })}
            noneOptionLabel="全て"
            type="button"
            label="時限"
          />
          <SingleSelector
            options={[{ value: true, label: '登録済み' }]}
            selectedValue={query.isFavorite}
            onChange={(v) => setQuery({ ...query, isFavorite: v })}
            noneOptionLabel="全て"
            type="button"
            label="お気に入り登録"
          />
          <TextField
            fullWidth
            label="キーワード"
            variant="outlined"
            sx={{ my: 1 }}
            value={query.keyWord}
            onChange={(e) => setQuery({ ...query, keyWord: e.target.value })}
          />
        </Stack>
      </Container>
    </Box>
  );
};
