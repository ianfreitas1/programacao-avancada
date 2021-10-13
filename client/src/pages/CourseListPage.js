import React, { useEffect, useState } from 'react';

import { Grid, Typography } from '@material-ui/core';
import Header from '../components/Header';
import CourseCard from '../components/CourseCard';
import { readMyCourses } from '../api/coursesApi';

const CourseListPage = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchCoursesApi() {
      const response = await readMyCourses({
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
          My courses
        </Typography>
        {cards.length === 0 && (
          <Typography component="p">
            Currently you are not enrolled in any course.
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

export default CourseListPage;
