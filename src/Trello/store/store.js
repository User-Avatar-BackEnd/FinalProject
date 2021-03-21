import {createStore} from 'redux';
import API from './config';

const playloadedState = {
    title: API.title,
    columns: API.columns
};

export const addColumn = (title) =>{
    const col = {
        title: title,
        id: performance.now(),
        order: performance.now(),
        tasks: []
    }
    return{
        type: 'add_column',
        playload: col
    }
}

export const changeColumnOrder = (index,order) =>({
    type: 'change_order_column',
    index: index,
    order: order
})

export const addTask = (title,index) =>{
    const task ={
        title: title,
        id: performance.now(),
        priority: 0
    }
    return {
        type: 'add_task',
        playload: task,
        index: index
    }
}

export const deleteColumn = (index) =>({
    type: 'delete_column',
    playload: index
})

export const deleteTask = (column,index) =>({
    type: 'delete_task',
    column: column,
    playload: index
})

export const dragedTask =(task) =>({
    type: 'drag_task',
    playload: task
})

export const dropTask = (task,index) =>({
    type: 'drop_task',
    playload: task,
    index: index
})

const reducer = (state, action) => {
    switch(action.type){
        case 'drop_task':
            state.columns[action.index].tasks.push(action.playload)
            state.columns=[...state.columns]
            return {...state}
        case 'drag_task':
            state.dropedTask = action.playload
            return{...state}
        case 'add_column': 
            state.columns=[...state.columns, action.playload]
            return {...state}
        case 'change_order_column':
            state.columns[action.index].order = action.order
            state.columns=[...state.columns]
            return {...state}
        case 'add_task': 
            state.columns[action.index].tasks.push(action.playload)
            state.columns=[...state.columns]
            return {...state}
        case 'delete_task':
            delete state.columns[action.column].tasks[action.playload];
            return{...state}
        case 'delete_column':
            delete state.columns[action.playload];
            return{...state}
        default: return state
    }
}

const store = createStore(reducer, playloadedState,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;