import {useEffect, useState} from "react";
import {getUsers} from "../API/userApi";

export default (pageSize = 10, startPage = 1) => {

    const [page, setPage] = useState(startPage)
    const [isLoading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        getUsers(page, pageSize).then(users => {
            setUsers(users)
            setLoading(false)
        }).catch(error => setError(error.getMessage))
    }, [page])

    return {isLoading, users, page, setPage, error}
}
