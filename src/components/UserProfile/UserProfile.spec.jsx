import React from 'react';
import { shallow } from 'enzyme';

import UserProfile from './UserProfile';

describe('UserRank component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<UserProfile />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should match snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });
});