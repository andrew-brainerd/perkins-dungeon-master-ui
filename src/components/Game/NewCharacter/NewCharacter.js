import React, { useState } from 'react';
import { func } from 'prop-types';
import styles from './NewCharacter.module.scss';
import TextInput from '../../common/TextInput/TextInput';

const NewCharacter = ({ createCharacter }) => {
  const [name, setName] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className={styles.newCharacter}>
      {currentStep === 0 &&
        <>
          <div className={styles.label}>Name:</div>
          <div className={styles.input}>
            <TextInput
              autofocus
              className={styles.characterInput}
              inputClassName={styles.textInput}
              value={name}
              onChange={setName}
              onPressEnter={() => {
                createCharacter(name);
                setCurrentStep(-1);
              }}
            />
          </div>
        </>
      }
      {currentStep === -1 &&
        <div className={styles.creationComplete}>
          {`Created new character ${name}`}
        </div>
      }
    </div>
  );
};

NewCharacter.propTypes = {
  createCharacter: func.isRequired
};

export default NewCharacter;
