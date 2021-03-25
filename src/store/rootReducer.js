import { combineReducers } from 'redux'
import photos from './ducks/photos/photos'
import album from './ducks/album/album'

export default combineReducers({
  photos,
  album
})