import * as charactersApi from '../api/characters';
import { GAME_ROUTE } from '../constants/routes';
import { navTo } from './routing';
import { getCurrentPlayerId } from '../selectors/player';
import { getPathname } from '../selectors/routing';

const PREFIX = 'GAME';

export const CREATING_CHARACTER = `${PREFIX}/CREATING_CHARACTER`;
export const CREATING_CHARACTER_FAILED = `${PREFIX}/LOADING_CHARACTER_FAILED`;
export const LOADING_CHARACTERS = `${PREFIX}/LOADING_CHARACTERS`;
export const CHARACTERS_LOADED = `${PREFIX}/CHARACTERS_LOADED`;
export const LOADING_CHARACTERS_FAILED = `${PREFIX}/LOADING_CHARACTERS_FAILED`;

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

    dispatch(navTo(GAME_ROUTE.replace(':gameId', character.gameId)));
  } catch (err) {
    dispatch(creatingCharacterFailed(err));
  }
};

export const charactersLoaded = characters => async (dispatch, getState) => {
  const playerId = getCurrentPlayerId(getState());
  const currentCharacter = (characters || {}).items.find(character => character.playerId === playerId);

  dispatch({ type: CHARACTERS_LOADED, characters, currentCharacter });
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

