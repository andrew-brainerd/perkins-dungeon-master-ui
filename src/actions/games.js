import { omit } from 'ramda';
import { AUTH_USER } from 'gm-common';
import * as gameApi from '../api/games';
import { GAME_ROUTE, CHARACTER_CREATION_ROUTE, ROOT_ROUTE, GAME_SETUP_ROUTE } from '../constants/routes';
import { localCommands } from '../constants/games';
import { navTo } from './routing';
import { parseLocalInput } from '../utils/games';
import { getCurrentPlayerId } from '../selectors/players';

const PREFIX = 'GAME';

export const CREATING_GAME = `${PREFIX}/CREATING_GAME`;
export const STARTING_GAME = `${PREFIX}/STARTING_GAME`;
export const LOADING_GAMES = `${PREFIX}/LOADING_GAMES`;
export const GAMES_LOADED = `${PREFIX}/GAMES_LOADED`;
export const LOADING_GAME = `${PREFIX}/LOADING_GAME`;
export const GAME_LOADED = `${PREFIX}/GAME_LOADED`;
export const TRIGGER_UPDATE = `${PREFIX}/TRIGGER_UPDATE`;
export const ADD_LOCAL_MESSAGE = `${PREFIX}/ADD_LOCAL_MESSAGE`;
export const CREATING_CHARACTER = `${PREFIX}/CREATING_CHARACTER`;
export const CHARACTER_CREATED = `${PREFIX}/CHARACTER_CREATED`;
export const EXIT_GAME = `${PREFIX}/EXIT_GAME`;
export const SENDING_INVITE_EMAIL = `${PREFIX}/SENDING_INVITE_EMAIL`;
export const DELETING_GAME = `${PREFIX}/DELETING_GAME`;
export const LOADING_PLAYERS = `${PREFIX}/LOADING_PLAYERS`;
export const PLAYERS_LOADED = `${PREFIX}/PLAYERS_LOADED`;
export const ADDING_PLAYER = `${PREFIX}/ADDING_PLAYER`;
export const PLAYER_ADDED = `${PREFIX}/PLAYER_ADDED`;

export const creatingGame = { type: CREATING_GAME };
export const startingGame = { type: STARTING_GAME };
export const loadingGames = { type: LOADING_GAMES };
export const gamesLoaded = games => ({ type: GAMES_LOADED, games });
export const loadingGame = { type: LOADING_GAME };
export const gameLoaded = game => ({ type: GAME_LOADED, game });
export const triggerUpdate = { type: TRIGGER_UPDATE };
export const addLocalMessage = message => ({ type: ADD_LOCAL_MESSAGE, message });
export const creatingCharacter = { type: CREATING_CHARACTER };
export const characterCreated = character => ({ type: CHARACTER_CREATED, character });
export const loadingGamePlayers = { type: LOADING_PLAYERS };
export const gamePlayersLoaded = players => ({ type: PLAYERS_LOADED, players });
export const addingPlayer = { type: ADDING_PLAYER };
export const playerAdded = player => ({ type: PLAYER_ADDED, player });

export const createGame = name => async (dispatch, getState) => {
  const createdBy = getCurrentPlayerId(getState());

  dispatch(creatingGame);
  gameApi.createGame(name, createdBy).then(game => {
    dispatch(gameLoaded(game));
    dispatch(navTo(GAME_SETUP_ROUTE.replace(':gameId', game._id)));
  });
};

export const startGame = gameId => async dispatch => {
  dispatch(startingGame);
  dispatch(navTo(CHARACTER_CREATION_ROUTE.replace(':gameId', gameId)));
};

export const exitGame = () => async dispatch => {
  dispatch({ type: EXIT_GAME });
  dispatch(navTo(ROOT_ROUTE));
};

export const loadPlayerGames = playerId => async dispatch => {
  dispatch(loadingGames);
  gameApi.loadPlayerGames(playerId).then(({ items }) =>
    dispatch(gamesLoaded(items))
  );
};

export const loadGame = (gameId, shouldNavTo) => async dispatch => {
  dispatch(loadingGame);
  gameApi.loadGame(gameId).then(game => {
    dispatch(gameLoaded(game));
    dispatch(loadPlayers(gameId));
    shouldNavTo && dispatch(navTo(GAME_ROUTE.replace(':gameId', gameId)));
  });
};

export const addPlayerInput = input => async dispatch => {
  const { login, logout, gameId, message } = input || {};
  const config = omit(['login', 'logout'], input);

  if (localCommands.includes(message)) {
    const localResponse = parseLocalInput(input);

    dispatch(addLocalMessage(input));
    dispatch(addLocalMessage(localResponse));

    return 0;
  }

  return gameApi.processPlayerInput(gameId, config)
    .then(({ character, message }) => {
      if (character === AUTH_USER) {
        if (message === 'Signing In...') {
          login();
        } else if (message === 'Signing Out...') {
          logout();
        }
      }
    });
};

export const sendInvite = (gameId, playerName, email) => async dispatch => {
  dispatch({ type: SENDING_INVITE_EMAIL });
  gameApi.sendInvite(gameId, playerName, email);
};

export const deleteGame = gameId => async dispatch => {
  dispatch({ type: DELETING_GAME });
  gameApi.deleteGame(gameId);
};

export const loadPlayers = gameId => async dispatch => {
  dispatch(loadingGamePlayers);
  gameApi.getPlayers(gameId).then(players =>
    dispatch(gamePlayersLoaded(players))
  );
};

export const addPlayer = (gameId, player) => async dispatch => {
  dispatch(addingPlayer);
  gameApi.addPlayer(gameId, player).then(() =>
    dispatch(playerAdded)
  );
};
