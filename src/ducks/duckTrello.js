import API from '../config/API'

const initialState = {
    title: '',
    columns: []
};

export const getBoard = (id) => (dispatch) =>{
    API({
        method: 'get',
        url:`/boards/${id}`,
        headers: {'Authorization':`Bearer ${localStorage.getItem('AUTH_TOKEN')}`}
    }).then(response => dispatch(setBoard(response.data)))
}
const setBoard = (board) =>({
    type: 'get_board',
    payload: board,
})

export const addColumn = (title, id) => (dispatch) =>{
    API({
        method: 'post',
        url:`/boards/${id}/columns`,
        headers: {'Authorization':`Bearer ${localStorage.getItem('AUTH_TOKEN')}`},
        data:{"title": title}
    }).then(response =>dispatch(setColumn(response.data)) )
}
const setColumn = (col) =>({
    type: 'add_column',
    payload: col
})

export const changeColumnOrder = (boardId, id,  index, order) => (dispatch) =>{
    dispatch(setChangeColumnOrder(index,order))
    API({
        method: 'patch',
        url:`/boards/${boardId}/columns/${id}/position?to=${order}`,
        headers: {'Authorization':`Bearer ${localStorage.getItem('AUTH_TOKEN')}`},
    })
}
const setChangeColumnOrder = (index, order) =>({
    type: 'change_order_column',
    index: index,
    order: order
})

export const addTask = (boardId, id, title, index) => (dispatch) =>{
    API({
        method: 'post',
        url:`/boards/${boardId}/columns/${id}/cards`,
        headers: {'Authorization':`Bearer ${localStorage.getItem('AUTH_TOKEN')}`},
        data:{"title": title}
    }).then(response => dispatch(setAddTask(response.data, index))) //dispatch(setAddTask(response, index))
}
const setAddTask = (task, index) =>({
    type: 'add_task',
    payload: task,
    index: index
})

export const deleteColumn = (boardId, index, id) => (dispatch) =>{
    dispatch(setDeleteColumn(index))
    API({
        method: 'delete',
        url:`/boards/${boardId}/columns/${id}`,
        headers: {'Authorization':`Bearer ${localStorage.getItem('AUTH_TOKEN')}`},
    })
}
const setDeleteColumn = (index) =>({
    type: 'delete_column',
    payload: index
})

export const changeTitleColumn = (boardId, index, id,title) => (dispatch) =>{
    dispatch(setChangeTitleColumn(title,index))
    API({
        method: 'patch',
        url:`/boards/${boardId}/columns/${id}`,
        headers: {'Authorization':`Bearer ${localStorage.getItem('AUTH_TOKEN')}`},
        data:{"title": title}
    })
}
const setChangeTitleColumn =(title,index) =>({
    type: 'change_title_column',
    payload: title,
    index: index
})

export const deleteCard = (boardId, cardId, columnId, index) => (dispatch) =>{
    dispatch(setdeleteCard(columnId,index))
    API({
        method: 'delete',
        url:`/boards/${boardId}/cards/${cardId}`,
        headers: {'Authorization':`Bearer ${localStorage.getItem('AUTH_TOKEN')}`},
    })
}
export const setdeleteCard = (column,index) =>({
    type: 'delete_task',
    column: column,
    payload: index
})

export const draggedCard =(card) =>({
    type: 'drag_task',
    payload: card
})

export const  dropCard  = (boardId, cardId, columnId, index, card) => (dispatch) =>{
    dispatch(setdropCard(card, index))
    card.columnId = columnId
    API({
        method: 'put',
        url:`/boards/${boardId}/cards/${cardId}`,
        headers: {'Authorization':`Bearer ${localStorage.getItem('AUTH_TOKEN')}`},
        data: card
    })
}
const setdropCard = (task,index) =>({
    type: 'drop_task',
    payload: task,
    index: index
})

export const changeCard = (boardId, cardId, column, index, card) => (dispatch) =>{
    dispatch(setchangeCard(card, column, index))
    console.log(card)
    API({
        method: 'put',
        url:`/boards/${boardId}/cards/${cardId}`,
        headers: {'Authorization':`Bearer ${localStorage.getItem('AUTH_TOKEN')}`},
        data: card
    })
}
const setchangeCard = (card, column, index) =>({
    type: 'change_task',
    column: column,
    index: index,
    payload: card
})

export const reducerTrello = (state =initialState, action) => {
    switch(action.type){
        case 'get_board':
            state = action.payload;
            return {...state}
        case 'drop_task':
            state.columns[action.index].cards.push(action.payload)
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
            state.columns[action.index].cards.push(action.payload)
            state.columns=[...state.columns]
            return {...state}
        case 'delete_task':
            state.columns[action.column].cards.splice(action.payload,1);
            state.columns=[...state.columns]
            return{...state}
        case 'change_task':
            state.columns[action.column].cards[action.index] = action.payload;
            state.columns=[...state.columns]
            return{...state}
        case 'delete_column':
            state.columns.splice(action.payload,1);
            state.columns=[...state.columns]
            return{...state}
        default: return state
    }
}