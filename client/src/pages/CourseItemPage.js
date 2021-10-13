import React, { useEffect, useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@material-ui/core';
import { deleteCourse, editCourse, readCourse } from '../api/coursesApi';
import Header from '../components/Header';
import { useHistory, useParams } from 'react-router';

const CourseItemPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [course, setCourse] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const isTutor =
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
      setSubject(response.subject);
      setDescription(response.description);
    }
    fetchCourseApi();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDeleteConfirmation = () => {
    setOpenDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false);
  };

  const handleUpdateCourse = async () => {
    const response = await editCourse(
      { token: JSON.parse(localStorage.getItem('token')) },
      course._id,
      { subject, description }
    );

    setCourse(response);
    setOpen(false);
  };

  const handleDeleteCourse = async () => {
    await deleteCourse(
      { token: JSON.parse(localStorage.getItem('token')) },
      course._id
    );

    setOpenDeleteConfirmation(false);
    history.push('/dashboard');
  };

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

            {isTutor && (
              <>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={handleOpen}
                >
                  Edit course
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  onClick={handleOpenDeleteConfirmation}
                >
                  Delete course
                </Button>
              </>
            )}

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Edit course</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To edit this course details, please fill in the new subject
                  and/or description.
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
                <Button onClick={handleUpdateCourse} color="primary">
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={openDeleteConfirmation}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Delete course</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  This course is going to be deleted permanently. Are you sure?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDeleteConfirmation} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleDeleteCourse} color="primary">
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>

            <Typography style={{ marginTop: '2rem' }} variant="h5">
              Course Overview
            </Typography>

            <Typography component="p">{course.description}</Typography>
            {isTutor && (
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

export default CourseItemPage;
