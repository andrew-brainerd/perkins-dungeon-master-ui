import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import TextDisplay from './TextDisplay';

describe('TextDisplay Component', () => {
  let store, props;

  beforeEach(() => {
    store = configureStore([thunk])();

    props = {
      height: 500,
      messages: [],
      characterId: '12345'
    };
  });

  const render = () => shallow(
    <Provider store={store}>
      <TextDisplay {...props} />
    </Provider>
  );

  it('should render', () => {
    const component = render();
    expect(component).toBeTruthy();
  });
});
