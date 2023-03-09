import { Box, Paper, Stack, Typography } from '@mui/material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { InAppLink } from './InAppLink';
import { mainTheme } from '../../styles/theme';

type Props = {
  title: string;
  description?: string;
};

export const FeatureCard = ({ title, description }: Props) => {
  return (
    <InAppLink to="/textbook">
      <Paper sx={{ p: 2 }}>
        <Stack alignItems="center" justifyContent="space-between" direction="row">
          <Stack direction="row" spacing={2}>
            <ImportContactsIcon sx={{ fontSize: 40, color: mainTheme.palette.primary.main }} />
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
