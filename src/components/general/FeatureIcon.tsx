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
      <Paper sx={{ p: 2 }}>
        <Stack alignItems="center" justifyContent="space-between" direction="row">
          <Stack direction="row" spacing={2}>
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
