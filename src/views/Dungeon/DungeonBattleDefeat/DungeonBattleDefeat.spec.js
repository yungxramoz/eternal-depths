import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import gameReducer from '../../../store/game/gameSlice'
import DungeonBattleDefeat from './DungeonBattleDefeat'

describe('DungeonBattleDefeat', () => {
  let store
  beforeEach(() => {
    store = configureStore({ reducer: { game: gameReducer } })
  })

  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <DungeonBattleDefeat />
      </Provider>,
    )
    expect(document.body).toMatchSnapshot('DungeonBattleDefeat')
  })

  it('dispatches gameReset when button is clicked', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    render(
      <Provider store={store}>
        <DungeonBattleDefeat />
      </Provider>,
    )
    fireEvent.click(screen.getByText('End'))
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'game/gameReset' }),
    )
  })
})
