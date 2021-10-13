import { read, create, update, remove } from './apiHandler';

async function readCourses(auth) {
  const response = await read({
    resource: '/requests',
    auth,
  });

  return response;
}

async function readCourse(auth, id) {
  const response = await read({
    resource: `/requests/${id}`,
    auth,
  });

  return response;
}

async function readMyCourses(auth) {
  const response = await read({
    resource: '/requests/myRequests',
    auth,
  });

  return response;
}

async function readMyTaughtCourses(auth) {
  const response = await read({
    resource: '/requests/myTaughtRequests',
    auth,
  });

  return response;
}

async function createCourse(auth, requestData) {
  const response = await create({
    resource: '/requests',
    body: requestData,
    auth,
  });

  return response;
}

async function editCourse(auth, courseId, courseData) {
  const response = await update({
    resource: `/requests/${courseId}`,
    body: courseData,
    auth,
  });

  return response;
}

async function deleteCourse(auth, courseId) {
  const response = await remove({
    resource: `/requests/${courseId}`,
    auth,
  });

  return response;
}

async function joinClass(auth, requestId) {
  const response = await update({
    resource: `/requests/subscribe/${requestId}`,
    auth,
  });

  return response;
}

async function leaveClass(auth, requestId) {
  const response = await update({
    resource: `/requests/unsubscribe/${requestId}`,
    auth,
  });

  return response;
}

export {
  readCourses,
  readCourse,
  readMyCourses,
  readMyTaughtCourses,
  createCourse,
  joinClass,
  leaveClass,
  deleteCourse,
  editCourse,
};
