import React, { useEffect, useState } from 'react';

import {
  Grid,
  Typography,
  Button,
  makeStyles,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CourseCard from '../components/CourseCard';
import { createCourse, readCourses } from '../api/coursesApi';
import Header from '../components/Header';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    marginTop: '40px',
    marginLeft: '200px',
  },
}));

const DashboardPage = () => {
  const classes = useStyles();

  const [cards, setCards] = useState([]);
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    async function fetchCoursesApi() {
      const response = await readCourses({
        token: JSON.parse(localStorage.getItem('token')),
      });
      setCards(response);
    }
    fetchCoursesApi();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateRequest = async () => {
    const response = await createCourse(
      { token: JSON.parse(localStorage.getItem('token')) },
      { subject, description }
    );

    const newCards = [
      ...cards,
      {
        _id: response.request._id,
        tutor: response.request.tutor,
        subject: response.request.subject,
        description: response.request.description,
      },
    ];

    setCards(newCards);
    setOpen(false);
  };

  return (
    <>
      <Header />

      <Typography
        style={{
          padding: '0px  0px 0 200px',
          transform: 'translateY(50%)',
          marginTop: '4rem',
        }}
        variant="h4"
        component="h2"
      >
        Available courses
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<AddIcon />}
        onClick={handleOpen}
      >
        New course
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New request</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new request, please add a subject and a description.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="subject"
            label="Subject"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            fullWidth
          />
          <TextField
            multiline
            margin="dense"
            id="description"
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateRequest} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <div style={{ padding: '50px 200px' }}>
        <Grid container spacing={2}>
          {cards.map(card => (
            <Grid key={card._id} item xs={12} sm={4}>
              <CourseCard card={card} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default DashboardPage;
