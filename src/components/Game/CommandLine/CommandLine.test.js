import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import CommandLine from './CommandLine';

describe('CommandLine Component', () => {
  let store, props;

  beforeEach(() => {
    store = configureStore([thunk])();

    props = {
      gameId: '12345',
      character: {},
      addPlayerInput: jest.fn()
    };
  });

  const render = () => shallow(
    <Provider store={store}>
      <CommandLine {...props} />
    </Provider>
  );

  it('should render', () => {
    const component = render();
    expect(component).toBeTruthy();
  });
});
