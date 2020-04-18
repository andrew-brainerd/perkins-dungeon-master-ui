import { CONNECTING_CLIENT, setIsConnected } from '../actions/pusher';
import reducer, { initialState as defaultState } from './pusher';

describe('Pusher Reducer', () => {
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

  describe('CONNECTING_CLIENT', () => {
    it('should set isConnecting to true', () => {
      const initialState = {
        isConnecting: false
      };

      const expectedState = {
        isConnecting: true
      };

      const action = { type: CONNECTING_CLIENT };

      const newState = reducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('SET_IS_CONNECTED', () => {
    it('should set isConnected to given boolean', () => {
      const initialState = {
        isConnecting: true,
        isConnected: false
      };

      const expectedState = {
        isConnecting: false,
        isConnected: true
      };

      const action = setIsConnected(true);

      const newState = reducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });
});
