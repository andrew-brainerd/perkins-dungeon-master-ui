import { prop } from 'ramda';
import { client } from './tools';
import { parseServerResponse } from '../utils/games';
import { getInviteHtml } from '../constants/games';

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
    from: 'noreply@anorakgm.com',
    subject: `${playerName} invites you on an adventure!`,
    html: getInviteHtml(gameId, window.location)
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

export const addPlayer = async (gameId, playerId) => {
  const response = await client.patch(`/games/${gameId}/players`, { playerId });

  return prop('data', response);
};
