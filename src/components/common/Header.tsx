import { AppBar, Container, IconButton, Toolbar, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

type HeaderProps = {
  pageTitle: string;
  backButtonPath?: string | undefined;
};
export const Header = (props: HeaderProps) => {
  const headerHight = 50;

  const backButton = () => {
    if (props.backButtonPath) {
      return (
        <>
          <IconButton sx={{ position: { xs: 'absolute', md: 'static' } }} href={props.backButtonPath}>
            <ArrowBackIosNewIcon />
          </IconButton>
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ height: headerHight, background: '#fafafa', boxShadow: 'none' }}>
        <Container maxWidth="xl" sx={{ height: headerHight }}>
          <Toolbar
            disableGutters
            variant="dense"
            sx={{ height: headerHight, position: { xs: 'relative', md: 'static' } }}
          >
            {backButton()}
            <Typography
              variant="h5"
              noWrap
              sx={{ mr: 2, display: 'block', color: '#000', fontWeight: 'bold', margin: { xs: 'auto', md: 0 } }}
            >
              <img src="/image/logo_128.png" height={30} style={{ marginRight: 3 }} alt='レクマネのロゴ' />
              {props.pageTitle}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
