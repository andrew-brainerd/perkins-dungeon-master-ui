import * as playersApi from '../api/players';

const PREFIX = 'PLAYER';

export const LOADING_PLAYER = `${PREFIX}/LOADING_PLAYER`;
export const SET_CURRENT_PLAYER = `${PREFIX}/SET_CURRENT_PLAYER`;

export const setCurrentPlayer = player => async dispatch => {
  dispatch({ type: LOADING_PLAYER });
  playersApi.getPlayerByEmail(player.email).then(({ doesNotExist, ...playerData }) => {
    if (doesNotExist) {
      playersApi.createPlayer(player.name, player.email);
    }

    dispatch({ type: SET_CURRENT_PLAYER, player: { ...player, ...playerData } });
  });
};
