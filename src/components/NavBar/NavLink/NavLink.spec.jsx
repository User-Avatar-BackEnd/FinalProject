import React from 'react';
import { shallow } from 'enzyme';

import NavLink from './NavLink';

describe('Nav link component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavLink />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should match snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });
});
