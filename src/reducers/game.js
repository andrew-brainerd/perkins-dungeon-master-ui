import { START_GAME, END_GAME } from '../actions/game';

const initialState = {
  isPlaying: false
};

export default function game (state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        isPlaying: true
      };
    case END_GAME:
      return {
        ...state,
        isPlaying: false
      };
    default:
      return state;
  }
};
