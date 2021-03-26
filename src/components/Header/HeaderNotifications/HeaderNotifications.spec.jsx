import React from 'react';
import { shallow } from 'enzyme';

import HeaderNotifications from './HeaderNotifications';

describe('HeaderNotifications component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<HeaderNotifications />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should match snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });
});