import * as gameApi from '../api/game';
import { navTo } from './routing';
import { GAME_ROUTE } from '../constants/routes';
import { AUTH_USER } from '../constants/game';

const PREFIX = 'GAME';

export const STARTING_GAME = `${PREFIX}/STARTING_GAME`;
export const ENDING_GAME = `${PREFIX}/ENDING_GAME`;
export const LOADING_GAME = `${PREFIX}/LOADING_GAME`;
export const GAME_LOADED = `${PREFIX}/GAME_LOADED`;
export const APPEND_MESSAGE = `${PREFIX}/APPEND_MESSAGE`;
export const APPEND_MESSAGES = `${PREFIX}/APPEND_MESSAGES`;

export const startingGame = { type: STARTING_GAME };
export const endingGame = { type: ENDING_GAME };
export const loadingGame = { type: LOADING_GAME };
export const gameLoaded = game => ({ type: GAME_LOADED, game });
export const appendMessage = message => ({ type: APPEND_MESSAGE, message });
export const appendMessages = messages => ({ type: APPEND_MESSAGES, messages });

export const startNewGame = name => async dispatch => {
  dispatch(startingGame);
  gameApi.createGame(name).then(game => {
    dispatch(gameLoaded(game));
    dispatch(navTo(GAME_ROUTE));
  });
};

export const addUserInput = input => async dispatch => {
  dispatch(appendMessage(input));
  gameApi.processUserInput(input).then(response => {
    if (response.character === AUTH_USER) {
      if (response.message === 'Signing In...') {
        input.login();
      } else if (response.message === 'Signing Out...') {
        input.logout();
      }
    }

    dispatch(appendMessage(response));
  });
};

export const addServerMessages = messages => async dispatch => {
  const serverMessages = Object.values(messages);
  dispatch(appendMessages(serverMessages));
};
