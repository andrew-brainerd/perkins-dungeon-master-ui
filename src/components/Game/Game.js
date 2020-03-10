import React, { useState } from 'react';
import { array, func } from 'prop-types';
import TextInput from '../common/TextInput/TextInput';
import styles from './Game.module.scss';

const Game = ({ messages, addUserInput }) => {
  const [userInput, setUserInput] = useState('');

  return (
    <div className={styles.game}>
      <div className={styles.textDisplay}>
        {messages.map(({ character, message, component }, i) => (
          <div key={i} className={styles.messageItem}>
            {character && <div className={styles.character}>{character}: </div>}
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
          value={userInput}
          onChange={setUserInput}
          onPressEnter={() => {
            addUserInput({ character: 'User', message: userInput });
            setUserInput('');
          }}
        />
      </div>
    </div>
  );
};

Game.propTypes = {
  messages: array,
  addUserInput: func.isRequired
};

export default Game;
