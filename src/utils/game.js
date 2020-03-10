import React from 'react';
import { AUTH_USER } from '../constants/game';
import HelpText from '../components/HelpText/HelpText';

export const parseInput = ({ isAuthenticated, login, logout, character, message }) => {
  if (message === 'help') {
    return {
      character: null,
      component: <HelpText />
    };
  } else if (message === 'login' || message === 'signIn') {
    return {
      character: AUTH_USER,
      message: isAuthenticated ? 'Already signed in :D' : 'Signing In...',
      color: 'orange'
    };
  } else if (message === 'logout' || message === 'signOut') {
    return {
      character: AUTH_USER,
      message: isAuthenticated ? 'Signing Out...' : 'Not signed in',
      color: 'orange'
    };
  }

  return {
    character: 'The Psychiatrist',
    message: 'And how do you feel about that?'
  };
};
