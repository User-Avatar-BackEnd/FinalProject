import React from 'react';
import { shallow } from 'enzyme';

import UserNotifications from './UserNotifications';

describe('AdminEvents component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<UserNotifications />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should match snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });
});