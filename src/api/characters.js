import { basicJsonHeader, handleResponse } from './tools';
import { PERKINS_API_URL } from '../constants/api';

export const createCharacter = async character => {
  const response = await fetch(`${PERKINS_API_URL}/api/characters`, {
    method: 'POST',
    headers: basicJsonHeader,
    body: JSON.stringify(character)
  });

  handleResponse(response, 201);
  const json = await response.json();

  return json;
};

export const loadCharacter = async characterId => {
  const response = await fetch(`${PERKINS_API_URL}/api/characters?characterId=${characterId}`);

  handleResponse(response);
  const json = await response.json();

  return json;
};
