import { createSelector, createSlice } from '@reduxjs/toolkit'

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
      const maxHp =
        characterSlice.getSelectors().calculatedCharacterStats(state).health *
          10 +
        90
      state.current.maxHp = maxHp
      state.current.hp = maxHp
    },
    recoverHp: (state, { payload }) => {
      state.current.hp += payload
      if (state.current.hp > state.current.maxHp) {
        state.current.hp = state.current.maxHp
      }
    },
    equipItem: (state, { payload: { slot, item } }) => {
      state.current.items[slot] = item
    },
    damageCharacter: (state, { payload }) => {
      state.current.hp -= payload
      if (state.current.hp <= 0) {
        state.current.hp = 0
      }
    },
  },
})

export const { calculatedCharacterStats } = characterSlice.selectors
export const {
  setName,
  setLook,
  assignAttributePoint,
  setHpToMax,
  recoverHp,
  equipItem,
  damageCharacter,
} = characterSlice.actions

export default characterSlice.reducer
