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
    attackEncounter(
      state,
      { payload: { attack, characterStats, minDamage, maxDamage } },
    ) {
      const { precision } = characterStats
      let damage = 0

      for (let i = 0; i < attack.hitCount; i++) {
        let hitDamage =
          Math.floor(Math.random() * (maxDamage - minDamage + 1)) +
          minDamage +
          characterStats.strength +
          attack.damageIncrease

        const criticalHit =
          Math.random() < precision / 100 + attack.criticalChance
        if (criticalHit) {
          hitDamage *= 2
        }
        damage += hitDamage
      }

      state.encounter.hp -= damage
      if (state.encounter.hp <= 0) {
        state.gameCycleState = GAME_CYCLE_STATE.BATTLE_VICTORY
      }
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
  attackEncounter,
} = gameSlice.actions

export default gameSlice.reducer
