import React from 'react';
import { shallow } from 'enzyme';
import HelpText from './HelpText';

describe('HelpText Component', () => {
  const render = () => shallow(
    <HelpText />
  );

  it('should render', () => {
    const component = render();
    expect(component).toBeTruthy();
  });
});
