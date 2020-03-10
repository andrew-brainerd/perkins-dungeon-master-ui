import React from 'react';
import { basicJsonHeader, handleResponse } from './tools';
import HelpText from '../components/HelpText/HelpText';

const PERKINS_API_URL = process.env.REACT_APP_PERKINS_API_URL || 'http://localhost:5000';

export const createGame = async (name, createdBy = {}) => {
  const response = await fetch(`${PERKINS_API_URL}/api/games`, {
    method: 'POST',
    headers: basicJsonHeader,
    body: JSON.stringify({ name, createdBy })
  });

  handleResponse(response, 201);
  const json = await response.json();

  return json;
};

export const processUserInput = async ({ character, message }) => {
  if (message === 'help') {
    return {
      character: null,
      component: <HelpText />
    }
  }

  return {
    character: 'The Psychiatrist',
    message: 'And how do you feel about that?'
  };
};
