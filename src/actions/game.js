import { navTo } from './routing';
import { GAME_ROUTE } from '../constants/routes';

const PREFIX = 'GAME';

export const START_GAME = `${PREFIX}/START_GAME`;
export const END_GAME = `${PREFIX}/END_GAME`;

export const startGame = { type: START_GAME };
export const endGame = { type: END_GAME };

export const startNewGame = () => async dispatch => {
  dispatch(startGame);
  dispatch(navTo(GAME_ROUTE));
};

