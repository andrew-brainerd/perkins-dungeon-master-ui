import React, { useState, useEffect } from 'react';
import { bool, func } from 'prop-types';
import { useAuth0 } from '../../hooks/useAuth0';
import Button from '../common/Button/Button';
import styles from './Header.module.scss';

const Header = ({ shouldSignIn, shouldSignOut, startGame }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout, loading, user } = useAuth0();

  useEffect(() => {
    !isAuthenticated && shouldSignIn && !loading && loginWithRedirect();
  }, [isAuthenticated, shouldSignIn, loading, loginWithRedirect]);

  useEffect(() => {
    isAuthenticated && shouldSignOut && logout();
  }, [isAuthenticated, shouldSignOut, logout]);

  return (
    <>
      <div className={styles.header}>
        <div
          className={styles.menuIcon}
          onClick={() => isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)}
        >
          |||
        </div>
        <div className={styles.user}>{(user || {}).name}</div>
      </div>
      {isMenuOpen &&
        <div className={styles.headerMenu}>
          {!isAuthenticated && (
            <Button
              className={styles.menuButton}
              text={loading ? 'Loading...' : 'Sign In'}
              onClick={() => !loading && loginWithRedirect()}
            />
          )}
          {isAuthenticated && (
            <>
              <Button
                className={styles.menuButton}
                text={'New Game'}
                onClick={() => { setIsMenuOpen(false); startGame(); }}
              />
              <Button
                className={styles.menuButton}
                text={'Sign Out'}
                onClick={() => logout()}
              />
            </>
          )}
        </div>
      }
    </>
  );
};

Header.propTypes = {
  shouldSignIn: bool,
  shouldSignOut: bool,
  startGame: func.isRequired
};

export default Header;
