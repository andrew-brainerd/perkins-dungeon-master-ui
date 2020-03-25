import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import characters from './characters';
import game from './game';
import pusher from './pusher';
import player from './player';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  characters,
  game,
  pusher,
  player
});

export default rootReducer;
