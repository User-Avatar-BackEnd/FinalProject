import React from 'react';
import { shallow } from 'enzyme';

import Header from './Header';

describe('Header component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should match snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });
});