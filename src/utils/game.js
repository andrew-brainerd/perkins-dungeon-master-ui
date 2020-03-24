import React from 'react';
import uuid from 'react-uuid';
import { toLower } from 'ramda';
import { AUTH_USER, GAME_MASTER } from '../constants/game';
import HelpText from '../components/HelpText/HelpText';
import NewCharacter from '../components/Game/NewCharacter/container';

const getUniqueMessage = message => ({
  id: uuid(),
  timestamp: new Date(),
  ...message
});

export const parseLocalInput = ({ message }) => {
  const playerInput = toLower(message).trim();

  if (playerInput === 'help') {
    return getUniqueMessage({
      character: null,
      component: <HelpText />
    });
  } else if (playerInput === 'newchar' || playerInput === 'newcharacter') {
    return getUniqueMessage({
      character: null,
      component: <NewCharacter />
    });
  }

  return {};
};

export const parseServerResponse = ({ isAuthenticated, message }) => {
  const serverOutput = toLower(message).trim();

  if (serverOutput === 'login' || serverOutput === 'signin') {
    return getUniqueMessage({
      character: AUTH_USER,
      message: isAuthenticated ? 'Already signed in :D' : 'Signing In...',
      color: 'orange'
    });
  } else if (serverOutput === 'logout' || serverOutput === 'signout') {
    return getUniqueMessage({
      character: AUTH_USER,
      message: isAuthenticated ? 'Signing Out...' : 'Not signed in',
      color: 'orange'
    });
  } else if (serverOutput === 'newgame') {
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
