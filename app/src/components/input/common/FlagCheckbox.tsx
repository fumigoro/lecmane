import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { ClassSearchQuery } from '../../../types/ClassSearchQuery';
import { Flags } from '../../../types/filter/Flag';

type Props = {
  query: ClassSearchQuery;
  onChange: (flags: string[]) => void;
};

export const FlagCheckbox = ({ query, onChange }: Props) => {
  const flags = useMemo(() => Flags.filter((f) => f.target === query.faculty), [query.faculty]);

  useEffect(() => {
    onChange([...flags.filter((f) => f.default).map((f) => f.id)]);
    // eslint-disable-next-line
  }, [flags]);

  return (
    <>
      {flags.map((flag) => (
        <FormGroup key={flag.id}>
          <FormControlLabel
            control={
              <Checkbox
                checked={query.flags.indexOf(flag.id) !== -1}
                sx={{ py: 0.5 }}
                onChange={(e) => {
                  if (e.target.checked) {
                    onChange([...query.flags, flag.id]);
                  } else {
                    const flagsNew = [...query.flags];
                    // console.log(flagsNew)
                    const targetIndex = flagsNew.indexOf(flag.id);
                    if (targetIndex === -1) {
                      throw new Error('該当するフラグが見つからない');
                    }
                    flagsNew.splice(targetIndex, 1);
                    onChange(flagsNew);
                  }
                }}
              />
            }
            label={flag.label}
          />
        </FormGroup>
      ))}
    </>
  );
};
