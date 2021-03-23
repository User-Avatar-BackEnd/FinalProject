const initialState = {
    dropedTask:{}
};

export const draggedTask =(task) =>({
    type: 'drag_task',
    payload: task
})

export const reducerTask = (state =initialState, action) => {
    switch(action.type){
        case 'drag_task':
            state.dropedTask = action.payload
            return{...state}
        case 'add_task':
            state.columns[action.index].tasks.push(action.payload)
            state.columns=[...state.columns]
            return {...state}
        default: return state
    }
}