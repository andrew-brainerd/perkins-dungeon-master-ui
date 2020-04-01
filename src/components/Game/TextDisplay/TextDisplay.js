import React, { useRef, useEffect } from 'react';
import { number, array, string } from 'prop-types';
import styles from './TextDisplay.module.scss';

const TextDisplay = ({ height, messages, characterId }) => {
  const textDisplayRef = useRef();

  useEffect(() => {
    const lastUserMessage = messages[messages.length - 2];
    lastUserMessage && console.log('Last User Message: %o', lastUserMessage);

    if (lastUserMessage && characterId && lastUserMessage.characterId === characterId) {
      console.log('Current character added new message');
      textDisplayRef.current.scrollTop = textDisplayRef.current.scrollHeight;
    }
  }, [messages, characterId]);

  return (
    <div className={styles.textDisplay} ref={textDisplayRef} style={{ height }}>
      {messages.map(({ character, message, component, color }, i) => (
        <div key={i} className={styles.messageItem}>
          {character &&
            <div className={styles.character} style={{ color }}>{character}: </div>
          }
          <div
            className={styles.message}
            dangerouslySetInnerHTML={{ __html: message }}
          />
          {component}
        </div>
      ))}
    </div>
  );
};

TextDisplay.propTypes = {
  height: number.isRequired,
  messages: array.isRequired,
  characterId: string
};

export default TextDisplay;
