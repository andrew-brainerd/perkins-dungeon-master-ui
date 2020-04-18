import { deriveCurrentCharacter } from './characters';

describe('Characters Selectors', () => {
  let state;

  beforeEach(() => {
    state = {
      characters: {
        gameCharacters: {
          items: [
            {
              _id: '12345',
              name: 'Test Character',
              playerId: '12345'
            },
            {
              _id: '23456',
              name: 'Test Character 2',
              playerId: '23456'
            }
          ]
        }
      },
      players: {
        currentPlayer: {
          _id: '12345',
          name: 'Test Player'
        }
      }
    };
  });

  it('should derive the current character', () => {
    const currentCharacter = deriveCurrentCharacter(state);

    const expectedResult = {
      _id: '12345',
      name: 'Test Character',
      playerId: '12345'
    };

    expect(currentCharacter).toEqual(expectedResult);
  });
});
