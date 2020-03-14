import * as gameApi from '../api/game';
import { navTo } from './routing';
import { GAME_ROUTE } from '../constants/routes';
import { AUTH_USER, GAME_MASTER } from '../constants/game';
import { getCurrentGameId } from '../selectors/game';
import { isDefined } from '../utils/validation';

const PREFIX = 'GAME';

export const STARTING_GAME = `${PREFIX}/STARTING_GAME`;
export const LOADING_GAME = `${PREFIX}/LOADING_GAME`;
export const GAME_LOADED = `${PREFIX}/GAME_LOADED`;
export const TRIGGER_UPDATE = `${PREFIX}/TRIGGER_UPDATE`;

export const startingGame = { type: STARTING_GAME };
export const loadingGame = { type: LOADING_GAME };
export const gameLoaded = game => ({ type: GAME_LOADED, game });
export const triggerUpdate = { type: TRIGGER_UPDATE };

export const startNewGame = (name, createdBy) => async dispatch => {
  dispatch(startingGame);
  gameApi.createGame(name, createdBy).then(game => {
    dispatch(gameLoaded(game));
    dispatch(navTo(GAME_ROUTE.replace(':gameId', game._id)));
  });
};

export const loadGame = gameId => async dispatch => {
  dispatch(loadingGame);
  gameApi.loadGame(gameId).then(game => {
    dispatch(gameLoaded(game));
    dispatch(navTo(GAME_ROUTE.replace(':gameId', gameId)));
  });
};

export const addUserInput = input => async dispatch => {
  const { login, logout, gameId, userName } = input || {};

  return gameApi.processUserInput(gameId, input)
    .then(response => {
      if (response.character === AUTH_USER) {
        if (response.message === 'Signing In...') {
          login();
        } else if (response.message === 'Signing Out...') {
          logout();
        }
      } else if (response.character === GAME_MASTER) {
        if (response.message === 'Starting a new game...') {
          dispatch(startNewGame('Some New Game', userName));
        }
      }
    });
};
