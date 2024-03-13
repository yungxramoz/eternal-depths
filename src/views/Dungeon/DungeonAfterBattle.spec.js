import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import gameReducer from '../../store/game/gameSlice'
import DungeonAfterBattle from './DungeonAfterBattle'

describe('DungeonAfterBattle', () => {
  const store = configureStore({
    reducer: {
      game: gameReducer,
    },
  })

  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <DungeonAfterBattle />
      </Provider>,
    )
    expect(document.body).toMatchSnapshot('DungeonAfterBattle')
  })

  it('dispatches gameWon action when "Escape" button is clicked', () => {
    store.dispatch = jest.fn()
    render(
      <Provider store={store}>
        <DungeonAfterBattle />
      </Provider>,
    )
    fireEvent.click(screen.getByText('Escape'))
    expect(store.dispatch).toHaveBeenCalledTimes(1)
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'game/gameWon' })
  })

  it('dispatches nextStage and recoverHp actions when "Next Stage" button is clicked', () => {
    store.dispatch = jest.fn()
    render(
      <Provider store={store}>
        <DungeonAfterBattle />
      </Provider>,
    )
    fireEvent.click(screen.getByText('Next Stage'))
    expect(store.dispatch).toHaveBeenCalledTimes(2)
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'game/nextStage' })
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'character/recoverHp',
      payload: 15,
    })
  })
})
