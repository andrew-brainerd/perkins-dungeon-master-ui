import { prop } from 'ramda';
import { client } from './tools';

export const createCharacter = async character => {
  const response = await client.post('/characters', { ...character });

  return prop('data', response);
};

export const loadCharacters = async gameId => {
  const response = await client.get('/characters', { params: { gameId } });

  return prop('data', response);
};
