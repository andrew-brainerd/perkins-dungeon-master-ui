import React, { useState, useEffect, useRef } from 'react';
import { bool, func } from 'prop-types';
import { useAuth0 } from '../../hooks/useAuth0';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import Button from '../common/Button/Button';
import styles from './Header.module.scss';

const Header = ({ isPlaying, shouldSignIn, shouldSignOut, setCurrentPlayer, exitGame }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout, loading, user } = useAuth0();
  const menuRef = useRef();

  useEffect(() => {
    !isAuthenticated && shouldSignIn && !loading && loginWithRedirect();
  }, [isAuthenticated, shouldSignIn, loading, loginWithRedirect]);

  useEffect(() => {
    isAuthenticated && shouldSignOut && logout();
  }, [isAuthenticated, shouldSignOut, logout]);

  useEffect(() => {
    user && setCurrentPlayer(user);
  }, [user, setCurrentPlayer]);

  useOnClickOutside(menuRef, () => setIsMenuOpen(false));

  return (
    <>
      <div className={styles.header}>
        <div
          className={styles.menuIcon}
          onClick={() => isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)}
        >
          |||
        </div>
        <div className={styles.player}>{(user || {}).name}</div>
      </div>
      {isMenuOpen &&
        <div className={styles.headerMenu} ref={menuRef}>
          {!isAuthenticated && (
            <Button
              className={styles.menuButton}
              text={loading ? 'Loading...' : 'Sign In'}
              onClick={() => !loading && loginWithRedirect()}
            />
          )}
          {isAuthenticated && (
            <>
              {isPlaying && (
                <Button
                  className={styles.menuButton}
                  text={'Exit Game'}
                  onClick={() => {
                    setIsMenuOpen(false);
                    exitGame();
                  }}
                />
              )}
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
  isPlaying: bool,
  shouldSignIn: bool,
  shouldSignOut: bool,
  setCurrentPlayer: func.isRequired,
  startGame: func.isRequired,
  exitGame: func.isRequired
};

export default Header;
