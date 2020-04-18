import * as charactersApi from '../api/characters';
import { GAME_ROUTE } from '../constants/routes';
import { navTo } from './routing';
import { getCurrentPlayerId } from '../selectors/players';
import { getPathname } from '../selectors/routing';
import { deriveCurrentCharacter } from '../selectors/characters';

const PREFIX = 'GAME';

export const CREATING_CHARACTER = `${PREFIX}/CREATING_CHARACTER`;
export const CREATING_CHARACTER_FAILED = `${PREFIX}/LOADING_CHARACTER_FAILED`;
export const LOADING_CHARACTERS = `${PREFIX}/LOADING_CHARACTERS`;
export const CHARACTERS_LOADED = `${PREFIX}/CHARACTERS_LOADED`;
export const LOADING_CHARACTERS_FAILED = `${PREFIX}/LOADING_CHARACTERS_FAILED`;
export const SET_CURRENT_CHARACTER = `${PREFIX}/SET_CURRENT_CHARACTER`;

export const creatingCharacter = { type: CREATING_CHARACTER };
export const creatingCharacterFailed = err => ({ type: CREATING_CHARACTER_FAILED, err });
export const loadingCharacters = { type: LOADING_CHARACTERS };
export const loadingCharactersFailed = err => ({ type: LOADING_CHARACTERS_FAILED, err });

export const createCharacter = character => async (dispatch, getState) => {
  dispatch(creatingCharacter);

  try {
    const playerId = getCurrentPlayerId(getState());
    const newCharacter = { ...character, playerId };

    await charactersApi.createCharacter(newCharacter);

    dispatch(setCurrentCharacter(newCharacter));
    dispatch(navTo(GAME_ROUTE.replace(':gameId', character.gameId)));
  } catch (err) {
    dispatch(creatingCharacterFailed(err));
  }
};

export const setCurrentCharacter = () => async (dispatch, getState) => {
  const currentCharacter = deriveCurrentCharacter(getState());
  dispatch({ type: SET_CURRENT_CHARACTER, currentCharacter });
};

export const charactersLoaded = characters => async dispatch => {
  dispatch({ type: CHARACTERS_LOADED, characters });
  dispatch(setCurrentCharacter());
};

export const loadCharacters = gameId => async (dispatch, getState) => {
  const currentPath = getPathname(getState());
  const gameRoute = GAME_ROUTE.replace(':gameId', gameId);

  dispatch(loadingCharacters);
  try {
    const characters = await charactersApi.loadCharacters(gameId);
    dispatch(charactersLoaded(characters));
    currentPath !== gameRoute && dispatch(navTo(GAME_ROUTE.replace(':gameId', gameId)));
  } catch (err) {
    dispatch(loadingCharactersFailed(err));
  }
};

