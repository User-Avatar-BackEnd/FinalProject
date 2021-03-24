import {createStore} from 'redux';
import API from './config';

const payloadedState = {
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
        payload: col
    }
}

export const changeColumnOrder = (index, order) =>({
    type: 'change_order_column',
    index: index,
    order: order
})

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

export const deleteColumn = (index) =>({
    type: 'delete_column',
    payload: index
})

export const changeTitleColumn = (title,index) =>({
    type: 'change_title_column',
    payload: title,
    index: index
})

export const deleteTask = (column,index) =>({
    type: 'delete_task',
    column: column,
    payload: index
})

export const draggedTask =(task) =>({
    type: 'drag_task',
    payload: task
})

export const dropTask = (task,index) =>{
    task.columnId = index
    return{
        type: 'drop_task',
        payload: task,
        index: index
    }
}

export const changeTask = (column,index,task) =>({
    type: 'change_task',
    column: column,
    index: index,
    payload: task
})

const reducer = (state, action) => {
    switch(action.type){
        case 'drop_task':
            state.columns[action.index].tasks.push(action.payload)
            state.columns=[...state.columns]
            return {...state}
        case 'drag_task':
            state.dropedTask = action.payload
            return{...state}
        case 'add_column': 
            state.columns=[...state.columns, action.payload]
            return {...state}
        case 'change_title_column':
            state.columns[action.index].title = action.payload
            state.columns=[...state.columns]
            return {...state}
        case 'change_order_column':
            state.columns[action.index].order = action.order
            state.columns=[...state.columns]
            return {...state}
        case 'add_task': 
            state.columns[action.index].tasks.push(action.payload)
            state.columns=[...state.columns]
            return {...state}
        case 'delete_task':
            state.columns[action.column].tasks.splice(action.payload,1);
            state.columns=[...state.columns]
            return{...state}
        case 'change_task':
            state.columns[action.column].tasks[action.index] = action.payload;
            state.columns=[...state.columns]
            return{...state}
        case 'delete_column':
            state.columns.splice(action.payload,1);
            state.columns=[...state.columns]
            return{...state}
        default: return state
    }
}

const store = createStore(reducer, payloadedState,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;