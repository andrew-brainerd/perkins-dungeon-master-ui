import {
  CREATING_CHARACTER,
  LOADING_CHARACTERS,
  CHARACTERS_LOADED,
  SET_CURRENT_CHARACTER
} from '../actions/characters';

const initialState = {
  isLoadingCharacter: false,
  currentCharacter: {},
  gameCharacters: {}
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case CREATING_CHARACTER:
      return {
        ...state,
        isCreatingCharacter: true
      };
    case LOADING_CHARACTERS:
      return {
        ...state,
        isLoadingCharacter: true
      };
    case CHARACTERS_LOADED:
      return {
        ...state,
        isLoadingCharacter: false,
        gameCharacters: action.characters
      };
    case SET_CURRENT_CHARACTER:
      return {
        ...state,
        currentCharacter: action.currentCharacter
      };
    default:
      return state;
  }
};

export default game;
