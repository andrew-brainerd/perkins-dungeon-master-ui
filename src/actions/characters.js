import * as charactersApi from '../api/characters';
import { GAME_ROUTE } from '../constants/routes';
import { navTo } from './routing';
import { getCurrentGameId } from '../selectors/game';
import { getCurrentPlayerId } from '../selectors/player';

const PREFIX = 'GAME';

export const CREATING_CHARACTER = `${PREFIX}/CREATING_CHARACTER`;
export const CREATING_CHARACTER_FAILED = `${PREFIX}/LOADING_CHARACTER_FAILED`;
export const LOADING_CHARACTER = `${PREFIX}/LOADING_CHARACTER`;
export const CHARACTER_LOADED = `${PREFIX}/CHARACTER_CREATED`;
export const LOADING_CHARACTER_FAILED = `${PREFIX}/LOADING_CHARACTER_FAILED`;

export const creatingCharacter = { type: CREATING_CHARACTER };
export const creatingCharacterFailed = err => ({ type: CREATING_CHARACTER_FAILED, err });
export const loadingCharacter = { type: LOADING_CHARACTER };
export const characterLoaded = character => ({ type: CHARACTER_LOADED, character });
export const loadingCharacterFailed = err => ({ type: LOADING_CHARACTER_FAILED, err });

export const createCharacter = character => async (dispatch, getState) => {
  dispatch(creatingCharacter);

  try {
    const playerId = getCurrentPlayerId(getState());
    const newCharacter = { ...character, playerId };
    const createdCharacter = await charactersApi.createCharacter(newCharacter);

    dispatch(characterLoaded(createdCharacter));
    dispatch(navTo(GAME_ROUTE.replace(':gameId', character.gameId)));
  } catch (err) {
    dispatch(creatingCharacterFailed(err));
  }
};

export const loadCharacter = characterId => async (dispatch, getState) => {
  const gameId = getCurrentGameId(getState());

  dispatch(loadingCharacter);
  try {
    const character = charactersApi.loadCharacter(gameId, characterId);
    dispatch(characterLoaded(character));
    dispatch(navTo(GAME_ROUTE.replace(':gameId', gameId)));
  } catch (err) {
    dispatch(loadingCharacterFailed(err));
  }
};
