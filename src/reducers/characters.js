import {
  CREATING_CHARACTER,
  LOADING_CHARACTER,
  CHARACTER_LOADED
} from '../actions/characters';

const initialState = {
  isLoadingCharacter: false,
  currentCharacter: {},
  playerCharacters: []
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case CREATING_CHARACTER:
      return {
        ...state,
        isCreatingCharacter: true
      };
    case LOADING_CHARACTER:
      return {
        ...state,
        isLoadingCharacter: true
      };
    case CHARACTER_LOADED:
      return {
        ...state,
        isLoadingCharacter: false,
        currentCharacter: action.character
      };
    default:
      return state;
  }
};

export default game;
