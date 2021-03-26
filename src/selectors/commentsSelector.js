import {deepEqualitySelector} from "./index";

const commentsSelector = state => state.taskComments.comments

const selector = deepEqualitySelector({fn: commentsSelector})

export default selector
