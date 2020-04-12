import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import getNavToAction from '../../../__mocks__/navToAction';
import { SET_IS_CONNECTED } from '../../actions/pusher';
import { LOADING_GAME, SENDING_INVITE_EMAIL, TRIGGER_UPDATE, STARTING_GAME, DELETING_GAME, ADDING_PLAYER } from '../../actions/games';
import Container from './container';
import NewGame from './NewGame';

describe('NewGame Container', () => {
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
    },
    players: {
      currentPlayer: {
        _id: '12345'
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

  it('should render a NewGame component', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(NewGame);

    expect(component.exists()).toBeTruthy();
  });

  it('should dispatch connectClient action', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(NewGame);
    store.clearActions();

    component.props().connectClient('test', 'test', () => {});

    expect(store.getActions()).toEqual([{ type: SET_IS_CONNECTED, isConnected: true }]);
  });

  it('should dispatch loadGame action', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(NewGame);
    store.clearActions();

    component.props().loadGame('12345');

    expect(store.getActions()).toEqual([{ type: LOADING_GAME }]);
  });

  it('should dispatch sendInvite action', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(NewGame);
    store.clearActions();

    component.props().sendInvite('12345', 'Test Player', 'test@anorakgm.com');

    expect(store.getActions()).toEqual([{ type: SENDING_INVITE_EMAIL }]);
  });

  it('should dispatch startGame action', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(NewGame);
    store.clearActions();

    component.props().startGame('12345');

    expect(store.getActions()).toEqual([{ type: STARTING_GAME }, getNavToAction('/game/12345/new-character')]);
  });

  it('should dispatch deleteGame action', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(NewGame);
    store.clearActions();

    component.props().deleteGame('12345');

    expect(store.getActions()).toEqual([{ type: DELETING_GAME }]);
  });

  it('should dispatch addPlayer action', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(NewGame);
    store.clearActions();

    component.props().addPlayer('12345', '12345');

    expect(store.getActions()).toEqual([{ type: ADDING_PLAYER }]);
  });

  it('should dispatch connectClient action', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(NewGame);
    store.clearActions();

    component.props().connectClient('test', 'test', () => {});

    expect(store.getActions()).toEqual([{ type: SET_IS_CONNECTED, isConnected: true }]);
  });

  it('should dispatch triggerUpdate action', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(NewGame);
    store.clearActions();

    component.props().triggerUpdate();

    expect(store.getActions()).toEqual([{ type: TRIGGER_UPDATE }]);
  });

  it('should dispatch navTo action', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(NewGame);
    store.clearActions();

    component.props().navTo('/');

    expect(store.getActions()).toEqual([getNavToAction('/')]);
  });
});
