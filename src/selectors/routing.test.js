import { getGameId } from './routing';

describe('Routing Selectors', () => {
  let state;

  beforeEach(() => {
    state = {
      router: {
        location: {
          pathname: '/games/12345'
        }
      }
    };
  });

  it('should get the game ID from a pathname', () => {
    const gameId = getGameId(state);

    expect(gameId).toEqual('12345');
  });
});
