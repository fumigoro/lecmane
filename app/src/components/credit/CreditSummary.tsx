import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Container,
  Divider,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { getCreditsTotal } from '../../lib/credit';
import { Class, CreditTotal } from '../../types/global';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { lightBlue, green, orange, blueGrey, red, brown } from '@mui/material/colors';
import { primaryColor } from '../../styles/theme';
import { ClassOpeMenu } from '../class/common/ClassOpeMenu';
import { getCategoryColor } from '../../lib/main';

const getCreditSum = (classes: Class[]) => {
  return classes.reduce((acc, c) => acc + c.credit, 0);
};

export const CreditSummary = () => {
  const [total, setTotal] = useState<CreditTotal | undefined>(undefined);
  useEffect(() => {
    getCreditsTotal().then((t) => {
      setTotal(t);
    });
  }, []);

  const totalCredit = useMemo(() => {
    if (!total) return 0;
    const classes = Object.values(total)
      .map((faculties) => Object.values(faculties).flat())
      .flat();
    return getCreditSum(classes);
  }, [total]);

  const numOfClasses = useMemo(() => {
    if (!total) return 0;
    const classes = Object.values(total)
      .map((faculties) => Object.values(faculties).flat())
      .flat();
    return classes.length;
  }, [total]);

  return (
    <Container>
      <Paper variant="outlined">
        <Stack p={2} direction="row" justifyContent="space-between">
          <Typography variant="h6">合計単位数</Typography>
          <Typography>{totalCredit}単位</Typography>
        </Stack>
        <Stack p={2} direction="row" justifyContent="space-between">
          <Typography variant="h6">合計講義数</Typography>
          <Typography>{numOfClasses}講義</Typography>
        </Stack>
      </Paper>
      {total &&
        Object.entries(total).map(([key, faculties]) => {
          const classes = Object.values(faculties).flat();
          const creditSum = getCreditSum(classes);
          const numOfClasses = classes.length;
          const color = getCategoryColor(key);
          return (
            <Box key={key} sx={{ background: color[50], borderRadius: 4, py: 2, px: 1, my: 2 }}>
              <Typography variant="h5" pl={1} mb={1} sx={{ color: color['A700'] }}>
                {key}
              </Typography>
              <Typography pl={1} mb={1}>
                {creditSum}単位 {numOfClasses}個の講義
              </Typography>
              {Object.entries(faculties).map(([key, classes]) => {
                const creditSum = getCreditSum(classes);
                const numOfClasses = classes.length;
                return (
                  <Accordion key={key} variant="outlined">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Stack>
                        <Typography sx={{ color: color['A700'] }} variant="h6">
                          {key}{' '}
                        </Typography>
                        <Typography color="gray">
                          {creditSum}単位 {numOfClasses}個の講義
                        </Typography>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                      {classes
                        .sort((a, b) => (a.grade < b.grade ? -1 : 1))
                        .map((c) => (
                          <CreditSummaryRow class={c} key={c.id} />
                        ))}
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Box>
          );
        })}
    </Container>
  );
};

const CreditSummaryRow = ({ class: c }: { class: Class }) => {
  const tone = '400';
  const colors = [lightBlue, green, orange, red, brown, blueGrey].map((c) => c[tone]);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Divider />
      <Stack direction="row" spacing={1} alignItems="center" onClick={() => setOpen(true)}>
        <Typography variant="body2" my={1} flexGrow={1}>
          {c.title} / {c.year}年度
        </Typography>
        <Typography
          sx={{
            background: colors[c.grade - 1],
            borderRadius: '10px',
            px: 1,
            color: 'white',
            minWidth: 24
          }}
          align="center"
          variant="body2"
        >
          {c.grade}年
        </Typography>
        <Typography
          sx={{
            background: c.credit === 2 ? blueGrey[400] : primaryColor[500],
            borderRadius: '10px',
            px: 1,
            color: 'white',
            minWidth: 36
          }}
          align="center"
          variant="body2"
        >
          {c.credit}単位
        </Typography>
      </Stack>
      {/* 単位数0の場合の警告表示。シラバスに単位数が未記入の場合、0が自動でセットされる。 */}
      {c.credit === 0 && (
        <Alert sx={{ py: 0 }} severity="warning">
          シラバスに単位数が記入されていなかった可能性があります。正しい単位数は最新のシラバスや便覧を確認してください。
        </Alert>
      )}
      <ClassOpeMenu classItem={c} open={open} setOpen={setOpen} />
    </>
  );
};
