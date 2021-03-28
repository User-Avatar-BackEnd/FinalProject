import {useEffect, useState} from "react";
import {getHistory} from "../API/userApi";

export default (login) => {

    const [history, setHistory] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        getHistory(login).then(history => {
            setHistory(history)
            setLoading(false)
        }).catch(error => setError(error.getMessage))
    }, [])

    return {isLoading, history, error}
}
