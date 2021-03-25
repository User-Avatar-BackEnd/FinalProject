import API from '../../../config/API';
import types from './types';

const initialState = {
  data: {}
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_USER_SUCCESS:
      return {
        ...state, data: action.payload
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

export function getUserSuccess(data) {
  return {
    type: types.GET_USER_SUCCESS,
    payload: data
  }
}