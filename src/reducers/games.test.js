import {
  startingGame,
  loadingGames,
  gamesLoaded,
  loadingGame,
  gameLoaded,
  triggerUpdate,
  addLocalMessage,
  playersLoaded,
  EXIT_GAME,
  SENDING_INVITE_EMAIL,
  DELETING_GAME,
  LOADING_PLAYERS
} from '../actions/games';
import reducer, { initialState as defaultState } from './games';

describe('Games Reducer', () => {
  it('should return the default state', () => {
    const action = { type: 'NONEXISTENT' };

    const newState = reducer(undefined, action);

    expect(newState).toEqual(defaultState);
  });

  it('should return the provided state', () => {
    const initialState = {};

    const action = { type: 'NONEXISTENT' };

    const newState = reducer(initialState, action);

    expect(newState).toEqual({});
  });

  describe('STARTING_GAME', () => {
    it('should set isPlaying to true and empty local messages', () => {
      const initialState = {
        isPlaying: false,
        localMessages: [
          {
            characterName: 'Test Character',
            message: 'Test Message'
          }
        ]
      };

      const expectedState = {
        isPlaying: true,
        localMessages: []
      };

      const newState = reducer(initialState, startingGame);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('LOADING_GAMES', () => {
    it('should set isLoadingGames to true and currentPlayerGames to null', () => {
      const initialState = {
        isLoadingGames: false,
        currentPlayerGames: [
          {
            _id: '12345',
            name: 'Test Game'
          }
        ]
      };

      const expectedState = {
        isLoadingGames: true,
        currentPlayerGames: null
      };

      const newState = reducer(initialState, loadingGames);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('GAMES_LOADED', () => {
    it('should set isLoadingGames to false and currentPlayerGames to provided object', () => {
      const initialState = {
        isLoadingGames: true,
        currentPlayerGames: null
      };

      const playerGames = [
        {
          _id: '12345',
          name: 'Test Game'
        }
      ];

      const expectedState = {
        isLoadingGames: false,
        currentPlayerGames: playerGames
      };

      const action = gamesLoaded(playerGames);

      const newState = reducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('LOADING_GAME', () => {
    it('should set isLoadingGame to true', () => {
      const initialState = {
        isLoadingGame: false
      };

      const expectedState = {
        isLoadingGame: true
      };

      const newState = reducer(initialState, loadingGame);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('GAME_LOADED', () => {
    it('should set the initial game state', () => {
      const initialState = {
        isLoadingGame: true,
        isPlaying: false,
        currentGame: null,
        hasUpdates: true
      };

      const game = {
        _id: '12345',
        name: 'Test Game'
      };

      const expectedState = {
        isLoadingGame: false,
        isPlaying: true,
        currentGame: game,
        hasUpdates: false
      };

      const action = gameLoaded(game);

      const newState = reducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('TRIGGER_UPDATE', () => {
    it('should set hasUpdates to true', () => {
      const initialState = {
        hasUpdates: false
      };

      const expectedState = {
        hasUpdates: true
      };

      const newState = reducer(initialState, triggerUpdate);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('ADD_LOCAL_MESSAGE', () => {
    it('should append given message to localMessages', () => {
      const initialState = {
        localMessages: [
          {
            characterName: 'Test Character',
            message: 'help'
          }
        ]
      };

      const newMessage = {
        characterName: 'Game Master',
        message: 'Hello there'
      };

      const expectedState = {
        localMessages: [
          {
            characterName: 'Test Character',
            message: 'help'
          },
          newMessage
        ]
      };

      const action = addLocalMessage(newMessage);

      const newState = reducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('EXIT_GAME', () => {
    it('should reset the game state', async () => {
      const initialState = {
        isPlaying: true,
        currentGame: {
          _id: '12345',
          name: 'Test Game'
        },
        localMessages: [
          {
            characterName: 'Test Character',
            message: 'help'
          }
        ],
        players: {
          0: {
            _id: '12345',
            name: 'Test Player'
          }
        }
      };

      const expectedState = {
        isPlaying: false,
        currentGame: {},
        localMessages: [],
        players: {}
      };

      const action = ({ type: EXIT_GAME });

      const newState = reducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('SENDING_INVITE_EMAIL', () => {
    it('should set isSendingEmail to true', () => {
      const initialState = {
        isSendingEmail: false
      };

      const expectedState = {
        isSendingEmail: true
      };

      const action = { type: SENDING_INVITE_EMAIL };

      const newState = reducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('DELETING_GAME', () => {
    it('should set isDeletingGame to true', () => {
      const initialState = {
        isDeletingGame: false
      };

      const expectedState = {
        isDeletingGame: true
      };

      const action = { type: DELETING_GAME };

      const newState = reducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('LOADING_PLAYERS', () => {
    it('should set isLoadingPlayers to true', () => {
      const initialState = {
        isLoadingPlayers: false
      };

      const expectedState = {
        isLoadingPlayers: true
      };

      const action = { type: LOADING_PLAYERS };

      const newState = reducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('PLAYERS_LOADED', () => {
    it('should set isLoadingPlayers to false and player to provided object', () => {
      const initialState = {
        isLoadingPlayers: true,
        players: {}
      };

      const players = {
        0: {
          _id: '12345',
          name: 'Test Player'
        }
      };

      const expectedState = {
        isLoadingPlayers: false,
        players
      };

      const action = playersLoaded(players);

      const newState = reducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });
});
