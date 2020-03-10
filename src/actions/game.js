import * as gameApi from '../api/game';
import { navTo } from './routing';
import { GAME_ROUTE } from '../constants/routes';

const PREFIX = 'GAME';

export const STARTING_GAME = `${PREFIX}/STARTING_GAME`;
export const ENDING_GAME = `${PREFIX}/ENDING_GAME`;
export const LOADING_GAME = `${PREFIX}/LOADING_GAME`;
export const GAME_LOADED = `${PREFIX}/GAME_LOADED`;

export const startingGame = { type: STARTING_GAME };
export const endingGame = { type: ENDING_GAME };
export const loadingGame = { type: LOADING_GAME };
export const gameLoaded = game => ({ type: GAME_LOADED, game });

export const startNewGame = name => async dispatch => {
  dispatch(startingGame);
  gameApi.createGame(name).then(game => {
    dispatch(gameLoaded(game));
    dispatch(navTo(GAME_ROUTE));
  });
};
