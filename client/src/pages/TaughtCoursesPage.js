import React, { useEffect, useState } from 'react';

import { Grid, Typography } from '@material-ui/core';
import RequestCard from '../components/RequestCard';
import { readMyTaughtRequests } from '../api/requestsApi';
import Header from '../components/Header';

const TaughtCoursesPage = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchRequestsApi() {
      const response = await readMyTaughtRequests({
        token: JSON.parse(localStorage.getItem('token')),
      });
      setCards(response);
    }
    fetchRequestsApi();
  }, []);

  return (
    <>
      <Header />
      <div style={{ padding: '50px 200px', marginTop: '4rem' }}>
        <Typography variant="h4" component="h2">
          My taught requests
        </Typography>
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

export default TaughtCoursesPage;
