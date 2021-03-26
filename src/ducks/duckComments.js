import {apiComment, deleteComment, editComment, loadComments} from "../API/apiComment";

const REQUESTED = 'requested'
const DELETE = 'delete-comment'
const ADD_COMMENT = 'add-comment'
const LOAD_COMMENTS = 'load-comments'
const CLEAR = 'clear'
const UPDATE = 'update'

const requested = () => ({
    type: REQUESTED
})

const commentDeleted = (id) => ({
    type: DELETE,
    payload: id
})

const commentAdded = (comments) => ({
    type: ADD_COMMENT,
    payload: comments
})

const commentLoaded = (comments) => ({
    type: LOAD_COMMENTS,
    payload: comments
})

const clearedComments = () => ({
    type: CLEAR
})

const commentUpdated = (id) => ({
    type: UPDATE,
    payload: id
})

export const getComments = (boardId, cardId) => (dispatch) => {
    dispatch(requested())

    loadComments(boardId, cardId)
        .then((comments) => {
            console.log({comments})
            dispatch(commentLoaded(comments))
        })
}

export const addComment = (cardId, boardId, text) => (dispatch) => {
    dispatch(requested())

    apiComment(cardId, boardId, text).then(resp => dispatch(commentAdded(resp)))
}

export const clearComments = () => (dispatch) => {
    dispatch(clearedComments())
}

export const dropComment = (boardId, cardId, commentsId) => (dispatch) => {
    deleteComment(boardId, cardId, commentsId)
        .then(resp => dispatch(commentDeleted(commentsId)))
}

export const updateComment = (boardId, cardId, commentsId, text) => (dispatch) => {
    editComment(boardId, cardId, commentsId, text)
        .then(res => dispatch(commentUpdated(commentsId)))
}

const initialState = {
    isLoading: false,
    comments: []
}


const reducerTaskComments = (state = initialState, action) => {
    switch (action.type) {
        case REQUESTED:
            return {
                ...state,
                isLoading: true
            }
        case ADD_COMMENT:
            return {
                ...state,
                isLoading: false,
                comments: [...state.comments, action.payload]
            }
        case LOAD_COMMENTS:
            return {
                ...state,
                isLoading: false,
                comments: action.payload
            }
        case CLEAR:
            return initialState

        case DELETE:
            return {
                ...state,
                comments: [...state.comments.filter(comment => comment.id !== action.payload)]
            }
        case UPDATE:
            return {
                ...state,
                comments: [...state.comments.filter(comment => comment.id !== action.payload, action.payload)]
            }
        default:
            return state
    }
}

export default reducerTaskComments
