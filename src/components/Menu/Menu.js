import React, { useState } from 'react';
import Button from '../common/Button/Button';
import styles from './Menu.module.scss';

const Menu = () => {
  const [showInputs, setShowInputs] = useState(true);

  return (
    <div className={styles.landing}>
      <h1>Welcome to Perkins Dungeon Master</h1>
      <div className={styles.menu}>
        <Button
          text={'Sign Up'}
        />
        <Button
          text={'Sign In'}
          onClick={() => setShowInputs(true)}
        />
        {showInputs &&
          <div className={styles.inputContainer}>
          </div>
        }
      </div>
    </div>
  );
};

export default Menu;
