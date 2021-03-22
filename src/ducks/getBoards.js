const REQUESTED = 'requested'
const RECEIVED = 'received'
const DELETE_BOARD = 'delete_board'

const requested = () => ({
    type: REQUESTED
})

const received = (boards) => ({
    type: RECEIVED,
    payload: boards
})

const boardDeleted = (index) => ({
    type: DELETE_BOARD,
    payload: index
})

export const getBoards = () => (dispatch) => {
    dispatch(requested())

    API.getBoards()
        .then((boards) => dispatch(received(boards)))
}

export const deleteBoard = (id) => (dispatch) => {
    dispatch(requested())

    API.deleteBoard(id).then((_) => dispatch(boardDeleted(id)))
}

const initialState = {
    boards: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUESTED:
            return {
                ...state
            }
        case RECEIVED:
            return {
                ...state,
                boards: [...state.boards, ...action.payload]
            }
        case DELETE_BOARD:
            return {
                ...state,
                boards: state.boards.filter(board => board.id !== action.payload.id)
            }
        default:
            return state
    }
}
 // export default reducer
