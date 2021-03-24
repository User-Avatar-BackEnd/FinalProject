import React from 'react';
import { shallow } from 'enzyme';

import UserProfileNav from './UserProfileNav';

describe('UserRank component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<UserProfileNav />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should match snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });
});