import {
  STARTING_GAME,
  ENDING_GAME,
  LOADING_GAME,
  GAME_LOADED
} from '../actions/game';

const initialState = {
  isPlaying: false,
  isLoadingGame: false,
  currentGame: {}
};

export default function game (state = initialState, action) {
  switch (action.type) {
    case STARTING_GAME:
      return {
        ...state,
        isPlaying: true
      };
    case ENDING_GAME:
      return {
        ...state,
        isPlaying: false
      };
    case LOADING_GAME:
      return {
        ...state,
        isLoadingGame: true
      };
    case GAME_LOADED:
      return {
        ...state,
        isLoadingGame: false,
        currentGame: action.game
      };
    default:
      return state;
  }
};
