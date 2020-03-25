import { path, pathOr } from 'ramda';
import { createSelector } from 'reselect';

export const getIsPlaying = path(['game', 'isPlaying']);

export const getCurrentGameId = path(['game', 'currentGame', '_id']);

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
