import API from '../../config/API'

const GET_BOARD = 'get_board';
const DROP_CARD = 'drop_card';
const DRAG_CARD = 'drag_card';
const ADD_COLUMN = 'add_column';
const DELETE_COLUMN = 'delete_column';
const CHANGE_TITLE = 'change_title_column';
const CHANGE_ORDER = 'change_order_column';
const ADD_CARD = 'add_card';
const DELETE_CARD = 'delete_card';
const CHANGE_CARD = 'change_card';
const SHOW_HIDDEN = 'show_hidden';

const initialState = {
    title: '',
    columns: [],
    showHidden: false
};

export const setShowHidden = (bool) =>({
    type: SHOW_HIDDEN,
    payload: bool,
})

export const getBoard = (id) => (dispatch) =>{
    API({
        method: 'get',
        url:`/boards/${id}`,
        headers: {'Authorization':`Bearer ${localStorage.getItem('AUTH_TOKEN')}`}
    }).then(response => dispatch(setBoard(response.data)))
}
const setBoard = (board) =>({
    type: GET_BOARD,
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
    type: ADD_COLUMN,
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
    type: CHANGE_ORDER,
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
const setAddTask = (card, index) =>({
    type: ADD_CARD,
    payload: card,
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
    type: DELETE_COLUMN,
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
    type: CHANGE_TITLE,
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
    type: DELETE_CARD,
    column: column,
    payload: index
})

export const draggedCard =(card) =>({
    type: DRAG_CARD,
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
export const setdropCard = (card,index) =>({
    type: DROP_CARD,
    payload: card,
    index: index
})

export const changeCard = (boardId, cardId, column, index, card) => (dispatch) =>{
    dispatch(setchangeCard(card, column, index))
    API({
        method: 'put',
        url:`/boards/${boardId}/cards/${cardId}`,
        headers: {'Authorization':`Bearer ${localStorage.getItem('AUTH_TOKEN')}`},
        data: card
    })
}
const setchangeCard = (card, column, index) =>({
    type: CHANGE_CARD,
    column: column,
    index: index,
    payload: card
})

export const reducerTrello = (state =initialState, action) => {
    switch(action.type){
        case GET_BOARD:
            state = action.payload;
            return {...state}
        case DROP_CARD:
            state.columns[action.index].cards.push(action.payload)
            state.columns=[...state.columns]
            return {...state}
        case DRAG_CARD:
            state.dropedTask = action.payload
            return{...state}
        case ADD_COLUMN: 
            state.columns=[...state.columns, action.payload]
            return {...state}
        case CHANGE_TITLE:
            state.columns[action.index].title = action.payload
            state.columns=[...state.columns]
            return {...state}
        case CHANGE_ORDER:
            state.columns[action.index].order = action.order
            state.columns=[...state.columns]
            return {...state}
        case ADD_CARD: 
            state.columns[action.index].cards.push(action.payload)
            state.columns=[...state.columns]
            return {...state}
        case DELETE_CARD:
            state.columns[action.column].cards.splice(action.payload,1);
            state.columns=[...state.columns]
            return{...state}
        case CHANGE_CARD:
            state.columns[action.column].cards[action.index] = action.payload;
            state.columns=[...state.columns]
            return{...state}
        case DELETE_COLUMN:
            state.columns.splice(action.payload,1);
            state.columns=[...state.columns]
            return{...state}
        case SHOW_HIDDEN:
            state.showHidden = action.payload;
            return{...state}
        default: return state
    }
}