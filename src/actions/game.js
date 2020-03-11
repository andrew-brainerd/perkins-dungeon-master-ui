import { navTo } from './routing';
import { GAME_ROUTE, MENU_ROUTE } from '../constants/routes';
import { getStatus, move } from '../api/index';

const PREFIX = 'GAME';

export const START_GAME = `${PREFIX}/START_GAME`;
export const END_GAME = `${PREFIX}/END_GAME`;
export const SELECT_CHARACTER = `${PREFIX}/SELECT_CHARACTER`;
export const UPDATE_STATUS = `${PREFIX}/UPDATE_STATUS`;
export const ADD_MESSAGE = `${PREFIX}/ADD_MESSAGE`;

export const startGame = { type: START_GAME };
export const endGame = { type: END_GAME };
export const updateStatus = status => ({ type: UPDATE_STATUS, status });
export const setSelectedCharacter = characterName => ({ type: SELECT_CHARACTER, characterName });
export const addMessage = message => ({ type: ADD_MESSAGE, message });

export const startNewGame = () => async dispatch => {
  dispatch(startGame);
  dispatch(navTo(GAME_ROUTE));
};

export const selectCharacter = characterName => async dispatch => {
  dispatch(setSelectedCharacter(characterName));
};

export const updateCharacterStatus = () => async (dispatch, getState) => {
  const state = getState();
  // Hack altert: nav back to menu if auth isn't done.
  if (!state.user.token || !state.game.characterName) {
    dispatch(navTo(MENU_ROUTE));
    return;
  }

  const status = await getStatus(state.user.token, state.game.characterName);
  dispatch(updateStatus(status));
};

export const processCommand = (input) => async (dispatch, getState) => {
  let parts = input.split(' ').filter(x => !['at', 'the'].includes(x.toLowerCase()));
  if (parts.length === 0) {
    return;
  }

  if (parts.length > 2) {
    parts = [parts[0], parts.slice(1).join(' ')];
  }

  const state = getState();

  const characterState = state.game.status;

  const objects = characterState.location.staticObjects;

  const addFeedbackMessage = message => dispatch(addMessage({ speaker: undefined, message }));

  const verb = parts[0].toLowerCase();
  if (verb === 'look' && parts.length === 1) {
    for (const connection of characterState.location.connections) {
      addFeedbackMessage(`To the ${connection.direction} is ${connection.name}`);
    }

    addFeedbackMessage('About you, you see:');
    if (objects.length === 0) {
      addFeedbackMessage('Nothing.');
    } else {
      for (const object of objects) {
        addFeedbackMessage(object.name);
      }
    }

    return;
  }

  if (['look', 'examine', 'open', 'read'].includes(verb) && parts.length === 2) {
    const objectName = parts[1];
    const matching = objects.filter(x => x.name === objectName || x.shortName === objectName);
    if (matching.length === 0) {
      addFeedbackMessage(`I don't know how to "${input}."`);
      return;
    }

    addFeedbackMessage(matching[0].description);
    return;
  }

  if (['go', 'move'].includes(verb) && parts.length === 2) {
    const direction = parts[1];
    const connections = characterState.location.connections.filter(x => x.direction === direction);
    if (connections.length === 0) {
      addFeedbackMessage(`The path ${direction} is blocked.`);
    }

    await move(state.user.token, state.game.characterName, direction);
    const status = await getStatus(state.user.token, state.game.characterName);
    dispatch(updateStatus(status));
  }
};
