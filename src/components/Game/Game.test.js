import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { history } from '../../store/configureStore';
import { Provider } from 'react-redux';
import Game from './Game';

describe('Game Component', () => {
  let store;

  beforeEach(() => {
    store = configureStore([thunk])();
  });

  const render = () => shallow(
    <Provider store={store}>
      <Game history={history} />
    </Provider>
  );

  it('should render', () => {
    const component = render();
    expect(component).toBeTruthy();
  });
});
