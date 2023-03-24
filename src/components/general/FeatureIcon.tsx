import { Box, Paper, Stack, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { InAppLink } from './InAppLink';
import { ReactNode } from 'react';

type Props = {
  title: string;
  description?: string;
  to: string;
  icon: ReactNode;
};

export const FeatureCard = ({ title, description, to, icon }: Props) => {
  return (
    <InAppLink to={to}>
      <Paper sx={{ p: 2 }} variant="outlined">
        <Stack alignItems="center" justifyContent="space-between" direction="row">
          <Stack direction="row" spacing={2} alignItems="center">
            {icon}
            <Box>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="body2" color="gray">
                {description}
              </Typography>
            </Box>
          </Stack>
          <NavigateNextIcon />
        </Stack>
      </Paper>
    </InAppLink>
  );
};

type FeatureCardDisabledProps = {
  title: string;
  description?: string;
  icon: ReactNode;
  disabledReason?: string;
};

export const FeatureCardDisabled = ({ title, description, icon, disabledReason }: FeatureCardDisabledProps) => {
  return (
    <Paper sx={{ px: 2, py: 1, background: '#e0e0e0' }} variant="outlined">
      <Stack direction="row" spacing={2} alignItems="center">
        {icon}
        <Box>
          <Typography variant="h6" color="gray">
            {title}
          </Typography>
          <Typography variant="body2" color="gray">
            {description}
          </Typography>
          <Typography variant="body2">{disabledReason}</Typography>
        </Box>
      </Stack>
    </Paper>
  );
};
