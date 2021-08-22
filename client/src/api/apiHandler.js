import { BASE_API_URL } from './constants';

const baseHeaders = {
  'Content-type': 'application/json; charset=UTF-8',
  Accept: 'application/json',
};

async function read({ auth, resource, params = {} }) {
  const url = new URL(`${BASE_API_URL}${resource}`);
  url.search = new URLSearchParams(params).toString();
  const headers = auth
    ? { ...baseHeaders, Authorization: `Bearer ${auth.token}` }
    : baseHeaders;

  const response = await fetch(url.toString(), {
    headers,
    method: 'GET',
  });
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }

  return data;
}

async function create({ auth, resource, body, params = {} }) {
  const url = new URL(`${BASE_API_URL}${resource}`);
  url.search = new URLSearchParams(params).toString();
  const headers = auth
    ? { ...baseHeaders, Authorization: `Bearer ${auth.token}` }
    : baseHeaders;

  const response = await fetch(url.toString(), {
    headers,
    method: 'POST',
    body: JSON.stringify(body),
  });

  let data;
  try {
    data = await response.json();
  } catch (e) {
    data = null;
  }

  if (!response.ok) {
    throw data;
  } else {
    return data;
  }
}

async function update({ auth, resource, body, params = {} }) {
  const url = new URL(`${BASE_API_URL}${resource}`);
  url.search = new URLSearchParams(params).toString();
  const headers = auth
    ? { ...baseHeaders, Authorization: `Bearer ${auth.token}` }
    : baseHeaders;

  const response = await fetch(url.toString(), {
    headers,
    method: 'PUT',
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }

  return data;
}

async function remove({ auth, resource, body, params = {} }) {
  const url = new URL(`${BASE_API_URL}${resource}`);
  url.search = new URLSearchParams(params).toString();
  const headers = auth
    ? { ...baseHeaders, Authorization: `Bearer ${auth.token}` }
    : baseHeaders;

  const response = await fetch(url.toString(), {
    headers,
    method: 'DELETE',
    body: JSON.stringify(body),
  });

  const data = response.status !== 204 ? await response.json() : null;

  if (!response.ok) {
    throw data;
  }

  return data;
}

export { read, create, update, remove };
