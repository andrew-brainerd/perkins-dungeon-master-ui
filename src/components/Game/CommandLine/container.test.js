import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { ADD_LOCAL_MESSAGE } from '../../../actions/games';
import Container from './container';
import CommandLine from './CommandLine';

describe('CommandLine Container', () => {
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

  it('should render a CommandLine component', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(CommandLine);

    expect(component.exists()).toBeTruthy();
  });

  it('should dispatch addPlayerInput action', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(CommandLine);
    store.clearActions();

    component.props().addPlayerInput('help').then(() => {
      expect(store.getActions()).toEqual([{ type: ADD_LOCAL_MESSAGE }]);
    });
  });
});
