import { createSlice } from '@reduxjs/toolkit'
import GAME_CYCLE_STATE from '../../constants/game-cycle-state'
import GAME_STATE from '../../constants/game-state'
import {
  encounterLevel,
  generateEncounter,
} from '../../utils/encounter-generator'
import { generateStage } from '../../utils/stage-generator'

const initialState = {
  gameState: GAME_STATE.IDLE,
  gameCycleState: null,
  stage: 0,
  encounter: null,
  stageFileName: null,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame(state) {
      state.gameState = GAME_STATE.PLAYING
      state.gameCycleState = GAME_CYCLE_STATE.ENCOUNTER
      state.stage = 1
      state.encounter = generateEncounter(1)
      state.stageFileName = generateStage(state.encounter)
    },
    startBattle(state) {
      state.gameCycleState = GAME_CYCLE_STATE.BATTLE
    },
    victory(state) {
      state.gameCycleState = GAME_CYCLE_STATE.BATTLE_DEFEAT
    },
    defeat(state) {
      state.gameCycleState = GAME_CYCLE_STATE.BATTLE_VICTORY
    },
    resetGame(state) {
      state.gameState = GAME_STATE.IDLE
      state.gameCycleState = null
    },
    nextStage(state) {
      state.stage += 1
      const level = encounterLevel(state.stage)
      const isBoss = state.stage % 5 === 0
      state.encounter = generateEncounter(level, isBoss)
      state.stageFileName = generateStage(state.encounter)
      state.gameCycleState = GAME_CYCLE_STATE.ENCOUNTER
    },
    damageEncounter(state, action) {
      state.encounter.hp -= action.payload
      if (state.encounter.hp <= 0) {
        gameSlice.caseReducers.victory(state)
      }
    },
  },
})

export const {
  startGame,
  startBattle,
  gameOver,
  gameWon,
  resetGame,
  nextStage,
  damageEncounter,
} = gameSlice.actions

export default gameSlice.reducer
