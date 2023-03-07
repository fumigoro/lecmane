import { Box, Divider, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { TextBook } from '../../../types/global';

type Props = {
  textbook: TextBook;
};

export const TextbookItem = ({ textbook }: Props) => {
  return (
    <>
      <Divider />
      <Stack direction="row" sx={{ mt: 1 }}>
        <Grid container>
          <Grid item xs={2}>
            <Stack>
              <Box
                component="img"
                sx={{ height: '3rem', width: 'auto', margin: 'auto', borderRadius: 1 }}
                src={textbook.imageUrl || '/image/no_image.png'}
                alt={`${textbook.title}のカバー画像`}
              />
            </Stack>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body2">{textbook.title}</Typography>
            <Typography variant="body2" noWrap>
              {textbook.publisher} / {textbook.author}
            </Typography>
            <Typography variant="body2">{textbook.isbn}</Typography>
          </Grid>
        </Grid>
      </Stack>
    </>
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
