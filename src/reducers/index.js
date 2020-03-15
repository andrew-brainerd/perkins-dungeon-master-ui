import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import game from './game';
import pusher from './pusher';
import user from './user';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  game,
  pusher,
  user
});

export default rootReducer;
