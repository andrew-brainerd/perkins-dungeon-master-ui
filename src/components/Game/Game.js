import React, { useState } from 'react';
import TextInput from '../common/TextInput/TextInput';
import styles from './Game.module.scss';

const demoMessages = [
  {
    speaker: 'Dungeon Master',
    message: 'You are in the well-lit living room of a large house'
  },
  {
    speaker: 'Drogon',
    message: 'Some shit a dragon would say'
  },
  {
    speaker: 'Bilbo Baggins',
    message: 'Time for 2nd Breakfast!'
  },
  {
    speaker: 'Cookie Monster',
    message: 'Cooooooo-kieeeeeee'
  }
];

const Game = () => {
  const [userInput, setUserInput] = useState('');
  const [userText, setUserText] = useState([]);

  const addUserInput = value =>
    value && setUserText([...userText, { speaker: 'Me', message: value }]);

  const messages = [...demoMessages, ...userText];

  return (
    <div className={styles.app}>
      <div className={styles.textDisplay}>
        {messages.map(({ speaker, message }, i) => (
          <div key={i} className={styles.messageItem}>
            <div className={styles.speaker}>{speaker}: </div>
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

export default Game;
