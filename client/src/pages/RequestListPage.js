import React, { useEffect, useState } from 'react';

import { Grid } from '@material-ui/core';
import Header from '../components/Header';
import RequestCard from '../components/RequestCard';
import { readMyRequests } from '../api/requestsApi';

const RequestListPage = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchRequestsApi() {
      const response = await readMyRequests({
        token: JSON.parse(localStorage.getItem('token')),
      });
      setCards(response);
    }
    fetchRequestsApi();
  }, []);

  return (
    <>
      <Header />
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

export default RequestListPage;
