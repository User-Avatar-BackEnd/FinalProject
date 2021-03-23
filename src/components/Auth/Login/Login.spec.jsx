import React from 'react';
import { shallow } from 'enzyme';
import { Formik } from 'formik';

import Login from './Login';

describe('Login component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Login />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render Sign in form', () => {
    const formik = wrapper.find(Formik);

    expect(formik.length).toBe(1);

    expect(wrapper).toMatchSnapshot();
  });
});