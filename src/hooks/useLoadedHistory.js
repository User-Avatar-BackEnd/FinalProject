import {useEffect, useState} from "react";
import {getHistory, getUsers} from "../API/userApi";

export default (login) => {

    const [history, setHistory] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        getHistory(login).then(history => {
            console.log('useH' + JSON.stringify(history))
            setHistory(history)
            setLoading(false)
        }).catch(error => setError(error.getMessage))
    }, [])

    return {isLoading, history, error}
}
