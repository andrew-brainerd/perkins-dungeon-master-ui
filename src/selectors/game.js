import { path, pathOr } from 'ramda';

export const getIsPlaying = path(['game', 'isPlaying']);

export const getCurrentGameId = path(['game', 'currentGameId']);

export const getMessages = pathOr([], ['game', 'messages']);

export const getGameLogs = pathOr([], ['game', 'currentGame', 'logs']);

export const getShouldUpdateGame = path(['game', 'hasUpdates']);
