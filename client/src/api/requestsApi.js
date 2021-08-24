import { read, create } from './apiHandler';

async function readRequests(auth) {
  const response = await read({
    resource: '/requests',
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

export { readRequests, createRequest };
