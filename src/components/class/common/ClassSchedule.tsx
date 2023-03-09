import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import Calendar from '../../../json/calendar2022.json';
import {
  Card,
  CardContent,
  Collapse,
  IconButton,
  IconButtonProps,
  styled,
  CardActions,
  FormControlLabel,
  FormGroup,
  Switch
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FullClass } from '../../../types/global';
import { useMemo, useState } from 'react';

type Props = {
  fullClass: FullClass;
};

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props; // eslint-disable-line no-unused-vars
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

const getDayString = (fullClass: FullClass, classCount: number) => {
  const dayInfo = Calendar.find(
    (item) =>
      item.class_count === classCount &&
      item.class_weekday === fullClass.weekday &&
      item.semester === fullClass.semester
  ); // eslint-disable-line camelcase
  if (!dayInfo) {
    return '';
  }
  const dayString = dayInfo.day;
  const day = new Date(dayString);
  // 暦上の曜日
  const weekday = ['日', '月', '火', '水', '木', '金', '土'][day.getDay()];
  // 学年暦上の曜日
  const schoolWeekday = dayInfo.class_weekday.replaceAll('曜日', ''); // eslint-disable-line camelcase
  return `${day.getMonth() + 1}/${day.getDate()}(${weekday}) (${schoolWeekday}曜授業日) `;
};

const getNowWeekCount = (fullClass: FullClass) => {
  for (let classCount = 0; classCount < 16; classCount++) {
    const dayInfo = Calendar.find(
      (item) =>
        item.class_count === classCount &&
        item.class_weekday === fullClass.weekday &&
        item.semester === fullClass.semester
    ); // eslint-disable-line camelcase
    if (!dayInfo) {
      return 0;
    }
    const dayString = dayInfo.day;
    const day = new Date(dayString);
    const today = new Date(`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`);
    if (day >= today) {
      return classCount;
    }
  }
  return 15;
};

export default function ClassSchedule(props: Props) {
  const [open, setOpen] = useState(true);
  const [listView, setListView] = useState(true);
  const schedule = props.fullClass.details.schedule;
  const activeStep = useMemo(() => getNowWeekCount(props.fullClass), [props.fullClass]);
  const scheduleComment = props.fullClass.details.scheduleComment;
  const scheduleOrigin = props.fullClass.details.scheduleOrigin;

  const handleClick = () => {
    setOpen(!open);
  };

  // 講義日程のパース成功
  if (schedule != null && scheduleComment != null) {
    const lessons = schedule.map((item, idx) => {
      const classData = props.fullClass;
      return {
        label: getDayString(classData, idx),
        description: item
      };
    });

    return (
      <Box mt={2}>
        <Card>
          <CardContent>
            <CardActions sx={{ p: 0 }}>
              <Typography>授業計画</Typography>
              <ExpandMore expand={open} onClick={handleClick} aria-expanded={open} aria-label="show more">
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>

            <Collapse in={open} timeout="auto" unmountOnExit>
              {listView ? (
                <>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={listView}
                          onChange={(e) => {
                            setListView(e.target.checked);
                          }}
                        />
                      }
                      label="リスト表示"
                      labelPlacement="start"
                    />
                  </FormGroup>
                  <Typography variant="body2" gutterBottom>
                    シラバス掲載の授業計画をレクマネのシステムが自動的に16回分の計画へ分割したものです。誤りがある可能性があります。
                  </Typography>
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {lessons.map((step, index) => (
                      <Step key={index}>
                        <StepLabel sx={{ p: 0 }} optional={<Typography variant="body2">{step.description}</Typography>}>
                          {step.label}
                        </StepLabel>
                        <StepContent>{/* <Typography>{step.description}</Typography> */}</StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </>
              ) : (
                <>
                  <FormGroup sx={{ display: lessons[0].description !== '' ? '' : 'none' }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={listView}
                          onChange={(e) => {
                            setListView(e.target.checked);
                          }}
                        />
                      }
                      label="リスト表示"
                      labelPlacement="start"
                    />
                  </FormGroup>
                  {scheduleOrigin.split('\n').map((text, idx) => (
                    <Typography key={idx}>{text}</Typography>
                  ))}
                </>
              )}
              {scheduleComment.split('\n').map((text, idx) => (
                <Typography key={idx}>{text}</Typography>
              ))}
            </Collapse>
          </CardContent>
        </Card>
      </Box>
    );
  } else {
    return (
      <Box mt={2}>
        <Card>
          <CardContent>
            <CardActions sx={{ p: 0 }}>
              <Typography>授業計画</Typography>
              <ExpandMore expand={open} onClick={handleClick} aria-expanded={open} aria-label="show more">
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {scheduleOrigin.split('\n').map((text, idx) => (
                <Typography key={idx}>{text}</Typography>
              ))}
            </Collapse>
          </CardContent>
        </Card>
      </Box>
    );
  }
}
