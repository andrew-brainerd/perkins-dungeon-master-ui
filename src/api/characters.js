import { prop } from 'ramda';
import { client } from './tools';

export const createCharacter = async character => {
  const response = await client.post('/characters', { ...character })
    .then(prop('data'))
    .catch(err => console.error(err));

  return response;
};

export const loadCharacter = async characterId => {
  const response = await client.get('/characters', { params: { characterId } })
    .then(prop('data'))
    .catch(err => console.error(err));

  return response;
};
