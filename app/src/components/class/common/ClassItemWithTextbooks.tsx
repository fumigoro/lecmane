import { Box, Typography, Stack, Paper, Button } from '@mui/material';
import { Class, FullClass } from '../../../types/global';
import NumbersIcon from '@mui/icons-material/Numbers';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SchoolIcon from '@mui/icons-material/School';
import { useEffect, useState } from 'react';
import { ClassOpeMenu } from './ClassOpeMenu';
import { classApi } from '../../../classes.api';
import { TextbookItem, TextbookItemSkelton } from './TextbookItem';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { getCategoryColor, hanNumber2zenNumber } from '../../../lib/main';

const getCoopSearchUrl = (c: Class) => {
  let keyword = c.title.replace(/[（(《≪].+[）)》≫]/g, '');
  keyword = keyword.replace(/VI/g, ' ６');
  keyword = keyword.replace(/V/g, ' ５');
  keyword = keyword.replace(/IV/g, ' ４');
  keyword = keyword.replace(/III/g, ' ３');
  keyword = keyword.replace(/II/g, ' ２');
  keyword = keyword.replace(/I/g, ' １');
  keyword = hanNumber2zenNumber(keyword);
  const language = c.title.match(/\(.+語\)/g)?.[0].replace(/[()]/g, '');
  if (language) {
    keyword = `${keyword} ${language}`;
  }
  if (keyword.match(/\s/g)) {
    return `https://kyoukasho.univ.coop/gucoop/html/products/list?ex_free=${keyword}&ex17=${c.department[0]}`;
  }
  return `https://kyoukasho.univ.coop/gucoop/html/products/list?&ex20=${keyword}&ex17=${c.department[0]}`;
};

type Props = {
  classItem: Class;
};

/**
 * 教科書リストページ用、教科書リストが表示されるタイプの講義情報コンポーネント
 * @param param0
 * @returns
 */
export const ClassItemWithTextbooks = ({ classItem }: Props) => {
  const [open, setOpen] = useState(false);

  const [fullData, setFullData] = useState<undefined | FullClass>(undefined);
  useEffect(() => {
    classApi.getSyllabus(classItem.year, classItem.id).then((fc) => {
      if (fc) {
        setFullData(fc);
      }
    });
  }, [classItem]);

  const color = getCategoryColor(classItem.department);

  return (
    <Paper sx={{ my: 1, background: color[50], p: 0.5 }} variant="outlined">
      <Box sx={{ p: 0.5, cursor: 'pointer' }} onClick={(e) => setOpen(true)}>
        <Box sx={{ width: '100%' }}>
          <Typography gutterBottom fontWeight="bold" sx={{ color: color['A700'] }}>
            {classItem.title}
          </Typography>
          <Stack direction="row" alignItems={'center'} spacing={1} sx={{ my: 1 }}>
            <Stack direction="row" spacing={0.3}>
              <CalendarTodayIcon sx={{ color: 'gray', fontSize: 16 }} />
              <Typography variant="body2">
                {classItem.grade}年 {classItem.semester.replace('学', '')}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.3}>
              <AccessTimeFilledIcon sx={{ color: 'gray', fontSize: 16 }} />
              <Typography variant="body2">
                {classItem.weekday.replace('日', '')} {classItem.time.replace('時', '')}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.3}>
              <SchoolIcon sx={{ color: 'gray', fontSize: 16 }} />
              <Typography variant="body2">
                {classItem.teachers[0]}
                {classItem.teachers.length > 2 && ' ほか'}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.3}>
              <NumbersIcon sx={{ color: 'gray', fontSize: 16 }} />
              <Typography variant="body2" color="gray">
                {classItem.id}
              </Typography>
            </Stack>
          </Stack>
          {fullData && fullData.details.textComment && (
            <Stack direction="row" spacing={0.3} mb={0.5}>
              <AnnouncementIcon sx={{ fontSize: 16, color: 'gray' }} />
              <Typography variant="body2">{fullData.details.textComment}</Typography>
            </Stack>
          )}
        </Box>
      </Box>
      {fullData &&
        fullData.details.textbook.map((t, index) => <TextbookItem textbook={t} classItem={classItem} key={index} />)}
      {!fullData && <TextbookItemSkelton />}
      {fullData && fullData.details.textbook.length > 0 && (
        <Box my={1}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ background: color[500] }}
            href={getCoopSearchUrl(classItem)}
            target="_blank"
          >
            この講義を生協教科書サイトで検索
          </Button>
        </Box>
      )}
      <ClassOpeMenu classItem={classItem} open={open} setOpen={setOpen} />
    </Paper>
  );
};
