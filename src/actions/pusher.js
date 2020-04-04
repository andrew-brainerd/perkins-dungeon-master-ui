import { getChannel } from '../utils/pusher';
import { triggerUpdate } from './game';

const PREFIX = 'PUSHER';

export const CONNECTING_CLIENT = `${PREFIX}/CONNECTING_CLIENT`;
export const SET_IS_CONNECTED = `${PREFIX}/SET_IS_CONNECTED`;

export const setIsConnected = isConnected => ({ type: SET_IS_CONNECTED, isConnected });

export const connectClient = (channel, event) => async dispatch => {
  console.log('%cConnecting to Pusher channel %s', 'color: cyan', channel, event);
  getChannel(channel).bind(event, () => {
    dispatch(triggerUpdate);
  });
  dispatch(setIsConnected(true));
};
