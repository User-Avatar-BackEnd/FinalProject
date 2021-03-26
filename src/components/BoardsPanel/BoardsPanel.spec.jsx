import React from 'react';
import { shallow } from 'enzyme';
import {BrowserRouter} from 'react-router-dom';

import BoardsPanel from './BoardsPanel';

describe('BoardPanel component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BrowserRouter><BoardsPanel /></BrowserRouter>);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should match snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });
});