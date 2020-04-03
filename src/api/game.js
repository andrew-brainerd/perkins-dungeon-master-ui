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

const inviteBodyStyle = `
  background-color: black !important;
  height: 300px;
  width: 550px;
`.replace(/\n/g, '');

const headerStyle = `
  color: #00fcfe;
  margin: 30px auto;
  padding: 30px;
  text-align: center;
`.replace(/\n/g, '');

const inviteButtonStyle = `
  background-color: #fffd33;
  border-radius: 5px;
  margin: 30px auto;
  padding: 10px 15px;
  text-align: center;
  width: 150px;
`.replace(/\n/g, '');

export const sendInvite = async (gameId, playerName, email) => {
  const { protocol, hostname } = process.env.NODE_ENV === 'production' ?
    window.location : { protocol: 'http:', hostname: 'localhost:3000' };

  const response = await client.post('/messaging', {
    gameId,
    to: email,
    from: 'noreply@anorakgm.com',
    subject: `${playerName} invites you on an adventure!`,
    html: `
      <html>
        <head>
          <style type="text/css">
            a, a:link, a:visited {
              color: black !important;
              font-size: 22px;
              font-weight: bold;
              text-decoration: none;
            }
          </style>
        </head>
        <body style="${inviteBodyStyle}">
          <h2 style="${headerStyle}">You're invited on an adventure!</h2>
          <div style="${inviteButtonStyle}">
            <a href="${protocol}//${hostname}/game/${gameId}/setup">
              Join Game
            </a>
          </div>
        </body>
      </html>
    `.replace(/\n/g, '')
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
