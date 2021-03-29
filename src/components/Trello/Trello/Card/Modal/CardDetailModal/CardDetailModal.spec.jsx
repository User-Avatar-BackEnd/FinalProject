import React from 'react';
import { shallow } from 'enzyme';
import {BrowserRouter} from 'react-router-dom';

import CardDetailModal from './CardDetailModal';

describe('BoardPanel component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BrowserRouter><CardDetailModal /></BrowserRouter>);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should match snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });
});