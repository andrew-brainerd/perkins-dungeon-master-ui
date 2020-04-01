import React, { useState, useEffect } from 'react';
import { number, string, bool, func } from 'prop-types';
import usePrevious from '../../hooks/usePrevious';
import { isDefined } from '../../utils/validation';
import { CHARACTER_CREATION_ROUTE } from '../../constants/routes';
import TextDisplay from './TextDisplay/container';
import CommandLine from './CommandLine/container';
import styles from './Game.module.scss';

const HEADER_HEIGHT = 30;
const INPUT_HEIGHT = 105;

const Game = ({
  height,
  gameId,
  playerId,
  characterId,
  isLoadingCharacters,
  shouldUpdateGame,
  connectClient,
  loadGame,
  loadCharacters,
  navTo
}) => {
  const [isInitialLoad, setIsInitialLoad] = useState(isDefined(gameId));
  const prevGameId = usePrevious(gameId);
  const hasUpdatedGameId = isDefined(gameId) && gameId !== prevGameId;
  const shouldUpdate = shouldUpdateGame || hasUpdatedGameId;
  const textDisplayHeight = height - HEADER_HEIGHT - INPUT_HEIGHT;

  useEffect(() => {
    if (!isInitialLoad && !isLoadingCharacters && !characterId) {
      navTo(CHARACTER_CREATION_ROUTE.replace(':gameId', gameId));
    }
  }, [isInitialLoad, isLoadingCharacters, characterId, navTo, gameId]);

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

  return !isInitialLoad && (
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
  isLoadingCharacters: bool,
  shouldUpdateGame: bool,
  connectClient: func.isRequired,
  loadGame: func.isRequired,
  loadCharacters: func.isRequired,
  navTo: func.isRequired
};

export default Game;
