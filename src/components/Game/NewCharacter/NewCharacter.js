import React, { useState } from 'react';
import { func } from 'prop-types';
import styles from './NewCharacter.module.scss';
import TextInput from '../../common/TextInput/TextInput';

const NewCharacter = ({ createCharacter }) => {
  const [name, setName] = useState('');

  return (
    <div className={styles.newCharacter}>
      <div className={styles.label}>Name:</div>
      <div className={styles.input}>
        <TextInput
          autofocus
          className={styles.characterInput}
          inputClassName={styles.textInput}
          value={name}
          onChange={setName}
          onPressEnter={() =>
            createCharacter(name)
          }
        />
      </div>
    </div>
  );
};

NewCharacter.propTypes = {
  createCharacter: func.isRequired
};

export default NewCharacter;
