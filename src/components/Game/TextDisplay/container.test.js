import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Container from './container';
import TextDisplay from './TextDisplay';

describe('TextDisplay Container', () => {
  let store, props;

  const initialState = {
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
    props = {
      height: 1000
    };
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

  it('should render a TextDisplay component', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(TextDisplay);

    expect(component.exists()).toBeTruthy();
  });
});
