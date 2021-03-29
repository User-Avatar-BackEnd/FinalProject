import React from 'react';
import { shallow } from 'enzyme';

import DailyQuest from './DailyQuest';

describe('DailyQuest component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<DailyQuest />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should match snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });
});