import { createSelector, createSlice } from '@reduxjs/toolkit'
import { ANIMATION_STATE } from '../../constants/animation-state'
import { BASE_ATTACK } from '../../constants/attack-type'
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
  isEncounterTurn: false,
  stage: 0,
  encounter: {
    current: null,
    animation: '',
    stageFileName: null,
  },
  character: {
    current: {
      look: 1,
      name: '',
      level: 1,
      xp: 0,
      stats: {
        health: 1,
        strength: 1,
        agility: 1,
        precision: 1,
      },
      items: {
        helmet: null,
        armor: null,
        weapon: {
          name: 'Rusty Sword',
          stats: {
            minDamage: 1,
            maxDamage: 3,
          },
        },
        shield: null,
        greaves: null,
      },
      attacks: [
        {
          ...BASE_ATTACK,
          id: 1,
          currentCooldown: 0,
        },
      ],
    },
    availableAttributePoints: 2,
  },
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  selectors: {
    calculatedHpReward: createSelector(
      (state) => state.stage,
      (stage) => Math.min(Math.floor(stage / 5) * 10 + 5, 50),
    ),
    calculatedCharacterStats: createSelector(
      (state) => state.character.current,
      (current) => {
        const stats = {
          health: current.stats.health,
          strength: current.stats.strength,
          agility: current.stats.agility,
          precision: current.stats.precision,
        }
        const items = [
          current.items.helmet,
          current.items.armor,
          current.items.shield,
          current.items.greaves,
        ]
        for (const item of items) {
          if (item) {
            for (const stat in item.stats) {
              stats[stat] += item.stats[stat]
            }
          }
        }
        return stats
      },
    ),
    characterMaxXp: (state) => Math.pow(state.character.current.level, 2) * 10,
    characterMaxHp: (state) =>
      gameSlice.getSelectors().calculatedCharacterStats(state).health * 10 + 90,
  },
  reducers: {
    gameStart(state) {
      state.gameState = GAME_STATE.PLAYING
      state.gameCycleState = GAME_CYCLE_STATE.ENCOUNTER
      state.stage = 1
      state.encounter.current = generateEncounter(1)
      state.encounter.animation = state.encounter.current.idleAnimation
      state.encounter.stageFileName = generateStage(state.encounter.current)
    },
    gameWon(state) {
      state.gameState = GAME_STATE.WON
    },
    gameOver(state) {
      state.gameState = GAME_STATE.OVER
    },
    gameReset(state) {
      state.gameState = GAME_STATE.IDLE
      state.gameCycleState = null
    },
    battleStart(state, { payload }) {
      if (payload < state.encounter.current.stats.agility) {
        state.isEncounterTurn = true
      }
      state.gameCycleState = GAME_CYCLE_STATE.BATTLE
    },
    battleVictory(state) {
      state.gameCycleState = GAME_CYCLE_STATE.BATTLE_VICTORY
    },
    battleDefeat(state) {
      state.gameCycleState = GAME_CYCLE_STATE.BATTLE_DEFEAT
    },
    nextStage(state) {
      state.stage += 1
      const level = encounterLevel(state.stage)
      const isBoss = state.stage % 5 === 0
      state.encounter.current = generateEncounter(level, isBoss)
      state.encounter.animation = state.encounter.current.idleAnimation
      state.isEncounterTurn = false
      state.encounter.stageFileName = generateStage(state.encounter.current)
      state.gameCycleState = GAME_CYCLE_STATE.ENCOUNTER
    },
    checkGameCycleState(state) {
      if (state.character.current.hp <= 0) {
        gameSlice.caseReducers.battleDefeat(state)
      }
      if (state.encounter.current.hp <= 0) {
        gameSlice.caseReducers.characterGainXp(state)
        if (
          state.character.current.xp >=
          gameSlice.getSelectors().characterMaxXp(state)
        ) {
          gameSlice.caseReducers.characterLevelUp(state)
        } else {
          gameSlice.caseReducers.battleVictory(state)
        }
      }
    },
    encounterDamage(state, { payload }) {
      state.encounter.current.hp -= payload
      gameSlice.caseReducers.encounterAnimateDamage(state)
      gameSlice.caseReducers.checkGameCycleState(state)
      state.isEncounterTurn = true
    },
    encounterAttack(state) {
      gameSlice.caseReducers.encounterAnimateAttack(state)
      gameSlice.caseReducers.checkGameCycleState(state)
      state.isEncounterTurn = false
    },
    encounterAnimateAttack(state) {
      state.encounter.animation = ANIMATION_STATE.ATTACKING
    },
    encounterAnimateDamage(state) {
      state.encounter.animation = ANIMATION_STATE.DAMAGING
    },
    encounterAnimateIdle(state) {
      state.encounter.animation = state.encounter.current.idleAnimation
    },
    characterSetName: (state, { payload }) => {
      state.character.current.name = payload
    },
    characterSetLook: (state, { payload }) => {
      state.character.current.look = payload
    },
    characterAssignAttributePoint: (
      state,
      { payload: { health = 0, strength = 0, agility = 0, precision = 0 } },
    ) => {
      const total = health + strength + agility + precision
      if (state.character.availableAttributePoints >= total) {
        state.character.current.stats.health += health
        state.character.current.stats.strength += strength
        state.character.current.stats.agility += agility
        state.character.current.stats.precision += precision
        state.character.availableAttributePoints -= total
        gameSlice.caseReducers.characterSetHpToMax(state)
      }
    },
    characterSetHpToMax: (state) => {
      state.character.current.hp = gameSlice
        .getSelectors()
        .characterMaxHp(state)
    },
    characterRecoverHp: (state, { payload }) => {
      state.character.current.hp += payload
      const maxHp = gameSlice.getSelectors().characterMaxHp(state)
      if (state.character.current.hp > maxHp) {
        state.character.current.hp = maxHp
      }
    },
    characterGainXp: (state) => {
      const xp = Math.min(
        Math.round((state.encounter.current.level * 5) / 2),
        30,
      )
      state.character.current.xp += xp
    },
    characterEquipItem: (state, { payload }) => {
      state.character.current.items[payload.type] = payload
    },
    characterAttackEffects: (state, { payload: { attack, dealtDamage } }) => {
      if (attack.selfHealAmount != null) {
        let heal = 0
        if (attack.selfHealAmount === 'auto') {
          heal = dealtDamage
        } else {
          heal = attack.selfHealAmount
        }
        gameSlice.caseReducers.characterRecoverHp(state, { payload: heal })
      }
      if (attack.selfInflictedAmount > 0) {
        state.character.current.hp -= attack.selfInflictedAmount
        if (state.character.current.hp <= 0) {
          state.character.current.hp = 0
        }
      }

      state.character.current.attacks.forEach((a) => {
        if (a.currentCooldown > 0) {
          a.currentCooldown -= 1
        }
      })

      state.character.current.attacks.find(
        (a) => a.id === attack.id,
      ).currentCooldown = attack.cooldown
      gameSlice.caseReducers.checkGameCycleState(state)
    },
    characterDamage: (state, { payload }) => {
      state.character.current.hp -= payload
      if (state.character.current.hp <= 0) {
        state.character.current.hp = 0
      }
      gameSlice.caseReducers.checkGameCycleState(state)
    },
    characterLevelUp: (state) => {
      state.character.current.xp -= gameSlice
        .getSelectors()
        .characterMaxXp(state)
      state.character.current.level += 1
      gameSlice.caseReducers.characterSetHpToMax(state)
      state.gameCycleState = GAME_CYCLE_STATE.LEVEL_UP
    },
    characterLearnAttack: (state, { payload }) => {
      const attack = {
        ...payload,
        id: state.character.current.attacks.length + 1,
        currentCooldown: payload.cooldown,
      }
      state.character.current.attacks.push(attack)
    },
  },
})

export const {
  calculatedHpReward,
  calculatedCharacterStats,
  characterMaxHp,
  characterMaxXp,
} = gameSlice.selectors

export const {
  gameStart,
  gameOver,
  gameWon,
  gameReset,
  battleStart,
  battleVictory,
  battleDefeat,
  nextStage,
  encounterDamage,
  encounterAttack,
  encounterAnimateAttack,
  encounterAnimateDamage,
  encounterAnimateIdle,
  characterSetName,
  characterSetLook,
  characterAssignAttributePoint,
  characterSetHpToMax,
  characterRecoverHp,
  characterEquipItem,
  characterAttackEffects,
  characterDamage,
  characterLevelUp,
  characterLearnAttack,
} = gameSlice.actions

export default gameSlice.reducer
