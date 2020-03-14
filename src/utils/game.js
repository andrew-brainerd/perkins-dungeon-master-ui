import React from 'react';
import { toLower } from 'ramda';
import { AUTH_USER, GAME_MASTER } from '../constants/game';
import HelpText from '../components/HelpText/HelpText';

export const parseInput = ({ isAuthenticated, message }) => {
  const userInput = toLower(message).trim();

  if (userInput === 'help') {
    return {
      character: null,
      component: <HelpText />
    };
  } else if (userInput === 'login' || userInput === 'signin') {
    return {
      character: AUTH_USER,
      message: isAuthenticated ? 'Already signed in :D' : 'Signing In...',
      color: 'orange'
    };
  } else if (userInput === 'logout' || userInput === 'signout') {
    return {
      character: AUTH_USER,
      message: isAuthenticated ? 'Signing Out...' : 'Not signed in',
      color: 'orange'
    };
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
