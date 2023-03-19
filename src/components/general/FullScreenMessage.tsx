import { CircularProgress, Stack, Typography } from '@mui/material';
type Props = {
  label?: string;
  progress?: boolean;
  children?: JSX.Element | JSX.Element[];
  height?: number;
};

export const FullScreenMessage = ({ label, progress, children, height }: Props) => (
  <Stack justifyContent="center" alignItems="center" sx={{ height: height || '80vh' }}>
    {progress && <CircularProgress />}
    <Typography my={4}>{label}</Typography>
    <Stack sx={{ width: '100%', textAlign: 'center' }}>{children}</Stack>
  </Stack>
);
