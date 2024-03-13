import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import gameReducer from '../../store/game/gameSlice'
import DungeonBeforeBattle from './DungeonBeforeBattle'

describe('DungeonBeforeBattle', () => {
  const store = configureStore({
    reducer: {
      game: gameReducer,
    },
  })
  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <DungeonBeforeBattle />
      </Provider>,
    )
    expect(document.body).toMatchSnapshot('DungeonBeforeBattle')
  })

  it('dispatches battleStart action when "Start Battle" button is clicked', () => {
    store.dispatch = jest.fn()
    render(
      <Provider store={store}>
        <DungeonBeforeBattle />
      </Provider>,
    )
    fireEvent.click(screen.getByText('Start Battle'))
    expect(store.dispatch).toHaveBeenCalledTimes(1)
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'game/battleStart' })
  })
})
