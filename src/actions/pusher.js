import * as pusher from '../api/pusher';
import { getChannel } from '../utils/pusher';
import { UPDATE_GAME } from '../constants/game';
import { triggerUpdate } from './game';

const PREFIX = 'PUSHER';

export const CONNECTING_CLIENT = `${PREFIX}/CONNECTING_CLIENT`;
export const UPDATING_CLIENTS = `${PREFIX}/UPDATING_CLIENTS`;
export const SET_SYNCING = `${PREFIX}/SET_SYNCING`;

export const setSyncing = isSyncing => ({ type: SET_SYNCING, isSyncing });

export const connectClient = channelId => async dispatch => {
  console.log('%cConnecting to Pusher channel %s...', 'color: cyan', channelId);
  getChannel(channelId).bind(UPDATE_GAME, messages => {
    messages && console.log('%cMessages: %o', 'color: orange', messages);
    dispatch(triggerUpdate);
  });
  dispatch(setSyncing(true));
};
