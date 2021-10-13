import React, { useEffect, useState } from 'react';

import { Grid, Typography } from '@material-ui/core';
import CourseCard from '../components/CourseCard';
import { readMyTaughtCourses } from '../api/coursesApi';
import Header from '../components/Header';

const TaughtCoursesPage = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchCoursesApi() {
      const response = await readMyTaughtCourses({
        token: JSON.parse(localStorage.getItem('token')),
      });
      setCards(response);
    }
    fetchCoursesApi();
  }, []);

  return (
    <>
      <Header />
      <div style={{ padding: '50px 200px', marginTop: '4rem' }}>
        <Typography variant="h4" component="h2">
          My taught courses
        </Typography>
        {cards.length === 0 && (
          <Typography component="p">
            Currently you are not teaching any course.
          </Typography>
        )}
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

export default TaughtCoursesPage;
