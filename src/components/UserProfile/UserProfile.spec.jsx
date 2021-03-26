import React from 'react';
import { shallow } from 'enzyme';
import { useHistory } from 'react-router-dom';

import UserProfile from './UserProfile';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn()
}));

describe('UserProfile component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<UserProfile />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should match snapshot', () => {
    const history = {
      location: {}
    }
    useHistory.mockReturnValue(history)

    expect(wrapper).toMatchSnapshot();
  });
});