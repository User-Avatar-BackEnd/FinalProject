import {deepEqualitySelector} from './index';

const commentsSelector = state => {
    return state.taskComments.comments
}

const selector = deepEqualitySelector({fn: commentsSelector})

export default selector
