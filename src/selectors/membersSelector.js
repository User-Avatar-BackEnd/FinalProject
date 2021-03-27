import {deepEqualitySelector} from "./index";

export const membersSelector = deepEqualitySelector({
    fn: (state) => state.trello.members,
    combiner: members => new Map(members.map(m => [m.id, m]))
})
