import React, { useState } from 'react';
import { string, func } from 'prop-types';
import { CHARACTER_CLASSES, CHARACTER_RACES } from '../../constants/game';
import TextInput from '../common/TextInput/TextInput';
import Button from '../common/Button/Button';
import Dropdown from '../common/Dropdown/Dropdown';
import styles from './NewCharacter.module.scss';

const characterClassOptions = [
  {
    name: '-- Not Selected --',
    value: ''
  },
  ...CHARACTER_CLASSES
];

const characterRaceOptions = [
  {
    name: '-- Not Selected --',
    value: ''
  },
  ...CHARACTER_RACES
];

const NewCharacter = ({ gameId, createCharacter }) => {
  const [characterName, setCharacterName] = useState('');
  const [characterClass, setCharacterClass] = useState(characterClassOptions[0].value);
  const [characterRace, setCharacterRace] = useState(characterRaceOptions[0].value);

  return (
    <div className={styles.newCharacter}>
      <div className={styles.characterInput}>
        <div className={styles.label}>Character Name</div>
        <TextInput
          autofocus
          inputClassName={styles.textInput}
          placeholder={'BoJack Horseman'}
          value={characterName}
          onChange={setCharacterName}
        />
      </div>
      <div className={styles.characterInput}>
        <div className={styles.label}>Character Class</div>
        <Dropdown
          className={styles.classDropdown}
          options={characterClassOptions}
          displayKey={'name'}
          valueKey={'value'}
          selectedOption={characterClass}
          onOptionSelected={option => setCharacterClass(option)}
        />
      </div>
      <div className={styles.characterInput}>
        <div className={styles.label}>Character Race</div>
        <Dropdown
          className={styles.raceDropdown}
          options={characterRaceOptions}
          displayKey={'name'}
          valueKey={'value'}
          selectedOption={characterRace}
          onOptionSelected={option => setCharacterRace(option)}
        />
      </div>
      <Button
        className={styles.submit}
        text={'Create'}
        onClick={() => createCharacter({
          name: characterName,
          class: characterClass,
          race: characterRace,
          gameId
        })}
        disabled={!characterName || !characterClass || !characterRace}
      />
    </div>
  );
};

NewCharacter.propTypes = {
  gameId: string,
  createCharacter: func.isRequired
};

export default NewCharacter;
