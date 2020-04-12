import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import navToAction from '../../../__mocks__/navToAction';
import { LOADING_GAMES, CREATING_GAME } from '../../actions/games';
import Container from './container';
import Home from './Home';

describe('Home Container', () => {
  let store;

  const render = () => {
    store = configureStore([thunk])({});

    return mount(
      <Provider store={store}>
        <Container />
      </Provider>
    );
  };

  it('should render', () => {
    const component = render();
    expect(component).toBeTruthy();
  });

  it('should render a Home component', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(Home);

    expect(component.exists()).toBeTruthy();
  });

  it('should dispatch loadPlayerGames action', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(Home);
    store.clearActions();

    component.props().loadPlayerGames('12345');

    expect(store.getActions()).toEqual([{ type: LOADING_GAMES }]);
  });

  it('should dispatch createGame action', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(Home);
    store.clearActions();

    component.props().createGame('Test Game', '12345');

    expect(store.getActions()).toEqual([{ type: CREATING_GAME }]);
  });

  it('should dispatch navTo action', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(Home);
    store.clearActions();

    component.props().navTo('/');

    expect(store.getActions()).toEqual([navToAction]);
  });
});
