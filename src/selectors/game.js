import { path, pathOr } from 'ramda';

export const getIsPlaying = path(['game', 'isPlaying']);

export const getCurrentGameId = path(['game', 'currentGameId']);

export const getMessages = pathOr([], ['game', 'messages']);
