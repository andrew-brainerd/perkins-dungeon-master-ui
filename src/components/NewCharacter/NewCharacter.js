import React, { useState } from 'react';
import { string, func } from 'prop-types';
import { characters, characterProperties } from 'gm-common';
import TextInput from '../common/TextInput/TextInput';
import Button from '../common/Button/Button';
import Dropdown from '../common/Dropdown/Dropdown';
import PlusMinuser from '../common/PlusMinuser/PlusMinuser';
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
  const [characterRoll] = useState(characterProperties.rollCharacter());
  const [strength, setStrength] = useState(characterRoll.scores[0]);
  const [dexterity, setDexterity] = useState(characterRoll.scores[1]);
  const [constitution, setConstitution] = useState(characterRoll.scores[2]);
  const [intelligence, setIntelligence] = useState(characterRoll.scores[3]);
  const [wisdom, setWisdom] = useState(characterRoll.scores[4]);
  const [charisma, setCharisma] = useState(characterRoll.scores[5]);

  const remainingAbilityPoints =
    characterRoll.total - (strength + dexterity + constitution + intelligence + wisdom + charisma);
  const canIncrementAbilities = remainingAbilityPoints > 0;

  return (
    <div className={styles.newCharacter}>
      <h2 name={'characterCreation'}>Character Creation</h2>
      <div className={[styles.characterInput, styles.column1].join(' ')}>
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
      <div className={[styles.characterInput, styles.column1].join(' ')}>
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
      <div className={[styles.characterInput, styles.column1].join(' ')}>
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
      <div className={[styles.characterInput, styles.column1].join(' ')}>
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
      </div>
      <div className={[styles.characterInput, styles.column1].join(' ')}>
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
      <div className={styles.abilitiesContainer}>
        <PlusMinuser
          label='Strength'
          initialValue={strength}
          min={characterRoll.min}
          max={characterRoll.max}
          canIncrement={canIncrementAbilities}
          onChange={setStrength}
        />
        <PlusMinuser
          label='Dexterity'
          initialValue={dexterity}
          min={characterRoll.min}
          max={characterRoll.max}
          canIncrement={canIncrementAbilities}
          onChange={setDexterity}
        />
        <PlusMinuser
          label='Constitution'
          initialValue={constitution}
          min={characterRoll.min}
          max={characterRoll.max}
          canIncrement={canIncrementAbilities}
          onChange={setConstitution}
        />
        <PlusMinuser
          label='Intelligence'
          initialValue={intelligence}
          min={characterRoll.min}
          max={characterRoll.max}
          canIncrement={canIncrementAbilities}
          onChange={setIntelligence}
        />
        <PlusMinuser
          label='Wisdom'
          initialValue={wisdom}
          min={characterRoll.min}
          max={characterRoll.max}
          canIncrement={canIncrementAbilities}
          onChange={setWisdom}
        />
        <PlusMinuser
          label='Charisma'
          initialValue={charisma}
          min={characterRoll.min}
          max={characterRoll.max}
          canIncrement={canIncrementAbilities}
          onChange={setCharisma}
        />
      </div>
      <div className={styles.abilitiesMetadata}>
        Minimum: {characterRoll.min}
        &nbsp; Maximum: {characterRoll.max}
        &nbsp; Total: {characterRoll.total}
        &nbsp; Remaining: {remainingAbilityPoints}
      </div>
      <Button
        name={'createCharacter'}
        className={[styles.submit, styles.column1].join(' ')}
        text={'Create'}
        onClick={() => createCharacter({
          name: characterName,
          class: characterClass,
          race: characterRace,
          order: characterOrder,
          morality: characterMorality,
          abilityScores: {
            strength,
            dexterity,
            constitution,
            intelligence,
            wisdom,
            charisma
          },
          gameId
        })}
        disabled={!characterName ||
          !characterClass ||
          !characterRace ||
          !characterOrder ||
          !characterMorality ||
          remainingAbilityPoints > 0
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
