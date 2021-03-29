import React from 'react';
import {shallow} from 'enzyme';

import {CommentsModal} from './CommentsModal';

describe('CommentModal component', () => {

    const card = {
        id: 2
    }

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<CommentsModal card={card} />);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('should match snapshot', () => {

        expect(wrapper).toMatchSnapshot();
    });
});
