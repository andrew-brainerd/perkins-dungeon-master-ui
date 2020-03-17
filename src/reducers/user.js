import { SET_CURRENT_USER } from '../actions/user';

const initialState = {
  currentUser: {}
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.user
      };
    default:
      return state;
  }
};

export default user;
