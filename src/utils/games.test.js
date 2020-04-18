import React from 'react';
import { getUniqueMessage, parseLocalInput } from './games';
import HelpText from '../components/HelpText/HelpText';

describe('Games Utilities', () => {
  it('should generate a unique message', () => {
    const uniqueMessage = getUniqueMessage('test message');

    expect(uniqueMessage.id).toBeDefined();
    expect(uniqueMessage.timestamp).toBeDefined();
  });

  describe('parseLocalInput', () => {
    it('should return the Help component', () => {
      const helpMessage = parseLocalInput({ message: 'help' });

      expect(helpMessage.characterName).toBe(null);
      expect(helpMessage.component).toEqual(<HelpText />);
    });

    it('should return an empty object', () => {
      const message = parseLocalInput({ message: 'hello' });

      expect(message).toEqual({});
    });
  });
});
