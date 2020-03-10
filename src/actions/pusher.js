import * as pusher from '../api/pusher';
import { getChannel } from '../utils/pusher';
import { NOW_PLAYING } from '../constants/pods';
import { getCurrentGameId } from '../selectors/game';
import { nowPlayingLoaded } from '../actions/spotify';

const PREFIX = 'PUSHER';

export const CONNECTING_CLIENT = `${PREFIX}/CONNECTING_CLIENT`;
export const UPDATING_CLIENTS = `${PREFIX}/UPDATING_CLIENTS`;
export const SET_SYNCING = `${PREFIX}/SET_SYNCING`;

export const setSyncing = isSyncing => ({ type: SET_SYNCING, isSyncing });

export const connectToUpdates = channelId => async dispatch => {
  console.log('%cConnecting to Pusher channel...', 'color: cyan');
  getChannel(channelId).bind(NOW_PLAYING, track => {
    track && track.item && console.log('%cNow Playing: %o', 'color: orange', track.item.name);
    dispatch(nowPlayingLoaded(track));
  });
  dispatch(setSyncing(true));
};

export const connectClient = gameId => async dispatch => {
  dispatch(connectToUpdates(gameId));
};

export const updateClients = (game = {}) => async (dispatch, getState) => {
  dispatch({ type: UPDATING_CLIENTS });
  const gameId = getCurrentGameId(getState());
  pusher.updateClients(gameId, game);
};
