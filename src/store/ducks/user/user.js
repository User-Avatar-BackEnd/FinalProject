import axios from 'axios';
import types from './types';

const initialState = {
  items: [],
  active: {},
  isLoading: false
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOAD_PHOTOS_START:
      return {
        ...state, isLoading: true
      }
    case types.LOAD_PHOTOS_SUCCESS:
      return {
        ...state, [action.payload.property]: action.payload.data, isLoading: false
      }
    case types.CLEAR_PHOTOS_STATE:
      return {
        ...state, [action.payload]: []
      }
    default: return state;
  }
}

export function loadPhotos(start, limit, albumId) {
  return async (dispatch, getState) => {
    dispatch(loadPhotosStart())

    let url = `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`

    if (albumId) {
      url += `&albumId=${albumId}`
    }

    const response = await axios.get(url)
    const data = [...getState().photos.items, ...response.data]

    dispatch(loadPhotosSuccess('items', data))
  }
}

export function loadSinglePhoto(id) {
  return async dispatch => {
    dispatch(loadPhotosStart())

    let url = `https://jsonplaceholder.typicode.com/photos/${id}?_expand=album`

    const response = await axios.get(url)
    const data = response.data

    dispatch(loadPhotosSuccess('active', data))
  }
}

export function loadPhotosStart() {
  return {
    type: types.LOAD_PHOTOS_START
  }
}

export function loadPhotosSuccess(property, data) {
  return {
    type: types.LOAD_PHOTOS_SUCCESS,
    payload: {
      property,
      data
    }
  }
}

export function clearState(property) {
  return {
    type: types.CLEAR_PHOTOS_STATE,
    payload: property
  }
}