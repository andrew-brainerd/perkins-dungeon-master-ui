import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import game from './game';
import pusher from './pusher';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  game,
  pusher
});

export default rootReducer;
