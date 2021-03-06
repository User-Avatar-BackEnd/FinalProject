import React from 'react';
import { shallow } from 'enzyme';

import UserRank from './UserRank';

describe('DailyQuest component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<UserRank />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should match snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });
});