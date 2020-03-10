// src/react-auth0-spa.js
import React, { useState, useEffect, useContext } from 'react';
import { node, func } from 'prop-types';
import createAuth0Client from '@auth0/auth0-spa-js';
import { login } from '../api/index.js';

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);

export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0Client = await createAuth0Client(initOptions);
      setAuth0(auth0Client);

      if (window.location.search.includes('code=') &&
        window.location.search.includes('state=')) {
        const { appState } = await auth0Client.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0Client.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const auth0User = await auth0Client.getUser();
        const perkinsUser = await login(auth0User.email, auth0User.sub);

        const user = { ...auth0User, player: perkinsUser };

        setUser(user);
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }

    const auth0User = await auth0Client.getUser();
    const perkinsUser = await login(auth0User.email, auth0User.sub);

    const user = { ...auth0User, player: perkinsUser };

    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();

    const auth0User = await auth0Client.getUser();
    const perkinsUser = await login(auth0User.email, auth0User.sub);

    const user = { ...auth0User, player: perkinsUser };

    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p)
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

Auth0Provider.propTypes = {
  children: node,
  onRedirectCallback: func
};
