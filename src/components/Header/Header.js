import React, { useState } from 'react';
import { shape, string } from 'prop-types';
import { useAuth0 } from '../../hooks/useAuth0';
import Button from '../common/Button/Button';
import styles from './Header.module.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout, loading, user } = useAuth0();

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
            <Button
              className={styles.menuButton}
              text={'Sign Out'}
              onClick={() => logout()}
            />
          )}
        </div>
      }
    </>
  );
};

Header.propTypes = {
  user: shape({
    given_name: string,
    family_name: string,
    nickname: string,
    name: string,
    picture: string,
    email: string
  })
};

export default Header;
