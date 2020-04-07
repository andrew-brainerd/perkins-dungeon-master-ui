import React, { useState } from 'react';
import { string, shape, func } from 'prop-types';
import uuid from 'react-uuid';
import { useAuth0 } from '../../../hooks/useAuth0';
import TextInput from '../../common/TextInput/TextInput';
import styles from './CommandLine.module.scss';

const CommandLine = ({ gameId, character, addPlayerInput }) => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [playerInput, setPlayerInput] = useState('');

  return (
    <div className={styles.commandLine}>
      <TextInput
        name={'commandLine'}
        className={styles.command}
        inputClassName={styles.commandInput}
        autofocus
        value={playerInput}
        onChange={setPlayerInput}
        onPressEnter={() => {
          addPlayerInput({
            isAuthenticated,
            login: loginWithRedirect,
            logout,
            gameId,
            id: uuid(),
            timestamp: new Date(),
            characterId: (character || {})._id,
            characterName: (character || {}).name || 'Player',
            playerName: (user || {}).email,
            message: playerInput
          });
          setPlayerInput('');
        }}
      />
    </div>
  );
};

CommandLine.propTypes = {
  gameId: string.isRequired,
  character: shape({
    _id: string
  }),
  addPlayerInput: func.isRequired
};

export default CommandLine;
