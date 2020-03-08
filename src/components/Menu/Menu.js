import React from 'react';
import { useAuth0 } from '../../hooks/useAuth0';
import Button from '../common/Button/Button';
import styles from './Menu.module.scss';

const Menu = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className={styles.landing}>
      <h1>Perkins Dungeon Master</h1>
      <div className={styles.menu}>
        {!isAuthenticated && (
          <Button
            text={'Sign In'}
            onClick={() => loginWithRedirect()}
          />
        )}
        {isAuthenticated && (
          <Button
            text={'Sign Out'}
            onClick={() => logout()}
          />
        )}
      </div>
    </div>
  );
};

export default Menu;
