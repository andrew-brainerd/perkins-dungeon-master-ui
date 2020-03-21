import * as charactersApi from '../api/characters';
import { GAME_ROUTE } from '../constants/routes';
import { navTo } from './routing';
import { getCurrentGameId } from '../selectors/game';
import { getCurrentPlayerId } from '../selectors/player';

const PREFIX = 'GAME';

export const CREATING_CHARACTER = `${PREFIX}/CREATING_CHARACTER`;
export const LOADING_CHARACTER = `${PREFIX}/LOADING_CHARACTER`;
export const CHARACTER_LOADED = `${PREFIX}/CHARACTER_CREATED`;

export const creatingCharacter = { type: CREATING_CHARACTER };
export const loadingCharacter = { type: LOADING_CHARACTER };
export const characterLoaded = character => ({ type: CHARACTER_LOADED, character });

export const createCharacter = character => async (dispatch, getState) => {
  const createdBy = getCurrentPlayerId(getState());

  const newCharacter = { ...character, createdBy };

  dispatch(creatingCharacter);
  charactersApi.createCharacter(newCharacter).then(newCharacter => {
    dispatch(characterLoaded(newCharacter));
    dispatch(navTo(GAME_ROUTE.replace(':gameId', character.gameId)));
  });
};

export const loadCharacter = characterId => async (dispatch, getState) => {
  const gameId = getCurrentGameId(getState());

  dispatch(loadingCharacter);
  charactersApi.loadCharacter(gameId, characterId).then(character => {
    dispatch(characterLoaded(character));
    dispatch(navTo(GAME_ROUTE.replace(':gameId', gameId)));
  });
};
