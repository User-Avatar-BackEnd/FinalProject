import {authorizedRequest} from "./index"

export const getUsers = (pageNumber, pageSize) => {
    return  authorizedRequest.get("admin/users", {
        params: {pageNumber, pageSize},
        headers: {"Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`}
    }).then(resp => resp.data)
}

export const updateRole = (login, role) => {

    console.log({role, login})
    return  authorizedRequest.put(`admin/role/${login}`, undefined,{
        params: {role},
        'Content-Type': 'application/json',
        headers: {"Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`}
    })
}

export const getHistory = (login) => {
    return  authorizedRequest.get(`admin/history/${login}`,{
        'Content-Type': 'application/json',
        headers: {"Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`}
    }).then(resp => resp.data)
}

export const changeBalance = (login, change) => {
    console.log({change, login})
    return  authorizedRequest.patch(`admin/balance/${login}`, undefined,{
        params: {change},
        'Content-Type': 'application/json',
        headers: {"Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`}
    })
}

export default {
    getUsers,
    updateRole,
    getHistory,
    changeBalance
}
