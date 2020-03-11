import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import game from './game';
import user from './user';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  game,
  user
});

export default rootReducer;
