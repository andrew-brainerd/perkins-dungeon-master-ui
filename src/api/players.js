import { prop } from 'ramda';
import { client } from './tools';

export const createPlayer = async (name, email) => {
  const response = await client.post('/players', { name, email })
    .then(prop('data'))
    .catch(err => console.error(err));

  return response;
};

export const getPlayerByEmail = async email => {
  const response = await client.get('/players/email', { params: { email } })
    .then(prop('data'))
    .catch(err => console.error(err));

  return response;
};
