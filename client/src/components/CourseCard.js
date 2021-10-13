import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { joinClass, leaveClass } from '../api/coursesApi';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CourseCard({ card }) {
  const classes = useStyles();
  const [userEnrolled, setUserEnrolled] = useState(card.userEnrolled);
  const [studentsEnrolled, setStudentsEnrolled] = useState(
    card.students.length
  );
  const showActionButton =
    card.tutor._id !== JSON.parse(localStorage.getItem('user'))._id;

  const handleJoinClass = async requestId => {
    await joinClass(
      { token: JSON.parse(localStorage.getItem('token')) },
      requestId
    );

    setUserEnrolled(true);
    setStudentsEnrolled(studentsEnrolled + 1);
  };

  const handleLeaveClass = async requestId => {
    await leaveClass(
      { token: JSON.parse(localStorage.getItem('token')) },
      requestId
    );

    setUserEnrolled(false);
    setStudentsEnrolled(studentsEnrolled - 1);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {card.subject}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {card.tutor.name}
        </Typography>
        <Typography variant="body2" component="p">
          {card.description}
        </Typography>
        <Typography variant="h6">
          Students enrolled: {studentsEnrolled}
        </Typography>
      </CardContent>
      <CardActions>
        {showActionButton && userEnrolled && (
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => handleLeaveClass(card._id)}
          >
            Quit
          </Button>
        )}
        {showActionButton && !userEnrolled && (
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => handleJoinClass(card._id)}
          >
            Join
          </Button>
        )}
        <Button component={Link} to={`/course/${card._id}`} variant="contained">
          See details
        </Button>
      </CardActions>
    </Card>
  );
}
