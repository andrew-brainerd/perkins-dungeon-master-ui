import React, { useRef, useEffect } from 'react';
import { number, array } from 'prop-types';
import styles from './TextDisplay.module.scss';

const TextDisplay = ({ height, messages }) => {
  const textDisplayRef = useRef();

  useEffect(() => {
    const lastMessage = messages[messages.length];
    console.log('Last Message: %o', lastMessage);
    textDisplayRef.current.scrollTop = textDisplayRef.current.scrollHeight;
  }, [messages.length]);

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
  messages: array.isRequired
};

export default TextDisplay;
