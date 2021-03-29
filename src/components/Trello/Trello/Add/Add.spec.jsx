import React from 'react';
import { shallow } from 'enzyme';
import {BrowserRouter} from 'react-router-dom';

import Add from './Add';

describe('BoardPanel component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BrowserRouter><Add /></BrowserRouter>);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should match snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });
});