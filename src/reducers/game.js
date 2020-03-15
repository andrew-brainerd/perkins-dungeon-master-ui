import {
  STARTING_GAME,
  LOADING_GAME,
  GAME_LOADED,
  TRIGGER_UPDATE
} from '../actions/game';

const initialState = {
  isPlaying: false,
  isLoadingGame: false,
  currentGame: {},
  hasUpdates: false
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case STARTING_GAME:
      return {
        ...state,
        isPlaying: true
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
        isPlaying: true,
        currentGameId: action.game._id,
        currentGame: action.game,
        hasUpdates: false
      };
    case TRIGGER_UPDATE:
      return {
        ...state,
        hasUpdates: true
      };
    default:
      return state;
  }
};

export default game;
