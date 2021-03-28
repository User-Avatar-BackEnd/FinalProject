import {deepEqualitySelector} from "./index";

export const membersSelector = deepEqualitySelector({
    fn: (state) => state.trello.board.members,
    combiner: users => new Map(users.map(m => [m.id, m]))
})
