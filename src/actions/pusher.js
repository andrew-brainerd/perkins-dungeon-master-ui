import { getChannel } from '../utils/pusher';
import { syncing } from 'gm-common';
import { triggerUpdate } from './game';

const PREFIX = 'PUSHER';

export const CONNECTING_CLIENT = `${PREFIX}/CONNECTING_CLIENT`;
export const SET_IS_CONNECTED = `${PREFIX}/SET_IS_CONNECTED`;

export const setIsConnected = isConnected => ({ type: SET_IS_CONNECTED, isConnected });

export const connectClient = channelId => async dispatch => {
  console.log('%cConnecting to Pusher channel %s', 'color: cyan', channelId);
  getChannel(channelId).bind(syncing.UPDATE_GAME, gameUpdate => {
    dispatch(triggerUpdate);
  });
  dispatch(setIsConnected(true));
};
