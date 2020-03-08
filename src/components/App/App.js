import React from 'react';
import { object } from 'prop-types';
import { Auth0Provider } from '../../hooks/useAuth0';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { MENU_ROUTE, GAME_ROUTE } from '../../constants/routes';
import Menu from '../Menu/Menu';
import Game from '../Game/Game';
import styles from './App.module.scss';

const App = ({ history }) => {
  const onRedirectCallback = appState => {
    history.push(
      appState && appState.targetUrl ? appState.targetUrl : window.location.pathname
    );
  };

  return (
    <div className={styles.app}>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        client_id={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
      >
        <ConnectedRouter history={history}>
          <Switch>
            <Route path={MENU_ROUTE} exact component={Menu} />
            <Route path={GAME_ROUTE} exact component={Game} />
          </Switch>
        </ConnectedRouter>
      </Auth0Provider>
    </div>
  );
};

App.propTypes = {
  history: object
};

export default App;
