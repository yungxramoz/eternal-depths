import { createSlice } from '@reduxjs/toolkit'
import GAME_STATE from '../../constants/game-state'
import {
  encounterLevel,
  generateEncounter,
} from '../../utils/encounter-generator'

const initialState = {
  gameState: GAME_STATE.IDLE,
  stage: 0,
  encounter: null,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame(state) {
      state.gameState = GAME_STATE.PLAYING
      state.stage = 1
      state.encounter = generateEncounter(1)
    },
    gameOver(state) {
      state.gameState = GAME_STATE.OVER
    },
    gameWon(state) {
      state.gameState = GAME_STATE.WON
    },
    resetGame(state) {
      state.gameState = GAME_STATE.IDLE
    },
    nextStage(state) {
      state.stage += 1
      const level = encounterLevel(state.stage)
      const isBoss = state.stage % 5 === 0
      state.encounter = generateEncounter(level, isBoss)
    },
    damageEncounter(state, action) {
      state.encounter.hp -= action.payload
      if (state.encounter.hp <= 0) {
        gameSlice.caseReducers.gameWon(state)
      }
    },
  },
})

export const {
  startGame,
  gameOver,
  gameWon,
  resetGame,
  nextStage,
  damageEncounter,
} = gameSlice.actions

export default gameSlice.reducer
