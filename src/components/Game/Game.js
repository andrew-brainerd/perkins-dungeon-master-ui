import React, { useState } from 'react';
import TextInput from '../common/TextInput/TextInput';
import styles from './Game.module.scss';
import { useAuth0 } from '../../hooks/useAuth0';
import { getStatus, move } from '../../api/index';

const Game = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [characterState, setCharacterState] = useState();
  const [initialized, setInitialized] = useState(false);
  const [locationHistory, setLocationHistory] = useState([]);
  const [moving, setMoving] = useState();

  const { user } = useAuth0();
  if (!user || !user.player) {
    return (<></>);
  }

  const token = user.player.token;
  const character = user.player.characters[0];

  let currentMessages = messages;
  const pushMessage = message => {
    currentMessages = [...currentMessages, message];
    setMessages(currentMessages);
  };

  const addUserInput = value =>
    value && pushMessage({ speaker: 'Me', message: value });

  const addSystemMessage = value =>
    value && pushMessage({ speaker: 'System', message: value });

  const addMessage = value =>
    value && pushMessage({ speaker: undefined, message: value });

  const pushLocation = location =>
    location && setLocationHistory([...locationHistory, location]);

  const updateState = async () => {
    const status = await getStatus(token, character.name);
    setCharacterState(status);
  };

  if (!characterState) {
    updateState();
    return (<></>);
  }

  if (!initialized) {
    setInitialized(true);
    addSystemMessage(`Joined instance as ${character.name}`);
  }

  const haveBeenTolocation = locationHistory.some(x => x._id === characterState.location._id);
  if (!haveBeenTolocation) {
    addMessage(characterState.location.fullDescription);
    pushLocation(characterState.location);
  } else if (moving === characterState.location._id) {
    setMoving(undefined);
    addMessage(`${characterState.location.shortDescription} (${characterState.location.name})`);
  }

  const moveCharacter = async (direction, location) => {
    setMoving(location);
    await move(token, character.name, direction);
    await updateState();
  };

  const handleInput = input => {
    let parts = input.split(' ').filter(x => !['at', 'the'].includes(x.toLowerCase()));
    if (parts.length === 0) {
      return;
    }

    if (parts.length > 2) {
      parts = [parts[0], parts.slice(1).join(' ')];
    }

    const objects = characterState.location.staticObjects;

    const verb = parts[0].toLowerCase();
    if (verb === 'look' && parts.length === 1) {
      for (const connection of characterState.location.connections) {
        addMessage(`To the ${connection.direction} is ${connection.name}`);
      }

      addMessage('About you, you see:');
      if (objects.length === 0) {
        addMessage('Nothing.');
      } else {
        for (const object of objects) {
          addMessage(object.name);
        }
      }

      return;
    }

    if (['look', 'examine', 'open', 'read'].includes(verb) && parts.length === 2) {
      const objectName = parts[1];
      const matching = objects.filter(x => x.name === objectName || x.shortName === objectName);
      if (matching.length === 0) {
        addMessage(`I don't know how to "${input}."`);
        return;
      }

      addMessage(matching[0].description);
      return;
    }

    if (['go', 'move'].includes(verb) && parts.length === 2) {
      const direction = parts[1];
      const connections = characterState.location.connections.filter(x => x.direction === direction);
      if (connections.length === 0) {
        addMessage(`The path ${direction} is blocked.`);
        return;
      }

      moveCharacter(direction, connections[0].node);
      return;
    }

    addUserInput(input);
  };

  return (
    <div className={styles.app}>
      <div className={styles.textDisplay}>
        {messages.map(({ speaker, message }, i) => (
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
            handleInput(userInput);
            setUserInput('');
          }}
        />
      </div>
    </div>
  );
};

export default Game;
