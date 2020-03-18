import { omit } from 'ramda';
import * as gameApi from '../api/game';
import { navTo } from './routing';
import { GAME_ROUTE } from '../constants/routes';
import { AUTH_USER, GAME_MASTER, localCommands } from '../constants/game';

const PREFIX = 'GAME';

export const STARTING_GAME = `${PREFIX}/STARTING_GAME`;
export const LOADING_GAMES = `${PREFIX}/LOADING_GAMES`;
export const GAMES_LOADED = `${PREFIX}/GAMES_LOADED`;
export const LOADING_GAME = `${PREFIX}/LOADING_GAME`;
export const GAME_LOADED = `${PREFIX}/GAME_LOADED`;
export const TRIGGER_UPDATE = `${PREFIX}/TRIGGER_UPDATE`;
export const ADD_LOCAL_MESSAGE = `${PREFIX}/ADD_LOCAL_MESSAGE`;

export const startingGame = { type: STARTING_GAME };
export const loadingGames = { type: LOADING_GAMES };
export const gamesLoaded = games => ({ type: GAMES_LOADED, games });
export const loadingGame = { type: LOADING_GAME };
export const gameLoaded = game => ({ type: GAME_LOADED, game });
export const triggerUpdate = { type: TRIGGER_UPDATE };
export const addLocalMessage = message => ({ type: ADD_LOCAL_MESSAGE, message });

export const startNewGame = (name, createdBy) => async dispatch => {
  dispatch(startingGame);
  gameApi.createGame(name, createdBy).then(game => {
    dispatch(gameLoaded(game));
    dispatch(navTo(GAME_ROUTE.replace(':gameId', game._id)));
  });
};

export const loadUserGames = userEmail => async dispatch => {
  dispatch(loadingGames);
  gameApi.loadUserGames(userEmail).then(({ items }) =>
    dispatch(gamesLoaded(items))
  );
};

export const loadGame = gameId => async dispatch => {
  dispatch(loadingGame);
  gameApi.loadGame(gameId).then(game => {
    dispatch(gameLoaded(game));
    dispatch(navTo(GAME_ROUTE.replace(':gameId', gameId)));
  });
};

export const addUserInput = input => async dispatch => {
  const { login, logout, gameId, userName, message } = input || {};
  const config = omit(['login', 'logout'], input);

  if (localCommands.includes(message)) {
    console.log('Local Message: ', message);

    return dispatch(addLocalMessage(input));
  }

  return gameApi.processUserInput(gameId, config)
    .then(({ character, message }) => {
      if (character === AUTH_USER) {
        if (message === 'Signing In...') {
          login();
        } else if (message === 'Signing Out...') {
          logout();
        }
      } else if (character === GAME_MASTER) {
        if (message === 'Starting a new game...') {
          dispatch(startNewGame('Some New Game', userName));
        }
      }
    });
};
