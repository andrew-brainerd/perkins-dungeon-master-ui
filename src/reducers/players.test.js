import { SET_CURRENT_PLAYER } from '../actions/players';
import reducer, { initialState as defaultState } from './players';

describe('Players Reducer', () => {
  it('should return the default state', () => {
    const action = { type: 'NONEXISTENT' };

    const newState = reducer(undefined, action);

    expect(newState).toEqual(defaultState);
  });

  it('should return the provided state', () => {
    const initialState = {};

    const action = { type: 'NONEXISTENT' };

    const newState = reducer(initialState, action);

    expect(newState).toEqual({});
  });

  describe('SET_CURRENT_PLAYER', () => {
    it('should set isLoadingPlayer to false and currentPlayer to given object', () => {
      const initialState = {
        isLoadingPlayer: true,
        currentPlayer: {}
      };

      const player = {
        _id: '12345',
        name: 'Test Player'
      };

      const expectedState = {
        isLoadingPlayer: false,
        currentPlayer: player
      };

      const action = { type: SET_CURRENT_PLAYER, player };

      const newState = reducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });
});
