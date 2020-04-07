import { prop } from 'ramda';
import { client } from './tools';

export const createPlayer = async (name, email) => {
  const response = await client.post('/players', { name, email });

  return prop('data', response);
};

export const getPlayerByEmail = async email => {
  const response = await client.get('/players/email', { params: { email } });

  return prop('data', response);
};
