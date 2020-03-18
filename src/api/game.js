import { basicJsonHeader, handleResponse } from './tools';
import { parseInput } from '../utils/game';

const PERKINS_API_URL = process.env.REACT_APP_PERKINS_API_URL || 'http://localhost:5000';

export const createGame = async (name, createdBy = 'System') => {
  const response = await fetch(`${PERKINS_API_URL}/api/games`, {
    method: 'POST',
    headers: basicJsonHeader,
    body: JSON.stringify({ name, createdBy })
  });

  handleResponse(response, 201);
  const json = await response.json();

  return json;
};

export const loadUserGames = async userEmail => {
  const response = await fetch(`${PERKINS_API_URL}/api/games?userEmail=${userEmail}`);

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const loadGame = async gameId => {
  const response = await fetch(`${PERKINS_API_URL}/api/games/${gameId}`);

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const processUserInput = async (gameId, input) => {
  if (!!gameId) {
    const response = await fetch(`${PERKINS_API_URL}/api/games/${gameId}`, {
      method: 'PUT',
      headers: basicJsonHeader,
      body: JSON.stringify({ message: input })
    });

    handleResponse(response, 204);
  }

  return parseInput(input);
};
