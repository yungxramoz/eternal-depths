import { createSelector, createSlice } from '@reduxjs/toolkit'
import { BASE_ATTACK } from '../../constants/attack-type'

const initialState = {
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
}

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  selectors: {
    calculatedCharacterStats: createSelector(
      (state) => state.current,
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
    maxXp: (state) => Math.pow(state.current.level, 2) * 10,
    maxHp: (state) =>
      characterSlice.getSelectors().calculatedCharacterStats(state).health *
        10 +
      90,
  },
  reducers: {
    setName: (state, { payload }) => {
      state.current.name = payload
    },
    setLook: (state, { payload }) => {
      state.current.look = payload
    },
    assignAttributePoint: (
      state,
      { payload: { health = 0, strength = 0, agility = 0, precision = 0 } },
    ) => {
      const total = health + strength + agility + precision
      if (state.availableAttributePoints >= total) {
        state.current.stats.health += health
        state.current.stats.strength += strength
        state.current.stats.agility += agility
        state.current.stats.precision += precision
        state.availableAttributePoints -= total
        characterSlice.caseReducers.setHpToMax(state)
      }
    },
    setHpToMax: (state) => {
      state.current.hp = characterSlice.getSelectors().maxHp(state)
    },
    recoverHp: (state, { payload }) => {
      state.current.hp += payload
      const maxHp = characterSlice.getSelectors().maxHp(state)
      if (state.current.hp > maxHp) {
        state.current.hp = maxHp
      }
    },
    gainXp: (state, { payload }) => {
      state.current.xp += payload
      if (state.current.xp >= characterSlice.getSelectors().maxXp(state)) {
        state.current.level += 1
        state.current.xp = 0
      }
    },
    equipItem: (state, { payload }) => {
      state.current.items[payload.type] = payload
    },
    attackEffects: (state, { payload: { attack, dealtDamage } }) => {
      if (attack.selfHealAmount != null) {
        let heal = 0
        if (attack.selfHealAmount === 'auto') {
          heal = dealtDamage
        } else {
          heal = attack.selfHealAmount
        }
        console.log('heal', heal)
        characterSlice.caseReducers.recoverHp(state, { payload: heal })
      }
      if (attack.selfInflictedAmount > 0) {
        state.current.hp -= attack.selfInflictedAmount
        if (state.current.hp <= 0) {
          state.current.hp = 0
        }
        console.log('selfInflictedAmount', attack.selfInflictedAmount)
      }

      state.current.attacks.forEach((a) => {
        if (a.currentCooldown > 0) {
          a.currentCooldown -= 1
        }
      })

      state.current.attacks.find((a) => a.id === attack.id).currentCooldown =
        attack.cooldown
      console.log('attack.cooldown', attack.cooldown)
    },
    damageCharacter: (state, { payload }) => {
      state.current.hp -= payload
      if (state.current.hp <= 0) {
        state.current.hp = 0
      }
    },
  },
})

export const { calculatedCharacterStats, maxXp, maxHp } =
  characterSlice.selectors
export const {
  setName,
  setLook,
  assignAttributePoint,
  setHpToMax,
  recoverHp,
  gainXp,
  equipItem,
  damageCharacter,
  attackEffects,
} = characterSlice.actions

export default characterSlice.reducer
