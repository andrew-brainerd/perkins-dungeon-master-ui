const PREFIX = 'USER';

export const SET_TOKEN = `${PREFIX}/SET_TOKEN`;

export const setToken = token => ({ type: SET_TOKEN, token });

export const updateToken = token => async dispatch => {
  dispatch(setToken(token));
};
