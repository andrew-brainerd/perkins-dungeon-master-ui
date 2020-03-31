import React, { useState, useEffect } from 'react';
import { number, string, bool, func } from 'prop-types';
import usePrevious from '../../hooks/usePrevious';
import { isDefined } from '../../utils/validation';
import TextDisplay from './TextDisplay/container';
import CommandLine from './CommandLine/container';
import styles from './Game.module.scss';

const HEADER_HEIGHT = 30;
const INPUT_HEIGHT = 105;

const Game = ({ height, gameId, shouldUpdateGame, connectClient, loadGame }) => {
  const [isInitialLoad, setIsInitialLoad] = useState(isDefined(gameId));

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

  return (
    <div className={styles.game}>
      <TextDisplay height={textDisplayHeight} />
      <CommandLine />
    </div>
  );
};

Game.propTypes = {
  height: number.isRequired,
  gameId: string,
  pathname: string,
  shouldUpdateGame: bool,
  connectClient: func.isRequired,
  loadGame: func.isRequired
};

export default Game;
