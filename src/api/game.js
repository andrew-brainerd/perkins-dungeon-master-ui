import { prop } from 'ramda';
import { client } from './tools';
import { parseServerResponse } from '../utils/game';

export const createGame = async (name, createdBy = 'System') => {
  const response = await client.post('/games', { name, createdBy })
    .then(prop('data'))
    .catch(err => console.error(err));

  return response;
};

export const loadPlayerGames = async playerId => {
  const response = await client.get('/games', { params: { playerId } })
    .then(prop('data'))
    .catch(err => console.error(err));

  return response;
};

export const loadGame = async gameId => {
  const response = await client.get(`/games/${gameId}`)
    .then(prop('data'))
    .catch(err => console.error(err));

  return response;
};

export const processPlayerInput = async (gameId, input) => {
  if (!!gameId) {
    await client.put(`/games/${gameId}`, { message: input })
      .then(prop('data'))
      .catch(err => console.error(err));
  }

  return parseServerResponse(input);
};

export const sendInvite = async (gameId, playerName, email) => {
  const response = await client.post('/messaging', {
    gameId,
    to: email,
    from: 'invites@anorakgm.com',
    subject: `${playerName} invites you to an adventure!`,
    text: `${window.location.hostname}/game/${gameId}/party`
  });

  return prop('data', response);
};

export const deleteGame = async gameId => {
  const response = client.delete(`/games/${gameId}`);

  return prop('data', response);
};

export const getPlayers = async gameId => {
  const response = await client.get(`/games/${gameId}/players`);

  return prop('data', response);
};
