import React, { useState } from 'react';
import TextInput from '../common/TextInput/TextInput';
import styles from './Game.module.scss';
import { array, func } from 'prop-types';

const Game = ({ sessionMessages, updateCharacterStatus, processCommand }) => {
  const [userInput, setUserInput] = useState('');

  updateCharacterStatus();

  const addUserInput = value => {
    processCommand(value);
  };

  return (
    <div className={styles.game}>
      <div className={styles.textDisplay}>
        {sessionMessages.map(({ speaker, message }, i) => (
          <div key={i} className={styles.messageItem}>
            { speaker && <div className={styles.speaker}>{speaker}: </div> }
            <div className={styles.message}>{message}</div>
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
            addUserInput(userInput);
            setUserInput('');
          }}
        />
      </div>
    </div>
  );
};

Game.propTypes = {
  sessionMessages: array.isRequired,
  updateCharacterStatus: func.isRequired,
  processCommand: func.isRequired
};

export default Game;
