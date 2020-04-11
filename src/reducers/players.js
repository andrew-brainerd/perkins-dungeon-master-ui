import { SET_CURRENT_PLAYER } from '../actions/players';

export const initialState = {
  currentPlayer: {}
};

const players = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_PLAYER:
      return {
        ...state,
        currentPlayer: action.player
      };
    default:
      return state;
  }
};

export default players;
