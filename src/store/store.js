import { configureStore } from '@reduxjs/toolkit'
import characterReducer from './character/characterSlice'
import gameReducer from './game/gameSlice'

export default configureStore({
  reducer: {
    character: characterReducer,
    game: gameReducer,
  },
})
