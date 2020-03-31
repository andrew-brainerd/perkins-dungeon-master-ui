import React, { useState } from 'react';
import { string, func } from 'prop-types';
import uuid from 'react-uuid';
import { useAuth0 } from '../../../hooks/useAuth0';
import TextInput from '../../common/TextInput/TextInput';
import styles from './CommandLine.module.scss';

const CommandLine = ({ gameId, addPlayerInput }) => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [playerInput, setPlayerInput] = useState('');

  return (
    <div className={styles.commandLine}>
      <TextInput
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
            character: (user || {}).name || 'Player',
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
  addPlayerInput: func.isRequired
};

export default CommandLine;
