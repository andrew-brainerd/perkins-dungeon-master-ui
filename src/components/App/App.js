import React from 'react';
import { object } from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { MENU_ROUTE, GAME_ROUTE } from '../../constants/routes';
import Menu from '../Menu/Menu';
import Game from '../Game/Game';
import styles from './App.module.scss';

const App = ({ history }) => {
  return (
    <div className={styles.app}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path={MENU_ROUTE} exact component={Menu} />
          <Route path={GAME_ROUTE} exact component={Game} />
        </Switch>
      </ConnectedRouter>
    </div>
  );
};

App.propTypes = {
  history: object
};

export default App;
