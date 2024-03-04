import { createSlice } from '@reduxjs/toolkit'
import { ANIMATION_STATE } from '../../constants/animation-state'
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
  encounterAnimation: '',
  stageFileName: null,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    gameStart(state) {
      state.gameState = GAME_STATE.PLAYING
      state.gameCycleState = GAME_CYCLE_STATE.ENCOUNTER
      state.stage = 1
      state.encounter = generateEncounter(1)
      state.stageFileName = generateStage(state.encounter)
    },
    gameWon(state) {
      state.gameState = GAME_STATE.WON
    },
    gameOver(state) {
      state.gameState = GAME_STATE.OVER
    },
    battleStart(state) {
      state.gameCycleState = GAME_CYCLE_STATE.BATTLE
    },
    battleVictory(state) {
      state.gameCycleState = GAME_CYCLE_STATE.BATTLE_DEFEAT
    },
    battleDefeat(state) {
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
    damageEncounter(state, { payload }) {
      state.encounter.hp -= payload
      console.log('damage', payload)
      if (state.encounter.hp <= 0) {
        state.gameCycleState = GAME_CYCLE_STATE.BATTLE_VICTORY
      }
    },
    animateAttack(state) {
      state.encounterAnimation = ANIMATION_STATE.ATTACKING
    },
    animateDamage(state) {
      state.encounterAnimation = ANIMATION_STATE.DAMAGING
    },
  },
})

export const {
  gameStart,
  gameOver,
  gameWon,
  battleStart,
  battleVictory,
  battleDefeat,
  resetGame,
  nextStage,
  damageEncounter,
  animateAttack,
  animateDamage,
} = gameSlice.actions

export default gameSlice.reducer
