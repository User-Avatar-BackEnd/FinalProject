import React from 'react';
import { shallow } from 'enzyme';
import {BrowserRouter} from 'react-router-dom';

import InputTitle from './InputTitle';

describe('BoardPanel component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BrowserRouter><InputTitle /></BrowserRouter>);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should match snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });
});