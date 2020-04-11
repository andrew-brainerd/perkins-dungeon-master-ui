import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import characters from './characters';
import games from './games';
import pusher from './pusher';
import players from './players';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  characters,
  games,
  pusher,
  players
});

export default rootReducer;
