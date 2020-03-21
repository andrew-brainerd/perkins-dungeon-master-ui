import React, { useState } from 'react';
import { func } from 'prop-types';
import TextInput from '../common/TextInput/TextInput';
import Button from '../common/Button/Button';
import styles from './NewCharacter.module.scss';

const NewCharacter = ({ gameId, createCharacter }) => {
  const [name, setName] = useState('');

  return (
    <div className={styles.newCharacter}>
      <div className={styles.characterInput}>
        <div className={styles.label}>Character Name</div>
        <TextInput
          autofocus
          inputClassName={styles.textInput}
          placeholder={'BoJack Horseman'}
          value={name}
          onChange={setName}
        />
      </div>
      <Button
        className={styles.submit}
        text={'Create'}
        onClick={() => createCharacter({ name, gameId })}
        disabled={!name}
      />
    </div>
  );
};

NewCharacter.propTypes = {
  createCharacter: func.isRequired
};

export default NewCharacter;
