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
import Header from '../components/Header';
import RequestCard from '../components/RequestCard';
import { createRequest, readRequests } from '../api/requestsApi';

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
    async function fetchRequestsApi() {
      const response = await readRequests();
      setCards(response);
    }
    fetchRequestsApi();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateRequest = async () => {
    const response = await createRequest(
      { token: JSON.parse(localStorage.getItem('user')).token },
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
        style={{ padding: '0px  0px 0 200px', transform: 'translateY(50%)' }}
        variant="h4"
        component="h2"
      >
        Available requests
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<AddIcon />}
        onClick={handleOpen}
      >
        New request
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
              <RequestCard card={card} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default DashboardPage;
