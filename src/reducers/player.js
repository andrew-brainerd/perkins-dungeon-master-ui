import { SET_CURRENT_PLAYER } from '../actions/player';

const initialState = {
  currentPlayer: {}
};

const player = (state = initialState, action) => {
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

export default player;
