import { Box, Button, Divider, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { TextBook } from '../../../types/global';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from '@emotion/styled';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

type Props = {
  textbook: TextBook;
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
    getUrl: (t: TextBook) => `http://opac.lib.gifu-u.ac.jp/opc/xc/search/*?os[isbn]=${t.isbn}`
  },
  {
    name: 'Amazon',
    getUrl: (t: TextBook) => `https://www.amazon.co.jp/s?k=${t.isbn}`
  },
  {
    name: 'メルカリ',
    getUrl: (t: TextBook) => `https://jp.mercari.com/search?keyword=${t.title}`
  },
  {
    name: 'Google',
    getUrl: (t: TextBook) => `https://www.google.co.jp/search?tbm=shop&q=${t.title}`
  }
];

export const TextbookItem = ({ textbook }: Props) => {
  return (
    <Accordion>
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
      <AccordionDetails>
        <Grid container spacing={1}>
          {ECSites.map((ec) => (
            <Grid item xs={6} key={ec.name}>
              <Button variant="outlined" fullWidth href={ec.getUrl(textbook)} target="_blank" color="secondary">
                {ec.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export const TextbookItemSkelton = () => (
  <>
    <Divider />
    <Stack direction="row" sx={{ mt: 1 }}>
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
