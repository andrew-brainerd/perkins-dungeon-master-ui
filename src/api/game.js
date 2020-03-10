import { basicJsonHeader, handleResponse } from './tools';

const PERKINS_API_URL = process.env.REACT_APP_PERKINS_API_URL || 'http://localhost:5000';

export const createGame = async (name, createdBy = {}) => {
  const response = await fetch(`${PERKINS_API_URL}/api/games`, {
    method: 'POST',
    headers: basicJsonHeader,
    body: JSON.stringify({ name, createdBy })
  });

  handleResponse(response, 201);
  const json = await response.json();

  return json;
};
