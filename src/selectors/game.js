import { path } from 'ramda';

export const getIsPlaying = path(['game', 'isPlaying']);

export const getCurrentGameId = path(['game', 'currentGameId']);
