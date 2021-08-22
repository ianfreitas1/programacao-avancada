import { create } from './apiHandler';

async function registerUser(userData) {
  const response = await create({
    resource: '/users',
    body: userData,
  });

  return response;
}

async function signInUser(credentials) {
  const response = await create({
    resource: '/users/login/',
    body: credentials,
  });

  return response;
}

export { registerUser, signInUser };
