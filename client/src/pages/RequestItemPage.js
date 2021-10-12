import React, { useEffect, useState } from 'react';

import { Typography } from '@material-ui/core';
import { readRequest } from '../api/requestsApi';
import Header from '../components/Header';
import { useParams } from 'react-router';

const RequestItemPage = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const showStudents =
    request?.tutor._id === JSON.parse(localStorage.getItem('user'))._id;

  useEffect(() => {
    async function fetchRequestsApi() {
      const response = await readRequest(
        {
          token: JSON.parse(localStorage.getItem('token')),
        },
        id
      );
      setRequest(response);
    }
    fetchRequestsApi();
  }, []);

  return (
    <>
      <Header />
      <div style={{ padding: '50px 200px', marginTop: '4rem' }}>
        {request && (
          <>
            <Typography variant="h4" component="h2">
              {request.subject}
            </Typography>
            <Typography color="textSecondary">
              Tutor: {request.tutor.name}
            </Typography>
            <Typography color="textSecondary">
              Email: {request.tutor.email}
            </Typography>
            <Typography color="textSecondary">
              Major: {request.tutor.major}
            </Typography>
            <Typography color="textSecondary">
              Age: {request.tutor.age}
            </Typography>
            <Typography style={{ marginTop: '2rem' }} variant="h5">
              Course Overview
            </Typography>
            <Typography component="p">{request.description}</Typography>
            {showStudents && (
              <>
                <Typography style={{ marginTop: '2rem' }} variant="h5">
                  Students enrolled
                </Typography>
                {request.students.length === 0 ? (
                  <Typography component="p">
                    No students currently enrolled
                  </Typography>
                ) : (
                  request.students.map(student => (
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
