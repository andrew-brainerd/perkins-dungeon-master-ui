import React, { useState } from 'react';
import { string, func } from 'prop-types';
import { characters } from 'gm-common';
import TextInput from '../common/TextInput/TextInput';
import Button from '../common/Button/Button';
import Dropdown from '../common/Dropdown/Dropdown';
import styles from './NewCharacter.module.scss';

const characterClassOptions = [
  {
    name: '-- Not Selected --',
    value: ''
  },
  ...characters.classes
];

const characterRaceOptions = [
  {
    name: '-- Not Selected --',
    value: ''
  },
  ...characters.races
];

const characterOrderOptions = [
  {
    name: '-- Not Selected --',
    value: ''
  },
  ...characters.alignments.orders
];

const characterMoralityOptions = [
  {
    name: '-- Not Selected --',
    value: ''
  },
  ...characters.alignments.morality
];

const NewCharacter = ({ gameId, createCharacter }) => {
  const [characterName, setCharacterName] = useState('');
  const [characterClass, setCharacterClass] = useState(characterClassOptions[0].value);
  const [characterRace, setCharacterRace] = useState(characterRaceOptions[0].value);
  const [characterOrder, setCharacterOrder] = useState(characterOrderOptions[0].value);
  const [characterMorality, setCharacterMorality] = useState(characterMoralityOptions[0].value);

  return (
    <div className={styles.newCharacter}>
      <h2 name={'characterCreation'}>Character Creation</h2>
      <div className={styles.characterInput}>
        <div className={styles.label}>Character Name</div>
        <TextInput
          autofocus
          name={'characterName'}
          inputClassName={styles.textInput}
          placeholder={'BoJack Horseman'}
          value={characterName}
          onChange={setCharacterName}
        />
      </div>
      <div className={styles.characterInput}>
        <div className={styles.label}>Character Class</div>
        <Dropdown
          name={'characterClass'}
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
          name={'characterRace'}
          className={styles.raceDropdown}
          options={characterRaceOptions}
          displayKey={'name'}
          valueKey={'value'}
          selectedOption={characterRace}
          onOptionSelected={option => setCharacterRace(option)}
        />
      </div>
      <div className={styles.characterInput}>
        <div className={styles.label}>Order</div>
        <Dropdown
          name={'characterOrder'}
          className={styles.orderDropdown}
          options={characterOrderOptions}
          displayKey={'name'}
          valueKey={'value'}
          selectedOption={characterOrder}
          onOptionSelected={option => setCharacterOrder(option)}
        />
        <div className={styles.label}>Morality</div>
        <Dropdown
          name={'characterMorality'}
          className={styles.moralityDropdown}
          options={characterMoralityOptions}
          displayKey={'name'}
          valueKey={'value'}
          selectedOption={characterMorality}
          onOptionSelected={option => setCharacterMorality(option)}
        />
      </div>
      <Button
        name={'createCharacter'}
        className={styles.submit}
        text={'Create'}
        onClick={() => createCharacter({
          name: characterName,
          class: characterClass,
          race: characterRace,
          order: characterOrder,
          morality: characterMorality,
          gameId
        })}
        disabled={!characterName ||
          !characterClass ||
          !characterRace ||
          !characterOrder ||
          !characterMorality
        }
      />
    </div>
  );
};

NewCharacter.propTypes = {
  gameId: string,
  createCharacter: func.isRequired
};

export default NewCharacter;
