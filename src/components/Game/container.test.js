import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import getNavToAction from '../../../__mocks__/navToAction';
import { SET_IS_CONNECTED } from '../../actions/pusher';
import { LOADING_GAME, TRIGGER_UPDATE } from '../../actions/games';
import { CHARACTERS_LOADED, LOADING_CHARACTERS } from '../../actions/characters';
import Container from './container';
import Game from './Game';

describe('Game Container', () => {
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
      }
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

  it('should render a Game component', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(Game);

    expect(component.exists()).toBeTruthy();
  });

  it('should dispatch connectClient action', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(Game);
    store.clearActions();

    component.props().connectClient('test', 'test', () => {});

    expect(store.getActions()).toEqual([{ type: SET_IS_CONNECTED, isConnected: true }]);
  });

  it('should dispatch loadGame action', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(Game);
    store.clearActions();

    component.props().loadGame('12345');

    expect(store.getActions()).toEqual([{ type: LOADING_GAME }]);
  });

  it('should dispatch loadCharacters action', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(Game);
    store.clearActions();

    component.props().loadCharacters('12345').then(() => {
      expect(store.getActions()).toEqual([{ type: CHARACTERS_LOADED, characters: {} }]);
    });

    expect(store.getActions()).toEqual([{ type: LOADING_CHARACTERS }]);
  });

  it('should dispatch triggerUpdate action', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(Game);
    store.clearActions();

    component.props().triggerUpdate();

    expect(store.getActions()).toEqual([{ type: TRIGGER_UPDATE }]);
  });

  it('should dispatch navTo action', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(Game);
    store.clearActions();

    component.props().navTo('/');

    expect(store.getActions()).toEqual([getNavToAction('/')]);
  });
});
