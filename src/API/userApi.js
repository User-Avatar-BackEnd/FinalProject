import {authorizedRequest} from "./index"

export const getUsers = (pageNumber, pageSize) => authorizedRequest.get("users", {
    params: {pageNumber, pageSize},
    headers: {"Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`}
}).then(resp => resp.data)

export default {
    getUsers
}
