import { Box, Button, Card, CardContent, Grid, Typography, Alert } from '@mui/material';
import { useMemo } from 'react';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { FullClass } from '../../../types/global';
import ClassSchedule from './ClassSchedule';
import { TeacherList } from './TeacherList';

type Props = {
  fullData: FullClass;
};

/**
 * 講義の詳細データを表示用にlabel,valueのオブジェクト配列に整形する
 * @param fullData
 * @returns
 */
const getValueAndLabels = (fullData: FullClass) => {
  const basic = [
    { label: '開講学部', value: fullData.department },
    { label: '科目区分', value: fullData.category },
    { label: '科目分類', value: fullData.field },
    { label: '対象学年', value: `${fullData.grade}年生` },
    { label: '開講学期', value: fullData.semester },
    { label: '時間割', value: `${fullData.weekday} ${fullData.time}` },
    { label: '教室', value: fullData.room.replaceAll('　', '') },
    { label: '授業形態', value: fullData.type },
    { label: '単位', value: `${fullData.credit}単位` },
    { label: '履修コード', value: fullData.id },
    { label: 'データ取得日', value: new Date(fullData.timestamp).toLocaleString() }
  ];
  const details = [
    { label: '授業概要', value: fullData.details.outline },
    { label: '到達すべき目標', value: fullData.details.goals },
    { label: '成績評価の方法', value: fullData.details.grading },
    { label: '到達度評価の観点', value: fullData.details.evaluationPerspective },
    { label: '備考', value: fullData.details.note }
  ];
  return { basic, details };
};

export const ClassDetail = ({ fullData }: Props) => {
  const displayData = useMemo(() => getValueAndLabels(fullData), [fullData]);

  const TableRow = (props: { row: string[] }) => {
    return (
      <>
        <Grid item xs={4}>
          <Typography sx={{ color: 'gray' }}>{props.row[0]}</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>{props.row[1]}</Typography>
        </Grid>
      </>
    );
  };

  return (
    <>
      <Typography mt={2}>{fullData.year}年度</Typography>
      <Typography variant="h5">{fullData.title}</Typography>
      <Box mt={2}>
        <Alert severity="warning">
          最新・正確な情報は大学公式のシラバスを確認してください。情報の正確性は保証できかねます。
        </Alert>
      </Box>
      <Box mt={2}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              {displayData.basic.map((d, idx) => (
                <TableRow row={[d.label, d.value]} key={idx} />
              ))}
            </Grid>
          </CardContent>
        </Card>
        <Box mt={2} sx={{ bgcolor: 'white' }}>
          <Button endIcon={<OpenInNewOutlinedIcon />} fullWidth variant="outlined" href={fullData.url} target="_blank">
            大学公式シラバスを開く
          </Button>
        </Box>

        <TeacherList teachers={fullData.teachers.map((item) => ({ name: item }))} />

        <ClassSchedule fullClass={fullData} />

        {displayData.details.map((d, idx) => (
          <Box key={idx} mt={2}>
            <Card>
              <CardContent component="div">
                <Typography gutterBottom>{d.label}</Typography>
                {d.value.split('\n')}
              </CardContent>
            </Card>
          </Box>
        ))}

        <Box my={2}>
          <Typography gutterBottom>
            最新・正確な情報は必ず大学公式のシラバスで確認してください。本サービス内での情報の正確性は保証できかねます。
          </Typography>
          <Button endIcon={<OpenInNewOutlinedIcon />} fullWidth variant="contained" href={fullData.url} target="_blank">
            大学公式シラバスを開く
          </Button>
        </Box>
      </Box>
    </>
  );
};
