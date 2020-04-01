import React, { useState, useEffect } from 'react';
import { number, string, bool, func } from 'prop-types';
import usePrevious from '../../hooks/usePrevious';
import { isDefined } from '../../utils/validation';
import TextDisplay from './TextDisplay/container';
import CommandLine from './CommandLine/container';
import styles from './Game.module.scss';

const HEADER_HEIGHT = 30;
const INPUT_HEIGHT = 105;

const Game = ({ height, gameId, playerId, characterId, shouldUpdateGame, connectClient, loadGame, loadCharacters }) => {
  const [isInitialLoad, setIsInitialLoad] = useState(isDefined(gameId));
  const prevGameId = usePrevious(gameId);
  const hasUpdatedGameId = isDefined(gameId) && gameId !== prevGameId;
  const shouldUpdate = shouldUpdateGame || hasUpdatedGameId;
  const textDisplayHeight = height - HEADER_HEIGHT - INPUT_HEIGHT;

  useEffect(() => {
    if (!isInitialLoad && !characterId) {
      console.log('No character for current player');
    }
  }, [isInitialLoad, characterId]);

  useEffect(() => {
    if (isDefined(gameId)) {
      connectClient(gameId);
    }
  }, [connectClient, gameId]);

  useEffect(() => {
    if ((shouldUpdate || isInitialLoad) && playerId) {
      loadGame(gameId);
      loadCharacters(gameId);
      setIsInitialLoad(false);
    }
  }, [shouldUpdate, isInitialLoad, loadGame, loadCharacters, gameId, playerId, prevGameId]);

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
  playerId: string,
  characterId: string,
  shouldUpdateGame: bool,
  connectClient: func.isRequired,
  loadGame: func.isRequired,
  loadCharacters: func.isRequired
};

export default Game;
