import { compose, path, pathOr, prop } from 'ramda';
import { createSelector } from 'reselect';

export const getIsPlaying = path(['game', 'isPlaying']);

export const getCurrentGame = path(['game', 'currentGame']);

export const getCurrentGameId = compose(prop('_id'), getCurrentGame);

export const getCurrentGameName = compose(prop('name'), getCurrentGame);

export const getLocalMessages = pathOr([], ['game', 'localMessages']);

export const getGameMessages = pathOr([], ['game', 'currentGame', 'messages']);

export const getMessages = createSelector([getGameMessages, getLocalMessages],
  (gameMessages, localMessages) => {
    const allMessages = [...gameMessages, ...localMessages];
    const sortedMessages = allMessages.slice().sort((a, b) =>
      new Date(a.timestamp) - new Date(b.timestamp)
    );

    return sortedMessages;
  }
);

export const getShouldUpdateGame = path(['game', 'hasUpdates']);

export const getCurrentPlayerGames = pathOr([], ['game', 'currentPlayerGames']);

export const getGamePlayers = path(['game', 'players']);
