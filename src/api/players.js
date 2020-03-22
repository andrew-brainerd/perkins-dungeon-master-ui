import { basicJsonHeader, handleResponse } from './tools';

const PERKINS_API_URL = process.env.REACT_APP_PERKINS_API_URL || 'http://localhost:5000';

export const createPlayer = async (name, email) => {
  const response = await fetch(`${PERKINS_API_URL}/api/players`, {
    method: 'POST',
    headers: basicJsonHeader,
    body: JSON.stringify({ name, email })
  });

  handleResponse(response, 201);
  const json = await response.json();

  return json;
};

export const getPlayerByEmail = async email => {
  const response = await fetch(`${PERKINS_API_URL}/api/players/email?email=${email}`);

  handleResponse(response);
  const json = await response.json();

  return json;
};

