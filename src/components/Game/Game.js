import React, { useState, useEffect } from 'react';
import { string, array, func } from 'prop-types';
import { useAuth0 } from '../../hooks/useAuth0';
import TextInput from '../common/TextInput/TextInput';
import styles from './Game.module.scss';

const getGameId = pathname => pathname.split('/')[2];

const Game = ({ pathname, messages, addUserInput, connectClient }) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [userInput, setUserInput] = useState('');
  const gameId = getGameId(pathname);

  useEffect(() => {
    console.log('%cConnecting Client to Game Server...', 'color: cyan');
    connectClient(gameId);
  }, [connectClient, gameId]);

  return (
    <div className={styles.game}>
      <div className={styles.textDisplay}>
        {messages.map(({ character, message, component, color }, i) => (
          <div key={i} className={styles.messageItem}>
            {character &&
              <div className={styles.character} style={{ color }}>{character}: </div>
            }
            <div
              className={styles.message}
              dangerouslySetInnerHTML={{ __html: message }}
            />
            {component}
          </div>
        ))}
      </div>
      <div className={styles.commandCenter}>
        <TextInput
          className={styles.command}
          inputClassName={styles.commandInput}
          autofocus
          value={userInput}
          onChange={setUserInput}
          onPressEnter={() => {
            addUserInput({
              isAuthenticated,
              login: loginWithRedirect,
              logout,
              character: 'User',
              message: userInput
            });
            setUserInput('');
          }}
        />
      </div>
    </div>
  );
};

Game.propTypes = {
  pathname: string,
  messages: array,
  addUserInput: func.isRequired,
  connectClient: func.isRequired
};

export default Game;
