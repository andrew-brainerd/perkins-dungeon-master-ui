import React, { useState, useEffect } from 'react';
import { shape, string, array, func } from 'prop-types';
import { isEmpty } from 'ramda';
import { NEW_GAME_ROUTE, GAME_ROUTE } from '../../constants/routes';
import Button from '../common/Button/Button';
import styles from './Home.module.scss';

const Home = ({ player, playerGames, loadPlayerGames, navTo }) => {
  const [isLoadGameOpen, setIsLoadGameOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    isLoadGameOpen && player && loadPlayerGames(player._id);
  }, [isLoadGameOpen, player, loadPlayerGames]);

  return (
    <div className={styles.home}>
      {!isEmpty(player) ? (
        <>
          <Button
            className={styles.gameButton}
            text={'New Game'}
            onClick={() => navTo(NEW_GAME_ROUTE)}
          />
          <Button
            className={styles.gameButton}
            text={'Load Game'}
            onClick={() => setIsLoadGameOpen(true)}
          />
        </>
      ) :
        <div className={styles.pleaseSignIn}>
          Sign in to start your adventure!
        </div>
      }
      <div className={[
        styles.loadGame,
        isLoadGameOpen ? styles.isOpen : ''
      ].join(' ')}>
        <h1>Load A Game</h1>
        <div className={styles.gameContainer}>
          {playerGames.map((game, g) => (
            <div
              key={g}
              className={[
                styles.game,
                game._id === (selectedGame || {})._id ? styles.selected : ''
              ].join(' ')}
              onClick={() => setSelectedGame(game)}
            >
              {(game || {}).name}
            </div>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <Button
            className={styles.loadGameButton}
            text={'Cancel'}
            onClick={() => setIsLoadGameOpen(false)}
          />
          <Button
            className={styles.loadGameButton}
            text={'Load'}
            onClick={() => {
              navTo(GAME_ROUTE.replace(':gameId', selectedGame._id));
            }}
            disabled={!selectedGame}
          />
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  player: shape({
    email: string
  }),
  playerGames: array,
  loadPlayerGames: func.isRequired,
  navTo: func.isRequired
};

export default Home;
