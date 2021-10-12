import { read, create, update } from './apiHandler';

async function readRequests(auth) {
  const response = await read({
    resource: '/requests',
    auth,
  });

  return response;
}

async function readRequest(auth, id) {
  const response = await read({
    resource: `/requests/${id}`,
    auth,
  });

  return response;
}

async function readMyRequests(auth) {
  const response = await read({
    resource: '/requests/myRequests',
    auth,
  });

  return response;
}

async function readMyTaughtRequests(auth) {
  const response = await read({
    resource: '/requests/myTaughtRequests',
    auth,
  });

  return response;
}

async function createRequest(auth, requestData) {
  const response = await create({
    resource: '/requests',
    body: requestData,
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
  readRequests,
  readRequest,
  readMyRequests,
  readMyTaughtRequests,
  createRequest,
  joinClass,
  leaveClass,
};
