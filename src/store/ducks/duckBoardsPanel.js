import API from '../../config/API';

const initialState = {
    boards:[]
};

export const addBoard = (title) => (dispatch) =>{
    API({
        method: 'post',
        url:'/boards',
        headers: {'Authorization':`Bearer ${localStorage.getItem('AUTH_TOKEN')}`},
        data:{"title": title}
    }).then(response => dispatch(setAddBoard(response.data)))
}
const setAddBoard =(board) =>({
    type: 'add_board',
    payload: board
})


export const editBoard = (title, id, index) => (dispatch) =>{
    dispatch(setEditBoard(title, index))
    API({
        method: 'patch',
        url:`/boards/${id}`,
        headers: {'Authorization':`Bearer ${localStorage.getItem('AUTH_TOKEN')}`},
        data:{"title": title}
    })
}
const setEditBoard = (title, index) =>({
    type: 'edit_board',
    payload: title,
    index: index
})

export const deleteBoard = (id, index) => (dispatch) =>{
    dispatch(setDeleteBoards(index))
    API({
        method: 'delete',
        url:`/boards/${id}`,
        headers: {'Authorization':`Bearer ${localStorage.getItem('AUTH_TOKEN')}`}
    })
}
const setDeleteBoards = (index) =>({
    type: 'delete_board',
    payload: index,
})

export const getBoards = () => (dispatch) =>{
    API({
        method: 'get',
        url:'/boards',
        headers: {'Authorization':`Bearer ${localStorage.getItem('AUTH_TOKEN')}`}
    }).then(response => dispatch(allBoards(response.data)))
}
const allBoards = (boards) =>({
    type: 'get_boards',
    payload: boards,
})

export const reducerBoardsPanel = (state =initialState, action) => {
    switch(action.type){
        case 'get_boards':
            state.boards=action.payload;
            return{...state}
        case 'add_board':
            state.boards.push(action.payload);
            state.boards=[...state.boards];
            return{...state}
        case 'edit_board':
            state.boards[action.index].title = action.payload;
            state.boards=[...state.boards];
            return{...state}
        case 'delete_board':
            state.boards.splice(action.payload,1);
            state.boards=[...state.boards];
            return{...state}
        default: return state
    }
}