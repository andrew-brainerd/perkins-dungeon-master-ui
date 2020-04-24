import { SET_CURRENT_PLAYER, LOADING_PLAYER } from '../actions/players';

export const initialState = {
  currentPlayer: {},
  isLoadingPlayer: false
};

const players = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_PLAYER:
      return {
        ...state,
        isLoadingPlayer: false,
        currentPlayer: action.player
      };
    case LOADING_PLAYER:
      return {
        ...state,
        isLoadingPlayer: true
      };
    default:
      return state;
  }
};

export default players;
