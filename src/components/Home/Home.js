import React, { useState, useEffect } from 'react';
import { shape, string, array, func } from 'prop-types';
import { isEmpty } from 'ramda';
import Button from '../common/Button/Button';
import TextInput from '../common/TextInput/TextInput';
import styles from './Home.module.scss';
import { GAME_ROUTE } from '../../constants/routes';

const Home = ({ user, userGames, loadUserGames, startNewGame, navTo }) => {
  const [isNewGameOpen, setIsNewGameOpen] = useState(false);
  const [isLoadGameOpen, setIsLoadGameOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameName, setGameName] = useState('');

  useEffect(() => {
    isLoadGameOpen && user && loadUserGames(user.email);
  }, [isLoadGameOpen]);

  return (
    <div className={styles.home}>
      {!isEmpty(user) ? (
        <>
          <Button
            className={styles.gameButton}
            text={'New Game'}
            onClick={() => setIsNewGameOpen(true)}
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
        styles.newGame,
        isNewGameOpen ? styles.isOpen : ''
      ].join(' ')}>
        <h1>Start A New Game</h1>
        <TextInput
          autofocus
          className={styles.nameInput}
          placeholder={'Name'}
          onChange={setGameName}
          value={gameName}
        />
        <div className={styles.buttonContainer}>
          <Button
            className={styles.newGameButton}
            text={'Cancel'}
            onClick={() => setIsNewGameOpen(false)}
          />
          <Button
            className={styles.newGameButton}
            text={'Start'}
            onClick={() => startNewGame(gameName, user.email)}
            disabled={!gameName || !user}
          />
        </div>
      </div>
      <div className={[
        styles.loadGame,
        isLoadGameOpen ? styles.isOpen : ''
      ].join(' ')}>
        <h1>Load A Game</h1>
        <div className={styles.gameContainer}>
          {userGames.map((game, g) => (
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
  user: shape({
    email: string
  }),
  userGames: array,
  loadUserGames: func.isRequired,
  startNewGame: func.isRequired,
  navTo: func.isRequired
};

export default Home;
