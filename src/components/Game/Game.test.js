import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Game from './Game';

describe('Game Component', () => {
  let store, props;

  beforeEach(() => {
    store = configureStore([thunk])();

    props = {
      height: 500,
      connectClient: jest.fn(),
      loadGame: jest.fn(),
      loadCharacters: jest.fn(),
      triggerUpdate: jest.fn(),
      navTo: jest.fn()
    };
  });

  const render = () => shallow(
    <Provider store={store}>
      <Game {...props} />
    </Provider>
  );

  it('should render', () => {
    const component = render();
    expect(component).toBeTruthy();
  });
});
