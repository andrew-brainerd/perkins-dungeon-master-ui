import React, { useState, useEffect, useRef } from 'react';
import { number, string, array, bool, func } from 'prop-types';
import uuid from 'react-uuid';
import { useAuth0 } from '../../hooks/useAuth0';
import usePrevious from '../../hooks/usePrevious';
import { isDefined } from '../../utils/validation';
import TextInput from '../common/TextInput/TextInput';
import styles from './Game.module.scss';

const HEADER_HEIGHT = 30;
const INPUT_HEIGHT = 105;

const Game = ({ height, gameId, messages, shouldUpdateGame, addPlayerInput, connectClient, loadGame }) => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [playerInput, setPlayerInput] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(isDefined(gameId));
  const textDisplayRef = useRef();

  const prevGameId = usePrevious(gameId);
  const shouldUpdate = shouldUpdateGame || (isDefined(gameId) && gameId !== prevGameId);
  const textDisplayHeight = height - HEADER_HEIGHT - INPUT_HEIGHT;

  useEffect(() => {
    if (isDefined(gameId)) {
      connectClient(gameId);
    }
  }, [connectClient, gameId]);

  useEffect(() => {
    if (shouldUpdate || isInitialLoad) {
      loadGame(gameId);
      setIsInitialLoad(false);
    }
  }, [shouldUpdate, isInitialLoad, loadGame, gameId, prevGameId]);

  useEffect(() => {
    textDisplayRef.current.scrollTop = textDisplayRef.current.scrollHeight;
  }, [messages.length]);

  return (
    <div className={styles.game}>
      <div className={styles.textDisplay} ref={textDisplayRef} style={{ height: textDisplayHeight }}>
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
    </div>
  );
};

Game.propTypes = {
  height: number.isRequired,
  gameId: string,
  pathname: string,
  messages: array,
  shouldUpdateGame: bool,
  addPlayerInput: func.isRequired,
  connectClient: func.isRequired,
  loadGame: func.isRequired
};

export default Game;
