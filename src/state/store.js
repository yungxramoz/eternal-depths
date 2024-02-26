import { configureStore } from '@reduxjs/toolkit'
import characterReducer from './character/characterSlice'

export default configureStore({
  reducer: {
    character: characterReducer,
  },
})
