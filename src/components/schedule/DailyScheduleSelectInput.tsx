import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DateInfo } from '../../types/global';
import { semesterValueToLabel } from '../../types/filter/Semester';

type Props = {
  date: Date;
  dateInfo?: DateInfo;
  setDate: (date: Date) => void;
};

// 引数の日数分ずらしたDateを返す
const getShiftedDate = (date: Date, shift: number) => {
  const shiftedDate = new Date(date);
  shiftedDate.setDate(shiftedDate.getDate() + shift);
  return shiftedDate;
};

export const DailyScheduleSelectInput = ({ date, setDate, dateInfo }: Props) => {
  const weekdaysAll = ['日', '月', '火', '水', '木', '金', '土'];

  return (
    <Box sx={{ py: 2 }}>
      <Container>
        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
          <IconButton onClick={() => setDate(getShiftedDate(date, -1))}>
            <ArrowBackIosIcon />
          </IconButton>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              {date.getMonth() + 1}月{date.getDate()}日 {weekdaysAll[date.getDay()]}
            </Typography>
            <Box my={0.5}>
              <Typography>{dateInfo?.holiday}</Typography>
              <Typography>{dateInfo?.event}</Typography>
              {dateInfo && dateInfo.schoolWeekday && dateInfo.semester && dateInfo.count && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>{semesterValueToLabel(dateInfo.semester)}</Typography>
                  <Typography>{dateInfo.schoolWeekday}曜授業日</Typography>
                  <Typography>第 {dateInfo.count} 週</Typography>
                </Stack>
              )}
            </Box>
          </Box>
          <IconButton onClick={() => setDate(getShiftedDate(date, 1))}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Stack>
      </Container>
    </Box>
  );
};
