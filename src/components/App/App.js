import React from 'react';
import { object } from 'prop-types';
import { Auth0Provider } from '../../hooks/useAuth0';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import {
  ROOT_ROUTE,
  GAME_SETUP_ROUTE,
  CHARACTER_CREATION_ROUTE,
  GAME_ROUTE
} from '../../constants/routes';
import Header from '../Header/container';
import Home from '../Home/container';
import NewGame from '../NewGame/container';
import NewCharacter from '../NewCharacter/container';
import Game from '../Game/container';
import styles from './App.module.scss';

const App = ({ history }) => (
  <div className={styles.app}>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      client_id={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirect_uri={window.location.origin}
      onRedirectCallback={appState =>
        history.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname)
      }>
      <ConnectedRouter history={history}>
        <Header />
        <Switch>
          <Route path={ROOT_ROUTE} exact component={Home} />
          <Route path={GAME_SETUP_ROUTE} exact component={NewGame} />
          <Route path={CHARACTER_CREATION_ROUTE} exact component={NewCharacter} />
          <Route path={GAME_ROUTE} exact component={Game} />
        </Switch>
      </ConnectedRouter>
    </Auth0Provider>
  </div>
);

App.propTypes = {
  history: object
};

export default App;
