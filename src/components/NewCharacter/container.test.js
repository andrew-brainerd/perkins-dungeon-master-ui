import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Container from './container';
import NewCharacter from './NewCharacter';
import { CREATING_CHARACTER } from '../../actions/characters';

describe('NewCharacter Container', () => {
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

  it('should render a NewCharacter component', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(NewCharacter);

    expect(component.exists()).toBeTruthy();
  });

  it('should dispatch createCharacter action', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(NewCharacter);
    store.clearActions();

    component.props().createCharacter({ name: 'Test Character' });

    expect(store.getActions()).toEqual([{ type: CREATING_CHARACTER }]);
  });
});
