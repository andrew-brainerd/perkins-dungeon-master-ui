import { deriveMessages } from './games';

describe('Games Selectors', () => {
  let state;

  beforeEach(() => {
    state = {
      games: {
        currentGame: {
          messages: [
            {
              _id: '12345',
              characterName: 'Test Character',
              message: 'Hello',
              timestamp: '2020-04-02T12:37:44.954Z'
            },
            {
              _id: '23456',
              characterName: 'Game Master',
              message: 'Hello there',
              timestamp: '2020-04-02T14:37:44.954Z'
            }
          ]
        },
        localMessages: [
          {
            _id: '12345',
            characterName: 'Test Character',
            message: 'help',
            timestamp: '2020-04-02T13:37:44.954Z'
          },
          {
            _id: '12345',
            characterName: 'Test Character',
            message: 'signOut',
            timestamp: '2020-04-02T15:37:44.954Z'
          }
        ]
      }
    };
  });

  it('should derive the game messages', () => {
    const messages = deriveMessages(state);

    const expectedResult = [
      {
        _id: '12345',
        characterName: 'Test Character',
        message: 'Hello',
        timestamp: '2020-04-02T12:37:44.954Z'
      },
      {
        _id: '12345',
        characterName: 'Test Character',
        message: 'help',
        timestamp: '2020-04-02T13:37:44.954Z'
      },
      {
        _id: '23456',
        characterName: 'Game Master',
        message: 'Hello there',
        timestamp: '2020-04-02T14:37:44.954Z'
      },
      {
        _id: '12345',
        characterName: 'Test Character',
        message: 'signOut',
        timestamp: '2020-04-02T15:37:44.954Z'
      }
    ];

    expect(messages).toEqual(expectedResult);
  });
});
