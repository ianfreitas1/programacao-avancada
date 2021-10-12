import React, { useEffect, useState } from 'react';

import { Typography } from '@material-ui/core';
import { readCourse } from '../api/coursesApi';
import Header from '../components/Header';
import { useParams } from 'react-router';

const RequestItemPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const showStudents =
    course?.tutor._id === JSON.parse(localStorage.getItem('user'))._id;

  useEffect(() => {
    async function fetchCourseApi() {
      const response = await readCourse(
        {
          token: JSON.parse(localStorage.getItem('token')),
        },
        id
      );
      setCourse(response);
    }
    fetchCourseApi();
  }, []);

  return (
    <>
      <Header />
      <div style={{ padding: '50px 200px', marginTop: '4rem' }}>
        {course && (
          <>
            <Typography variant="h4" component="h2">
              {course.subject}
            </Typography>
            <Typography color="textSecondary">
              Tutor: {course.tutor.name}
            </Typography>
            <Typography color="textSecondary">
              Email: {course.tutor.email}
            </Typography>
            <Typography color="textSecondary">
              Major: {course.tutor.major}
            </Typography>
            <Typography color="textSecondary">
              Age: {course.tutor.age}
            </Typography>
            <Typography style={{ marginTop: '2rem' }} variant="h5">
              Course Overview
            </Typography>
            <Typography component="p">{course.description}</Typography>
            {showStudents && (
              <>
                <Typography style={{ marginTop: '2rem' }} variant="h5">
                  Students enrolled
                </Typography>
                {course.students.length === 0 ? (
                  <Typography component="p">
                    No students currently enrolled
                  </Typography>
                ) : (
                  course.students.map(student => (
                    <Typography component="p">
                      {student.name} - {student.email}
                    </Typography>
                  ))
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default RequestItemPage;
