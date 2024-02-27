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
      { payload: { strength, health, agility, precision } },
    ) => {
      const total = strength + health + agility + precision
      if (state.availableAttributePoints >= total) {
        state.current.strength += strength
        state.current.health += health
        state.current.agility += agility
        state.current.precision += precision
        state.availableAttributePoints -= total
      }
    },
  },
})

export const { setName, setLook, assignAttributePoint } = characterSlice.actions

export default characterSlice.reducer
