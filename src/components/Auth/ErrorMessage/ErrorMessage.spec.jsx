import React from 'react';
import { shallow } from 'enzyme';

import ErrorMessage from './ErrorMessage';

describe('ErrorMessage component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ErrorMessage />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should match snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });
});