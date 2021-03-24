import React from 'react';
import { shallow } from 'enzyme';

import UserIcon from './UserIcon';

describe('UserRank component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<UserIcon />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should match snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });
});