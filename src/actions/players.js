import * as playersApi from '../api/players';

const PREFIX = 'PLAYER';

export const LOADING_PLAYER = `${PREFIX}/LOADING_PLAYER`;
export const LOADING_PLAYER_FAILED = `${PREFIX}/LOADING_PLAYER_FAILED`;
export const SET_CURRENT_PLAYER = `${PREFIX}/SET_CURRENT_PLAYER`;
export const LOADING_PLAYERS = `${PREFIX}/LOADING_PLAYERS`;
export const PLAYERS_LOADED = `${PREFIX}/PLAYERS_LOADED`;

export const loadingPlayer = { type: LOADING_PLAYER };
export const loadingPlayerFailed = err => ({ type: LOADING_PLAYER_FAILED, err });
export const loadingPlayers = { type: LOADING_PLAYERS };
export const playersLoaded = players => ({ type: PLAYERS_LOADED, players });

export const setCurrentPlayer = player => async dispatch => {
  dispatch(loadingPlayer);
  playersApi.getPlayerByEmail(player.email)
    .then(({ doesNotExist, ...playerData }) => {
      if (doesNotExist) {
        playersApi.createPlayer(player.name, player.email);
      }

      dispatch({ type: SET_CURRENT_PLAYER, player: { ...player, ...playerData } });
    })
    .catch(err => dispatch(loadingPlayerFailed(err)));
};
