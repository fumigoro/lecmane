import { AppBar, Container, IconButton, Toolbar, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';

import { InAppLink } from './InAppLink';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  pageTitle: string;
  showBackButton?: boolean;
};

export const Header = ({ pageTitle, showBackButton }: HeaderProps) => {
  const navigate = useNavigate();

  const headerHight = 50;

  return (
    <>
      <AppBar position="static" sx={{ height: headerHight, background: 'white', boxShadow: 'none' }}>
        <Container maxWidth="xl" sx={{ height: headerHight }}>
          <Toolbar disableGutters variant="dense" sx={{ height: headerHight, justifyContent: 'space-between' }}>
            {showBackButton && (
              <IconButton onClick={() => navigate(-1)}>
                <ArrowBackIcon />
              </IconButton>
            )}
            {!showBackButton && (
              <InAppLink to="/">
                <img src="/image/logo_128.png" height={30} alt="レクマネのロゴ" />
              </InAppLink>
            )}
            <Typography variant={pageTitle.length > 14 ? 'h6' : 'h4'} noWrap color="black">
              {pageTitle}
            </Typography>
            <InAppLink to="/setting">
              <IconButton>
                <SettingsIcon />
              </IconButton>
            </InAppLink>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
