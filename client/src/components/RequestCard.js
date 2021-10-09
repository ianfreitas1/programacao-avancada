import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { joinClass } from '../api/requestsApi';

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

const handleJoinClass = async () => {
  const response = await joinClass(
    { token: JSON.parse(localStorage.getItem('token')) },
    { students }
  );
};

export default function RequestCard({ card }) {
  const classes = useStyles();

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
      </CardContent>
      <CardActions>
        <Button size="small"
           onClick={handleJoinClass}
        >
          Join
        </Button>
      </CardActions>
    </Card>
  );
}
