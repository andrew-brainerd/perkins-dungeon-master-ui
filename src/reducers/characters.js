import {
  CREATING_CHARACTER,
  LOADING_CHARACTERS,
  CHARACTERS_LOADED
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
    case LOADING_CHARACTERS:
      return {
        ...state,
        isLoadingCharacter: true
      };
    case CHARACTERS_LOADED:
      return {
        ...state,
        isLoadingCharacter: false,
        gameCharacters: action.characters,
        currentCharacter: action.character
      };
    default:
      return state;
  }
};

export default game;
