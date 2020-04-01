import {
  CREATING_CHARACTER,
  LOADING_CHARACTERS,
  CHARACTERS_LOADED
} from '../actions/characters';

const initialState = {
  isLoadingCharacters: false,
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
        isLoadingCharacters: true
      };
    case CHARACTERS_LOADED:
      return {
        ...state,
        isLoadingCharacter: false,
        gameCharacters: action.characters,
        currentCharacter: action.character
      };
    case SET_CURRENT_CHARACTER:
      return {
        ...state,
        isLoadingCharacters: false,
        currentCharacter: action.currentCharacter
      };
    default:
      return state;
  }
};

export default game;
