import {
  STARTING_GAME,
  ENDING_GAME,
  LOADING_GAME,
  GAME_LOADED,
  APPEND_MESSAGE,
  APPEND_MESSAGES
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
        currentGameId: action.game._id,
        currentGame: action.game
      };
    case APPEND_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          action.message
        ]
      };
    case APPEND_MESSAGES:
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.messages
        ]
      };
    default:
      return state;
  }
};
