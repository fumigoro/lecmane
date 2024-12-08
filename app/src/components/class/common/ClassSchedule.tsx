import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';

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
import { ClassDateInfo } from './ClassDateInfo';

type Props = {
  fullClass: FullClass;
};

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

export default function ClassSchedule(props: Props) {
  const [open, setOpen] = useState(true);
  const [listView, setListView] = useState(true);
  const schedule = props.fullClass.details.schedule;
  const activeStep = useMemo(() => schedule?.length || 0, [schedule]);
  const scheduleComment = props.fullClass.details.scheduleComment;
  const scheduleOrigin = props.fullClass.details.scheduleOrigin;

  const handleClick = () => {
    setOpen(!open);
  };

  // 講義日程のパース成功
  if (schedule != null && scheduleComment != null) {
    return (
      <Box mt={2}>
        <Card variant="outlined">
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
                    {schedule.map((title, index) => (
                      <Step key={index}>
                        <StepLabel sx={{ p: 0 }}>
                          <Box>
                            <ClassDateInfo fullClass={props.fullClass} classCount={index + 1} />
                            <Typography>{title}</Typography>
                          </Box>
                        </StepLabel>
                        <StepContent></StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </>
              ) : (
                <>
                  <FormGroup sx={{ display: schedule[0] !== '' ? '' : 'none' }}>
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
        <Card variant="outlined">
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
