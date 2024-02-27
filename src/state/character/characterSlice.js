import { createSlice } from '@reduxjs/toolkit'
import Character from '../../models/Character'

const initialState = {
  current: new Character(),
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
      { payload: { health, strength, agility, precision } },
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
  },
})

export const { setName, setLook, assignAttributePoint } = characterSlice.actions

export default characterSlice.reducer
