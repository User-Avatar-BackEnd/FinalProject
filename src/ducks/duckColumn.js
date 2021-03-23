const initialState = null;

export const addTask = (title, index) =>{
    const task ={
        title: title,
        id: performance.now(),
        priority: 0,
        comments: 0,
        responsible: false,
        columnId: index
    }
    return {
        type: 'add_task',
        payload: task,
        index: index
    }
}

export const changeTitleColumn = (title,index) =>({
    type: 'change_title_column',
    payload: title,
    index: index
})

export const changeColumnOrder = (index, order) =>({
    type: 'change_order_column',
    index: index,
    order: order
})

export const deleteColumn = (index) =>({
    type: 'delete_column',
    payload: index
})

export const dropTask = (task,index) =>({
    type: 'drop_task',
    payload: task,
    index: index
})

export const deleteTask = (column,index) =>({
    type: 'delete_task',
    column: column,
    payload: index
})

export const reducerColumn = (state =initialState, action) => {
    switch(action.type){
        case 'delete_task':
            delete state.columns[action.column].tasks[action.payload];
            return{...state}
        case 'change_order_column':
            state.columns[action.index].order = action.order
            state.columns=[...state.columns]
            return {...state}
        case 'add_task':
            state.columns[action.index].tasks.push(action.payload)
            state.columns=[...state.columns]
            return {...state}
        case 'delete_column':
            state.columns.splice(action.payload,1);
            state.columns=[...state.columns]
            return{...state}
        case 'drop_task':
            state.columns[action.index].tasks.push(action.payload)
            state.columns=[...state.columns]
            return {...state}
        default: return state
    }
}