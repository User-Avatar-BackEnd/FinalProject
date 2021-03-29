import axios from 'axios';

const baseURL = 'https://user-avatar-5xjpz.ondigitalocean.app/api/v1/'

const getToken = () => localStorage.getItem("AUTH_TOKEN")

export const authorizedRequest = axios.create({
    baseURL: baseURL,
    headers: {
        "Authorization": `Bearer ${getToken()}`
    }
})
