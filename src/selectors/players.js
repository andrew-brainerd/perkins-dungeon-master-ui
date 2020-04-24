import { compose, path, prop } from 'ramda';

export const getCurrentPlayer = path(['players', 'currentPlayer']);

export const getCurrentPlayerId = compose(prop('_id'), getCurrentPlayer);

export const getIsLoadingPlayer = path(['players', 'isLoadingPlayer']);
