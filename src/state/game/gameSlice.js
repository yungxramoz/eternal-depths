import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  gameState: 'idle',
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame(state) {
      state.gameState = 'playing'
    },
    gameOver(state) {
      state.gameState = 'over'
    },
    gameWon(state) {
      state.gameState = 'won'
    },
    resetGame(state) {
      state.gameState = 'idle'
    },
  },
})

export const { startGame, endGame, resetGame } = gameSlice.actions

export default gameSlice.reducer
