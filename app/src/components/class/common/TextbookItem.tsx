import { Box, Button, Divider, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { Class, TextBook } from '../../../types/global';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from '@emotion/styled';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import { sendBookSearchEvent } from '../../../lib/analytics';
import { copyToClipboard } from '../../../lib/main';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

type Props = {
  textbook: TextBook;
  classItem: Class;
};

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} {...props} />)(
  ({ theme }) => ({})
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  padding: 0
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0
}));

const ECSites = [
  {
    name: '図書館蔵書検索',
    getUrl: (t: TextBook, c: Class) => `http://opac.lib.gifu-u.ac.jp/opc/xc/search/*?os[isbn]=${t.isbn}`
  },
  {
    name: 'Amazon',
    getUrl: (t: TextBook, c: Class) => `https://www.amazon.co.jp/s?k=${t.isbn}`
  },
  {
    name: 'メルカリ',
    getUrl: (t: TextBook, c: Class) => `https://jp.mercari.com/search?keyword=${t.title}`
  },
  {
    name: 'Google',
    getUrl: (t: TextBook, c: Class) => `https://www.google.co.jp/search?tbm=shop&q=${t.title}`
  }
];

export const TextbookItem = ({ textbook, classItem }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <Accordion sx={{ px: 1, borderRadius: '4px' }}>
        <AccordionSummary>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Stack sx={{ height: '100%' }}>
                <Box
                  component="img"
                  sx={{ height: '4rem', width: 'auto', margin: 'auto', borderRadius: 1, overflow: 'hidden' }}
                  src={textbook.imageUrl || '/image/no_image.png'}
                  alt={`${textbook.title}のカバー画像`}
                />
              </Stack>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body2">{textbook.title}</Typography>
              <Typography variant="body2">
                {textbook.publisher} / {textbook.author}
              </Typography>
              <Typography variant="body2">{textbook.isbn}</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails sx={{ my: 1 }}>
          <Grid container spacing={1}>
            {ECSites.map((ec) => (
              <Grid item xs={6} key={ec.name}>
                <Button
                  variant="outlined"
                  fullWidth
                  href={ec.getUrl(textbook, classItem)}
                  target="_blank"
                  color="secondary"
                  onClick={() => sendBookSearchEvent(textbook, ec.name)}
                  endIcon={<OpenInNewIcon />}
                >
                  {ec.name}
                </Button>
              </Grid>
            ))}
            {textbook.isbn && (
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => {
                    copyToClipboard(textbook.isbn);
                    setOpen(true);
                  }}
                  // color="secondary"
                  endIcon={<ContentCopyIcon />}
                >
                  ISBNをコピー
                </Button>
              </Grid>
            )}
            {!textbook.isbn && (
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => {
                    copyToClipboard(classItem.title);
                    setOpen(true);
                  }}
                  // color="secondary"
                  endIcon={<ContentCopyIcon />}
                >
                  書籍名をコピー
                </Button>
              </Grid>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} message="コピーしました" />
    </>
  );
};

export const TextbookItemSkelton = () => (
  <>
    <Divider />
    <Stack direction="row" sx={{ mt: 1, px: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Skeleton variant="rounded" width="100%" height={55} sx={{ mb: 1 }} />
        </Grid>
        <Grid item xs={10}>
          <Skeleton variant="rounded" width="100%" height={12} sx={{ mb: 1 }} />
          <Skeleton variant="rounded" width="50%" height={12} sx={{ mb: 1 }} />
          <Skeleton variant="rounded" width="50%" height={12} sx={{ mb: 1 }} />
        </Grid>
      </Grid>
    </Stack>
  </>
);
