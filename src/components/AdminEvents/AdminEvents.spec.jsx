import React from 'react';
import { shallow } from 'enzyme';

import AdminEvents from './AdminEvents';

describe('AdminEvents component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AdminEvents />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should match snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });
});