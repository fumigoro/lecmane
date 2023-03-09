import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Card,
  CardContent,
  IconButton,
  IconButtonProps,
  styled,
  CardActions,
  Typography,
  Grid,
  Chip,
  Avatar
} from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
type Props = {
  teachers: {
    name: string;
  }[];
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

export const TeacherList = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box pt={2}>
      <Card>
        <CardContent>
          <CardActions sx={{ p: 0 }}>
            <Grid container>
              <Grid item xs={3}>
                <Typography sx={{ color: 'gray' }}>担当教員</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography component="div">
                  {props.teachers[0].name}
                  {'　'}
                  {props.teachers.length > 1 ? <Chip label={`他${props.teachers.length - 1}名`} size="small" /> : <></>}
                </Typography>
              </Grid>
            </Grid>

            <ExpandMore expand={open} onClick={handleClick} aria-expanded={open} aria-label="show more">
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>

          <Collapse in={open} timeout="auto" unmountOnExit>
            {props.teachers.map((item, idx) => (
              <List component="div" sx={{ p: 0 }} key={idx}>
                <ListItemButton sx={{ p: 0.5, pl: 4 }}>
                  <ListItemIcon>
                    <Avatar sx={{ width: 30, height: 30 }}>
                      <SchoolOutlinedIcon />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </List>
            ))}
          </Collapse>
        </CardContent>
      </Card>
    </Box>
  );
};
