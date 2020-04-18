import { getChannel } from '../utils/pusher';

const PREFIX = 'PUSHER';

export const CONNECTING_CLIENT = `${PREFIX}/CONNECTING_CLIENT`;
export const SET_IS_CONNECTED = `${PREFIX}/SET_IS_CONNECTED`;

export const setIsConnected = isConnected => ({ type: SET_IS_CONNECTED, isConnected });

export const connectClient = (channel, event, action) => async dispatch => {
  getChannel(channel).bind(event, action);
  dispatch(setIsConnected(true));
};
