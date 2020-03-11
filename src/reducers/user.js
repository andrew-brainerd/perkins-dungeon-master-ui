import { SET_TOKEN } from '../actions/user';

const initialState = {
  token: undefined
};

export default function user (state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token
      };
    default:
      return state;
  }
};
