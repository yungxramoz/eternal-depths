import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './game/gameSlice'
import leaderboardReducer from './leaderboard/leaderboardSlice'

export default configureStore({
  reducer: {
    game: gameReducer,
    leaderboard: leaderboardReducer,
  },
})
