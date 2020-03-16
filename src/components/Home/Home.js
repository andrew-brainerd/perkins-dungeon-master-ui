import React, { useState } from 'react';
import { shape, string, func } from 'prop-types';
import { isEmpty } from 'ramda';
import Button from '../common/Button/Button';
import TextInput from '../common/TextInput/TextInput';
import styles from './Home.module.scss';

const Home = ({ user, startNewGame }) => {
  const [isNewGameOpen, setIsNewGameOpen] = useState(false);
  const [gameName, setGameName] = useState('');

  return (
    <div className={styles.home}>
      {!isEmpty(user) ? (
        <Button
          className={styles.gameButton}
          text={'New Game'}
          onClick={() => {
            console.log('Start new game');
            setIsNewGameOpen(true);
          }}
        />
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
