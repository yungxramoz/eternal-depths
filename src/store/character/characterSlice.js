import { createSlice } from '@reduxjs/toolkit'

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
      }
    },
    getCalculatedStats: (state) => {
      const stats = {
        health: state.current.stats.health,
        strength: state.current.stats.strength,
        agility: state.current.stats.agility,
        precision: state.current.stats.precision,
      }
      const items = [
        state.current.items.helmet,
        state.current.items.armor,
        state.current.items.shield,
        state.current.items.greaves,
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
    equipItem: (state, { payload: { slot, item } }) => {
      state.current.items[slot] = item
    },
  },
})

export const {
  setName,
  setLook,
  assignAttributePoint,
  getCalculatedStats,
  equipItem,
} = characterSlice.actions

export default characterSlice.reducer
