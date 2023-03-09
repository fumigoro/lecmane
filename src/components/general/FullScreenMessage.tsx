import { CircularProgress, Stack, Typography } from '@mui/material';
type Props = {
  label?: string;
  progress?: boolean;
  children?: JSX.Element | JSX.Element[];
};

export const FullScreenMessage = ({ label, progress, children }: Props) => (
  <Stack justifyContent="center" alignItems="center" sx={{ height: '80vh' }}>
    {progress && <CircularProgress />}
    <Typography my={4}>{label}</Typography>
    <Stack sx={{ width: '100%', textAlign: 'center' }}>{children}</Stack>
  </Stack>
);
