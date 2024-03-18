import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import gameReducer from '../../../store/game/gameSlice'
import DungeonBeforeBattle from './DungeonBeforeBattle'

jest.mock('../../../components/molecules/Encounter/Encounter', () => () => (
  <div>Encounter</div>
))

const preloadedState = {
  game: {
    encounter: {
      current: {
        name: 'Mock Encounter',
        level: 1,
      },
    },
  },
}

describe('DungeonBeforeBattle', () => {
  let store
  beforeEach(() => {
    store = configureStore({
      reducer: {
        game: gameReducer,
      },
      preloadedState,
    })
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
