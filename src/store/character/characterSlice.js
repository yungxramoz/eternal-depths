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
      }
    },
    equipItem: (state, { payload: { slot, item } }) => {
      state.current.items[slot] = item
    },
    getDamage: (state) => {
      const { minDamage, maxDamage } = state.current.items.weapon.stats
      return (
        Math.floor(Math.random() * (maxDamage - minDamage + 1)) +
        minDamage +
        characterSlice.caseReducers.getCalculatedStats(state).strength
      )
    },
  },
})

// export const calculatedCharacterStats = createSelector(
//   (state) => state.character.current,
//   (current) => {
//     const stats = {
//       health: current.stats.health,
//       strength: current.stats.strength,
//       agility: current.stats.agility,
//       precision: current.stats.precision,
//     }
//     const items = [
//       current.items.helmet,
//       current.items.armor,
//       current.items.shield,
//       current.items.greaves,
//     ]
//     for (const item of items) {
//       if (item) {
//         for (const stat in item.stats) {
//           stats[stat] += item.stats[stat]
//         }
//       }
//     }
//     return stats
//   },
// )

export const { calculatedCharacterStats } = characterSlice.selectors

export const { setName, setLook, assignAttributePoint, equipItem } =
  characterSlice.actions

export default characterSlice.reducer
