import { CONNECTING_CLIENT, SET_IS_CONNECTED } from '../actions/pusher';

export const initialState = {
  isConnected: false
};

const pusher = (state = initialState, action) => {
  switch (action.type) {
    case CONNECTING_CLIENT:
      return {
        ...state,
        isConnecting: true
      };
    case SET_IS_CONNECTED:
      return {
        ...state,
        isConnecting: false,
        isConnected: action.isConnected
      };
    default:
      return state;
  }
};

export default pusher;
