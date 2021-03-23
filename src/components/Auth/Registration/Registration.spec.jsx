import React from 'react';
import { shallow } from 'enzyme';
import { Formik } from 'formik';

import Registration from './Registration';

describe('Registration component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Registration />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render Sign up form', () => {
    const formik = wrapper.find(Formik);

    expect(formik.length).toBe(1);

    expect(wrapper).toMatchSnapshot();
  });
});