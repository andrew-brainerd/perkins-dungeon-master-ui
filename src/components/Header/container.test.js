import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import getNavToAction from '../../../__mocks__/navToAction';
import { LOADING_PLAYER } from '../../actions/players';
import { EXIT_GAME } from '../../actions/games';
import Container from './container';
import Header from './Header';

describe('Header Container', () => {
  let store, props;

  const initialState = {
    router: {
      location: {
        pathname: '/game/12345'
      }
    },
    game: {
      currentGame: {
        messages: [
          {
            characterName: 'Test Character',
            message: 'Test Message',
            color: 'orange'
          }
        ]
      },
      isPlaying: true
    }
  };

  beforeEach(() => {
  });

  const render = () => {
    store = configureStore([thunk])(initialState);

    return mount(
      <Provider store={store}>
        <Container {...props} />
      </Provider>
    );
  };

  it('should render', () => {
    const component = render();
    expect(component).toBeTruthy();
  });

  it('should render a Header component', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(Header);

    expect(component.exists()).toBeTruthy();
  });

  it('should dispatch setCurrentPlayer action', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(Header);
    store.clearActions();

    component.props().setCurrentPlayer('test@anorakgm.com');

    expect(store.getActions()).toEqual([{ type: LOADING_PLAYER }]);
  });

  it('should dispatch exitGame action', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(Header);
    store.clearActions();

    component.props().exitGame();

    expect(store.getActions()).toEqual([{ type: EXIT_GAME }, getNavToAction('/')]);
  });
});
