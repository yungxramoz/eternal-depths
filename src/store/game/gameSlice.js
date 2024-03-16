import { createSelector, createSlice } from '@reduxjs/toolkit'
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
  encounterTurn: false,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  selectors: {
    calculatedHpReward: createSelector(
      (state) => state.stage,
      (stage) => Math.min(Math.floor(stage / 5) * 10 + 5, 50),
    ),
  },
  reducers: {
    gameStart(state) {
      state.gameState = GAME_STATE.PLAYING
      state.gameCycleState = GAME_CYCLE_STATE.ENCOUNTER
      state.stage = 1
      state.encounter = generateEncounter(1)
      state.encounterAnimation = state.encounter.idleAnimation
      state.stageFileName = generateStage(state.encounter)
    },
    gameWon(state) {
      state.gameState = GAME_STATE.WON
    },
    gameOver(state) {
      state.gameState = GAME_STATE.OVER
    },
    battleStart(state, { payload }) {
      if (payload < state.encounter.stats.agility) {
        state.encounterTurn = true
      }
      state.gameCycleState = GAME_CYCLE_STATE.BATTLE
    },
    battleVictory(state) {
      state.gameCycleState = GAME_CYCLE_STATE.BATTLE_VICTORY
    },
    battleDefeat(state) {
      state.gameCycleState = GAME_CYCLE_STATE.BATTLE_DEFEAT
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
      state.encounterAnimation = state.encounter.idleAnimation
      state.encounterTurn = false
      state.stageFileName = generateStage(state.encounter)
      state.gameCycleState = GAME_CYCLE_STATE.ENCOUNTER
    },
    damageEncounter(state, { payload }) {
      state.encounter.hp -= payload
      console.log('damage', payload)
      gameSlice.caseReducers.animateDamage(state)
      if (state.encounter.hp <= 0) {
        gameSlice.caseReducers.battleVictory(state)
      }
      state.encounterTurn = true
    },
    attack(state) {
      gameSlice.caseReducers.animateAttack(state)
      state.encounterTurn = false
    },
    animateAttack(state) {
      state.encounterAnimation = ANIMATION_STATE.ATTACKING
    },
    animateDamage(state) {
      state.encounterAnimation = ANIMATION_STATE.DAMAGING
    },
    animateIdle(state) {
      state.encounterAnimation = state.encounter.idleAnimation
    },
  },
})

export const { calculatedHpReward } = gameSlice.selectors
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
  attack,
  animateAttack,
  animateDamage,
  animateIdle,
} = gameSlice.actions

export default gameSlice.reducer
