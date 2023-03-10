import {
  Box,
  InputLabel,
  ButtonGroup,
  Button,
  SxProps,
  FormControl,
  MenuItem,
  Select,
  Grid,
  Typography,
  Paper,
  Stack
} from '@mui/material';
import { ReactNode, useMemo } from 'react';

const noneOptionId = 'none_option';

type Props<T> = {
  options: {
    value: T;
    label: string;
    icon?: ReactNode;
  }[];
  selectedValue: T | undefined;
  onChange: (newValue: T | undefined) => void;
  type: 'button' | 'dropdown' | 'card';
  // 選択しない、全て　のような例外選択肢のラベル。指定しなければ例外選択肢は設けられない。
  noneOptionLabel?: string;
  label?: string;
  disabled?: boolean;
  sx?: SxProps;
};

/**
 * 選択肢入力コンポーネント
 * @param props
 * @returns
 */
export const SingleSelector = <T,>(props: Props<T>) => {
  const options = useMemo(() => {
    return props.options.map((o, idx) => ({ ...o, id: String(idx) }));
  }, [props.options]);

  const selectedId = useMemo(() => {
    const selectedId = options.find((o) => o.value === props.selectedValue)?.id;
    if (selectedId) {
      return selectedId;
    }
    return noneOptionId;
  }, [props.selectedValue, options]);

  switch (props.type) {
    case 'button':
      return (
        <Box sx={props.sx}>
          {/* スマホ用ラベル */}
          {props.label && (
            <InputLabel sx={{ display: { xs: 'block', md: 'none' }, color: '#000', m: 'auto', mr: 1, ml: 0 }}>
              {props.label}
            </InputLabel>
          )}
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            sx={{ marginBottom: 1 }}
            disabled={props.disabled}
          >
            {/* PC用ラベル */}
            {props.label && (
              <InputLabel sx={{ display: { xs: 'none', md: 'inline' }, color: '#000', m: 'auto', mx: 1 }}>
                {props.label}
              </InputLabel>
            )}
            {/* 選択しない、全て　のような例外選択肢。props.onChangeに対しundefinedを返す */}
            {props.noneOptionLabel && (
              <Button
                onClick={() => props.onChange(undefined)}
                variant={selectedId === noneOptionId ? 'contained' : 'outlined'}
              >
                {props.noneOptionLabel}
              </Button>
            )}
            {/* 選択肢 */}
            {options.map((option) => (
              <Button
                key={option.id}
                onClick={() => props.onChange(option.value)}
                variant={selectedId === option.id ? 'contained' : 'outlined'}
              >
                {option.label}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      );
    case 'dropdown':
      return (
        <FormControl
          sx={{
            my: 1,
            minWidth: 200,
            width: { xs: '100%', md: '' }
          }}
        >
          <InputLabel id={`${props.label}-label`}>{props.label}</InputLabel>
          <Select
            labelId={`${props.label}-label`}
            id={props.label}
            value={selectedId}
            label={props.label}
            onChange={(e) => props.onChange(options.find((o) => o.id === e.target.value)?.value)}
            disabled={props.disabled}
            fullWidth
          >
            {/* 選択しない、全て　のような例外選択肢。props.onChangeに対しundefinedを返す */}
            {props.noneOptionLabel && <MenuItem value={noneOptionId}>{props.noneOptionLabel}</MenuItem>}
            {/* 選択肢 */}
            {options.map((option) => {
              return (
                <MenuItem value={option.id} key={option.id}>
                  {option.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      );
    case 'card':
      return (
        <Box sx={props.sx}>
          <Typography variant="h6" gutterBottom my={2}>
            {props.label}
          </Typography>
          <Grid container spacing={1}>
            {options.map((option, idx) => (
              <Grid item xs={6} md={3} key={idx}>
                <Button fullWidth sx={{ p: 0 }} onClick={() => props.onChange(option.value)} disabled={props.disabled}>
                  <Paper
                    sx={{
                      height: '100%',
                      width: '100%',
                      p: 2,
                      border: option.value === props.selectedValue ? '3px solid orange' : ''
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      {option.icon}
                      <Typography align="center" variant="h6">
                        {option.label}
                      </Typography>
                    </Stack>
                  </Paper>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    default:
      return <></>;
  }
};
