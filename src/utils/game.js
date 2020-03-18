import React from 'react';
import uuid from 'react-uuid';
import { toLower } from 'ramda';
import { AUTH_USER, GAME_MASTER } from '../constants/game';
import HelpText from '../components/HelpText/HelpText';

const getUniqueMessage = message => ({
  id: uuid(),
  timestamp: new Date(),
  ...message
});

export const parseLocalInput = ({ message }) => {
  const userInput = toLower(message).trim();

  if (userInput === 'help') {
    return getUniqueMessage({
      character: null,
      component: <HelpText />
    });
  }

  return {};
};

export const parseServerResponse = ({ isAuthenticated, message }) => {
  const userInput = toLower(message).trim();

  if (userInput === 'login' || userInput === 'signin') {
    return getUniqueMessage({
      character: AUTH_USER,
      message: isAuthenticated ? 'Already signed in :D' : 'Signing In...',
      color: 'orange'
    });
  } else if (userInput === 'logout' || userInput === 'signout') {
    return getUniqueMessage({
      character: AUTH_USER,
      message: isAuthenticated ? 'Signing Out...' : 'Not signed in',
      color: 'orange'
    });
  } else if (userInput === 'newgame') {
    if (isAuthenticated) {
      return {
        character: GAME_MASTER,
        message: 'Starting a new game...',
        color: '#7383BF'
      };
    } else {
      return {
        character: AUTH_USER,
        message: 'Please sign in first',
        color: 'orange'
      };
    }
  }

  return {};
};
