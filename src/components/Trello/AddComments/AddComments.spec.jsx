import React from 'react';
import { shallow } from 'enzyme';
import {BrowserRouter} from 'react-router-dom';

import AddComments from './AddComments';

describe('BoardPanel component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BrowserRouter><AddComments /></BrowserRouter>);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should match snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });
});