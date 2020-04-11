import {
  CHARACTERS_LOADED,
  SET_CURRENT_CHARACTER,
  creatingCharacter,
  loadingCharacters
} from '../actions/characters';
import reducer from './characters';

describe('Games Reducer', () => {
  it('should return the default state', () => {
    const initialState = {};
    const action = { type: 'NONEXISTENT' };
    const newState = reducer(initialState, action);

    expect(typeof newState).toEqual('object');
  });

  describe('CREATING_CHARACTER', () => {
    it('should set isCreatingCharacter to true', () => {
      const initialState = {
        isCreatingCharacter: false
      };

      const expectedState = {
        isCreatingCharacter: true
      };

      const newState = reducer(initialState, creatingCharacter);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('LOADING_CHARACTERS', () => {
    it('should set isLoadingCharacters to true', () => {
      const initialState = {
        isLoadingCharacters: false
      };

      const expectedState = {
        isLoadingCharacters: true
      };

      const newState = reducer(initialState, loadingCharacters);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('CHARACTERS_LOADED', () => {
    it('should set gameCharacters to given characters object', () => {
      const initialState = {
        gameCharacters: null
      };

      const characters = {
        0: {
          _id: '12345',
          name: 'Test Character'
        }
      };

      const expectedState = {
        gameCharacters: characters
      };

      const action = { type: CHARACTERS_LOADED, characters };

      const newState = reducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('SET_CURRENT_CHARACTER', () => {
    it('should set currentCharacter to given character object', () => {
      const initialState = {
        isCreatingCharacter: true,
        isLoadingCharacters: true,
        currentCharacter: null
      };

      const currentCharacter = {
        _id: '12345',
        name: 'Test Character'
      };

      const expectedState = {
        isCreatingCharacter: false,
        isLoadingCharacters: false,
        currentCharacter
      };

      const action = { type: SET_CURRENT_CHARACTER, currentCharacter };

      const newState = reducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });
});
