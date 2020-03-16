import React, { useState } from 'react';
import { shape, string, func } from 'prop-types';
import { isEmpty } from 'ramda';
import Button from '../common/Button/Button';
import TextInput from '../common/TextInput/TextInput';
import styles from './Home.module.scss';

const Home = ({ user, startNewGame }) => {
  const [isNewGameOpen, setIsNewGameOpen] = useState(false);
  const [isLoadGameOpen, setIsLoadGameOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameName, setGameName] = useState('');

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
              console.log('Load Game');
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
  startNewGame: func.isRequired
};

export default Home;
