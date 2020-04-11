import { compose, path, pathOr, prop } from 'ramda';
import { createSelector } from 'reselect';

export const getIsPlaying = path(['games', 'isPlaying']);

export const getCurrentGame = path(['games', 'currentGame']);

export const getCurrentGameId = compose(prop('_id'), getCurrentGame);

export const getCurrentGameName = compose(prop('name'), getCurrentGame);

export const getLocalMessages = pathOr([], ['games', 'localMessages']);

export const getGameMessages = pathOr([], ['games', 'currentGame', 'messages']);

export const getMessages = createSelector([getGameMessages, getLocalMessages],
  (gameMessages, localMessages) => {
    const allMessages = [...gameMessages, ...localMessages];
    const sortedMessages = allMessages.slice().sort((a, b) =>
      new Date(a.timestamp) - new Date(b.timestamp)
    );

    return sortedMessages;
  }
);

export const getShouldUpdateGame = path(['games', 'hasUpdates']);

export const getCurrentPlayerGames = pathOr([], ['games', 'currentPlayerGames']);

export const getGamePlayers = path(['games', 'players']);
