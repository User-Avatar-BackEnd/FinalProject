import React from 'react';
import {shallow} from 'enzyme';

import Comment from './Comment';

describe('Comment component', () => {

    const testComment = {
        id: 0,
        userId: 0,
        text: "string",
        editable: true,
        createdAt: "2021-03-27T11:25:23.928Z"
    }

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Comment comment={testComment}/>);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('should match snapshot', () => {

        expect(wrapper).toMatchSnapshot();
    });
});
