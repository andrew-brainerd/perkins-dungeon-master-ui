import React, { useState, useEffect } from 'react';
import { string, array, bool, func } from 'prop-types';
import uuid from 'react-uuid';
import { useAuth0 } from '../../hooks/useAuth0';
import usePrevious from '../../hooks/usePrevious';
import TextInput from '../common/TextInput/TextInput';
import styles from './Game.module.scss';

const getGameId = pathname => pathname.split('/')[2];

const Game = ({ pathname, messages, shouldUpdateGame, addUserInput, connectClient, loadGame }) => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [userInput, setUserInput] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const gameId = getGameId(pathname);
  const prevGameId = usePrevious(gameId);
  const shouldUpdate = shouldUpdateGame || (gameId && gameId !== prevGameId);

  useEffect(() => {
    gameId && gameId !== 'undefined' && connectClient(gameId);
  }, [connectClient, gameId]);

  useEffect(() => {
    if (shouldUpdate || isInitialLoad) {
      loadGame(gameId);
      setIsInitialLoad(false);
    }
  }, [shouldUpdate, isInitialLoad, gameId, prevGameId]);

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
              gameId,
              id: uuid(),
              character: (user || {}).name || 'User',
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
  shouldUpdateGame: bool,
  addUserInput: func.isRequired,
  connectClient: func.isRequired,
  loadGame: func.isRequired
};

export default Game;
