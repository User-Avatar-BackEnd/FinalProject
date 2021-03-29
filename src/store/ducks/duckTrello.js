import API from '../../config/API';

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
const GET_USERS = 'get_users';

const initialState = {
    board: {},
    users: null,
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

    API({
        method: 'get',
        url:`/boards/${id}/invites/find_person?query=`,
        headers: {'Authorization':`Bearer ${localStorage.getItem('AUTH_TOKEN')}`}
    }).then(response => dispatch(setUsers(response.data)))
    
}
const setBoard = (board) =>({
    type: GET_BOARD,
    payload: board,
})
const setUsers = (users) =>({
    type: GET_USERS,
    payload: users,
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

export const changeColumnOrder = (boardId, index, dropedIndex, dropedId,) => (dispatch) =>{
    dispatch(setChangeColumnOrder(index,dropedIndex))
    API({
        method: 'patch',
        url:`/boards/${boardId}/columns/${dropedId}/position?to=${index}`,
        headers: {'Authorization':`Bearer ${localStorage.getItem('AUTH_TOKEN')}`},
    })
}
const setChangeColumnOrder = (index, dropedIndex) =>({
    type: CHANGE_ORDER,
    index: index,
    dropedIndex: dropedIndex
})
const swap = (arr, new_index, old_index) => {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
}

export const addTask = (boardId, id, title, index) => (dispatch) =>{
    API({
        method: 'post',
        url:`/boards/${boardId}/columns/${id}/cards`,
        headers: {'Authorization':`Bearer ${localStorage.getItem('AUTH_TOKEN')}`},
        data:{"title": title}
    }).then(response => dispatch(setAddTask(response.data, index)))
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
export const setchangeCard = (card, column, index) =>({
    type: CHANGE_CARD,
    column: column,
    index: index,
    payload: card
})

export const reducerTrello = (state =initialState, action) => {
    switch(action.type){
        case GET_BOARD:
            state.board = action.payload;
            return {...state}
        case DROP_CARD:
            state.board.columns[action.index].cards.push(action.payload)
            state.board.columns=[...state.board.columns]
            return {...state}
        case DRAG_CARD:
            state.board.dropedTask = action.payload
            return{...state}
        case ADD_COLUMN: 
            state.board.columns=[...state.board.columns, action.payload]
            return {...state}
        case CHANGE_TITLE:
            state.board.columns[action.index].title = action.payload
            state.board.columns=[...state.board.columns]
            return {...state}
        case CHANGE_ORDER:
            state.board.columns = [...swap([...state.board.columns], action.index, action.dropedIndex)]
            return {...state}
        case ADD_CARD: 
            state.board.columns[action.index].cards.push(action.payload)
            state.board.columns=[...state.board.columns]
            return {...state}
        case DELETE_CARD:
            state.board.columns[action.column].cards.splice(action.payload,1);
            state.board.columns=[...state.board.columns]
            return{...state}
        case CHANGE_CARD:
            state.board.columns[action.column].cards[action.index] = action.payload;
            state.board.columns=[...state.board.columns]
            return{...state}
        case DELETE_COLUMN:
            state.board.columns.splice(action.payload,1);
            state.board.columns=[...state.board.columns]
            return{...state}
        case SHOW_HIDDEN:
            state.board.showHidden = action.payload;
            return{...state}
        case GET_USERS:
            state.users = action.payload;
            state.users = [...state.users];
            return {...state}
        default: return state
    }
}
