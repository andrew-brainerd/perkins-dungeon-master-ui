import {
  STARTING_GAME,
  LOADING_GAMES,
  GAMES_LOADED,
  LOADING_GAME,
  GAME_LOADED,
  TRIGGER_UPDATE,
  ADD_LOCAL_MESSAGE,
  EXIT_GAME,
  SENDING_INVITE_EMAIL,
  DELETING_GAME,
  LOADING_PLAYERS,
  PLAYERS_LOADED
} from '../actions/games';

const initialState = {
  isPlaying: false,
  isLoadingGame: false,
  currentGame: {},
  currentPlayerGames: [],
  localMessages: [],
  hasUpdates: false,
  players: {}
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case STARTING_GAME:
      return {
        ...state,
        isPlaying: true,
        localMessages: []
      };
    case LOADING_GAMES:
      return {
        ...state,
        isLoadingGames: true,
        currentPlayerGames: null
      };
    case GAMES_LOADED:
      return {
        ...state,
        isLoadingGames: false,
        currentPlayerGames: action.games
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
        currentGame: action.game,
        hasUpdates: false
      };
    case TRIGGER_UPDATE:
      return {
        ...state,
        hasUpdates: true
      };
    case ADD_LOCAL_MESSAGE:
      return {
        ...state,
        localMessages: [
          ...state.localMessages,
          action.message
        ]
      };
    case EXIT_GAME:
      return {
        ...state,
        isPlaying: false,
        currentGame: {},
        localMessages: [],
        players: {}
      };
    case SENDING_INVITE_EMAIL:
      return {
        ...state,
        isSendingEmail: true
      };
    case DELETING_GAME:
      return {
        ...state,
        isDeletingGame: true
      };
    case LOADING_PLAYERS:
      return {
        ...state,
        isLoadingPlayers: true
      };
    case PLAYERS_LOADED:
      return {
        ...state,
        isLoadingPlayers: false,
        players: action.players
      };
    default:
      return state;
  }
};

export default game;
