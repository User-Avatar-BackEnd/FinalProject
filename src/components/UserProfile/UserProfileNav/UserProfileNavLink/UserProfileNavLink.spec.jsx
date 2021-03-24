import React from 'react';
import { shallow } from 'enzyme';

import UserProfileNavLink from './UserProfileNavLink';

describe('UserRank component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<UserProfileNavLink />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should match snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });
});