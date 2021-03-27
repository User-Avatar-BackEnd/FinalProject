import API from '../../../config/API';
import types from './types';

const initialState = {
  data: {},
  notifications: [],
  isNotificationsLoading: false
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_USER_SUCCESS:
      return {
        ...state, data: action.payload
      }
    case types.CHANGE_USERNAME:
      return {
        ...state, data: {...state.data, login: action.payload}
      }
    case types.CLEAR_USER:
      return {
        ...state, data: {}
      }
    case types.SET_NOTIFICATIONS:
      return {
        ...state, notifications: action.payload
      }
    case types.SET_NOTIFICATIONS_LOADING:
      return {
        ...state, isNotificationsLoading: action.payload
      }
    default: return state;
  }
}

export function getUser(token) {
  return async (dispatch) => {

    API({
      method: 'get',
      url: '/account',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        dispatch(getUserSuccess(response.data))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function getNotifications(token) {
  return async (dispatch) => {
    dispatch(setNotificationsLoading(true))

    API({
      method: 'get',
      url: '/account/invites',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        dispatch(setNotifications(response.data))
      })
      .catch(() => {
        dispatch(setNotifications([]))
      })
      .finally(() => {
        dispatch(setNotificationsLoading(false))
      })
  }
}

export function notificationResponse(status, id, token, message) {
  return async (dispatch, getState) => {

    API({
      method: 'patch',
      url: `/account/invites/${id}/?status=${status}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        const newData = getState().user.notifications.filter(item => {
          return item.id !== Number(id)
        })
        dispatch(setNotifications(newData))
        status === 1
          ? message('Invite accepted!', {appearance: 'success'})
          : message('Invite declined!', {appearance: 'warning'})
      })
      .catch(error => {
        console.log(error)
        message('Something went wrong...Please try again later', {appearance: 'error'})
      })
  }
}

export function getUserSuccess(data) {
  return {
    type: types.GET_USER_SUCCESS,
    payload: data
  }
}

export function setNotifications(data) {
  return {
    type: types.SET_NOTIFICATIONS,
    payload: data
  }
}

export function changeUsername(data) {
  return {
    type: types.CHANGE_USERNAME,
    payload: data
  }
}

export function clearUser() {
  return {
    type: types.CLEAR_USER,
  }
}

export function setNotificationsLoading(value) {
  return {
    type: types.SET_NOTIFICATIONS_LOADING,
    payload: value
  }
}
