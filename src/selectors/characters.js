import { compose, path, prop } from 'ramda';
import { createSelector } from 'reselect';
import { getCurrentPlayerId } from './players';

export const getGameCharacters = path(['characters', 'gameCharacters', 'items']);

export const deriveCurrentCharacter = createSelector(
  [getGameCharacters, getCurrentPlayerId], (gameCharacters, playerId) =>
    (gameCharacters || []).find(character => character.playerId === playerId)
);

export const getCurrentCharacter = path(['characters', 'currentCharacter']);

export const getCurrentCharacterId = compose(prop('_id'), getCurrentCharacter);

export const getIsLoadingCharacters = path(['characters', 'isLoadingCharacters']);
