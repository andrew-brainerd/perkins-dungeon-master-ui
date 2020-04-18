import React from 'react';
import uuid from 'react-uuid';
import { toLower } from 'ramda';
import HelpText from '../components/HelpText/HelpText';

export const getUniqueMessage = message => ({
  id: uuid(),
  timestamp: new Date(),
  ...message
});

export const parseLocalInput = ({ message }) => {
  const playerInput = toLower(message).trim();

  if (playerInput === 'help') {
    return getUniqueMessage({
      characterName: null,
      component: <HelpText />
    });
  }

  return {};
};
