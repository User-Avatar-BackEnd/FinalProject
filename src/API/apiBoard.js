import {authorizedRequest} from "./index";

export const getMembers = (boardId) => {
    return authorizedRequest.get(`boards/${boardId}`, {
        headers: {"Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`}
    }).then(resp => resp.data.members)
}

export default {
    getMembers
}
