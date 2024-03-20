import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import TestRenderer from 'react-test-renderer'
import ROUTE from '../constants/routes'
import gameReducer, {
  gameOver,
  gameStart,
  gameWon,
} from '../store/game/gameSlice'
import GameStateRoute from './GameStateRoute'

describe('GameStateRoute', () => {
  let store
  beforeEach(() => {
    store = configureStore({
      reducer: {
        game: gameReducer,
      },
    })
  })
  it('renders home route when game state is idle', async () => {
    store.dispatch(gameStart())
    const testRenderer = TestRenderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ROUTE.HOME]}>
          <GameStateRoute />
        </MemoryRouter>
      </Provider>,
    )
    const testInstance = testRenderer.root
    const result = await testInstance.findByType(GameStateRoute)
    expect(result).toBeTruthy()
  })

  it('renders game over route when game state is over', async () => {
    store.dispatch(gameOver())
    const testRenderer = TestRenderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ROUTE.GAME_OVER]}>
          <GameStateRoute />
        </MemoryRouter>
      </Provider>,
    )
    const testInstance = testRenderer.root
    const result = await testInstance.findByType(GameStateRoute)
    expect(result).toBeTruthy()
  })

  it('renders game won route when game state is won', async () => {
    store.dispatch(gameWon())
    const testRenderer = TestRenderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ROUTE.GAME_WON]}>
          <GameStateRoute />
        </MemoryRouter>
      </Provider>,
    )
    const testInstance = testRenderer.root
    const result = await testInstance.findByType(GameStateRoute)
    expect(result).toBeTruthy()
  })

  it('renders dungeon route when game state is playing', async () => {
    store.dispatch(gameStart())
    const testRenderer = TestRenderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ROUTE.DUNGEON]}>
          <GameStateRoute />
        </MemoryRouter>
      </Provider>,
    )
    const testInstance = testRenderer.root
    const result = await testInstance.findByType(GameStateRoute)
    expect(result).toBeTruthy()
  })
})
