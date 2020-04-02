import React, { useState } from 'react';
import { shape, string, func } from 'prop-types';
import { ROOT_ROUTE } from '../../constants/routes';
import TextInput from '../common/TextInput/TextInput';
import Button from '../common/Button/Button';
import styles from './NewGame.module.scss';

const NewGame = ({ player, startNewGame, navTo }) => {
  const [name, setName] = useState('');

  return (
    <div className={styles.newGame}>
      <h1>Create A New Game</h1>
      <TextInput
        autofocus
        className={styles.nameInput}
        placeholder={'Name'}
        value={name}
        onChange={setName}
        onPressEnter={() => startNewGame(name, player.email)}
      />
      <div className={styles.buttonContainer}>
        <Button
          className={styles.newGameButton}
          text={'Cancel'}
          onClick={() => navTo(ROOT_ROUTE)}
        />
        <Button
          className={styles.newGameButton}
          text={'Start'}
          onClick={() => startNewGame(name, player.email)}
          disabled={!name || !player}
        />
      </div>
    </div>
  );
};

NewGame.propTypes = {
  player: shape({
    email: string
  }),
  startNewGame: func.isRequired,
  navTo: func.isRequired
};

export default NewGame;
