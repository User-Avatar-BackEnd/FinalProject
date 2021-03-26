import {authorizedRequest} from "./index"

export const apiComment = (cardId, boardId, text) => {
    return authorizedRequest.post(`boards/${boardId}/cards/${cardId}/comments`, {text},{
        headers: {"Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`}
    }).then(resp => resp.data).then(data => {
        console.log({data})
        return data
    })
}

export const deleteComment = (boardId, cardId, commentsId) => {
    return authorizedRequest.delete(`boards/${boardId}/cards/${cardId}/comments/${commentsId}`, {
        headers: {"Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`},
    })
}

export const loadComments = (boardId, cardId) => {
    return authorizedRequest.get(`boards/${boardId}/cards/${cardId}`, {
        headers: {"Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`}
    }).then(resp => resp.data.comments)
}

export const editComment = (boardId, cardId, commentsId, text) => {
    console.log({text})
    return authorizedRequest.patch(`boards/${boardId}/cards/${cardId}/comments/${commentsId}`, {text}, {
        headers: {"Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`}
    })
}

export default {
    addComments: apiComment,
    loadComments,
    deleteComment,
    editComment
}
