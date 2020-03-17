import {
  STARTING_GAME,
  LOADING_GAMES,
  GAMES_LOADED,
  LOADING_GAME,
  GAME_LOADED,
  TRIGGER_UPDATE
} from '../actions/game';

const initialState = {
  isPlaying: false,
  isLoadingGame: false,
  currentGame: {},
  currentUserGames: [],
  hasUpdates: false
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case STARTING_GAME:
      return {
        ...state,
        isPlaying: true
      };
    case LOADING_GAMES:
      return {
        ...state,
        isLoadingGames: true,
        currentUserGames: null
      };
    case GAMES_LOADED:
      return {
        ...state,
        isLoadingGames: false,
        currentUserGames: action.games
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
