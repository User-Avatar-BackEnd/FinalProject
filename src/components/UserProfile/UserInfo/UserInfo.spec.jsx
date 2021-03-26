import React from 'react';
import { shallow } from 'enzyme';

import UserInfo from './UserInfo';

describe('UserInfo component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<UserInfo />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should match snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });
});