const PREFIX = 'USER';

export const SET_CURRENT_USER = `${PREFIX}/SET_CURRENT_USER`;

export const setCurrentUser = user => ({ type: SET_CURRENT_USER, user });
