import { createSlice } from '@reduxjs/toolkit'
import Encounter from '../../models/Encounter'

const initialState = {
  gameState: 'idle',
  stage: 0,
  encounter: null,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame(state) {
      state.gameState = 'playing'
      state.stage = 1
      state.encounter = new Encounter(1)
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
    nextStage(state) {
      state.stage += 1
      const level = Math.floor((state.stage - 1) / 5) + 1
      const isBoss = state.stage % 5 === 0
      state.encounter = new Encounter(level, isBoss)
    },
  },
})

export const { startGame, gameOver, gameWon, resetGame, nextStage } =
  gameSlice.actions

export default gameSlice.reducer
