import { basicJsonHeader, handleResponse } from './tools';
import { parseServerResponse } from '../utils/game';
import { PERKINS_API_URL } from '../constants/api';

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

export const loadPlayerGames = async playerId => {
  const response = await fetch(`${PERKINS_API_URL}/api/games?playerId=${playerId}`);

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

export const processPlayerInput = async (gameId, input) => {
  if (!!gameId) {
    const response = await fetch(`${PERKINS_API_URL}/api/games/${gameId}`, {
      method: 'PUT',
      headers: basicJsonHeader,
      body: JSON.stringify({ message: input })
    });

    handleResponse(response, 204);
  }

  return parseServerResponse(input);
};

export const createCharacter = async (gameId, { name, createdBy, ...rest }) => {
  if (!!gameId) {
    const response = await fetch(`${PERKINS_API_URL}/api/characters`, {
      method: 'POST',
      headers: basicJsonHeader,
      body: JSON.stringify({ gameId, name, createdBy })
    });

    handleResponse(response, 201);
    const json = response.json();

    return json;
  }

  return {};
};
