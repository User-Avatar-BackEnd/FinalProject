import React from 'react';
import { shallow } from 'enzyme';

import Auth from './Auth';

describe('AdminEvents component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Auth />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should match snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });
});