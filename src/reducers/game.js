import {
  STARTING_GAME,
  ENDING_GAME,
  LOADING_GAME,
  GAME_LOADED,
  APPEND_MESSAGE
} from '../actions/game';

const initialState = {
  isPlaying: false,
  isLoadingGame: false,
  currentGame: {},
  messages: []
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
    case APPEND_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          action.message
        ]
      }
    default:
      return state;
  }
};
