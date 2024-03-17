import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import gameReducer, {
  battleStart,
  battleVictory,
  gameStart,
} from '../../store/game/gameSlice'
import Dungeon from './Dungeon'

const store = configureStore({
  reducer: {
    game: gameReducer,
  },
})

jest.mock('../../components/molecules/Encounter/Encounter')
jest.mock('./DungeonAfterBattle/DungeonAfterBattle', () => () => (
  <div>DungeonAfterBattle</div>
))
jest.mock('./DungeonBeforeBattle/DungeonBeforeBattle', () => () => (
  <div>DungeonBeforeBattle</div>
))
jest.mock('./DungeonInBattle/DungeonInBattle', () => () => (
  <div>DungeonInBattle</div>
))

store.dispatch(gameStart())

describe('Dungeon', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Dungeon />
      </Provider>,
    )
    expect(document.body).toMatchSnapshot('Dungeon')
  })
  it('renders DungeonBeforeBattle component on encounter state', () => {
    render(
      <Provider store={store}>
        <Dungeon />
      </Provider>,
    )
    expect(document.body).toMatchSnapshot('DungeonBeforeBattle')
  })
  it('renders DungeonInBattle component on battle state', () => {
    store.dispatch(battleStart())
    render(
      <Provider store={store}>
        <Dungeon />
      </Provider>,
    )
    expect(document.body).toMatchSnapshot('DungeonInBattle')
  })
  it('renders DungeonAfterBattle component on battle victory state', () => {
    store.dispatch(battleVictory())
    render(
      <Provider store={store}>
        <Dungeon />
      </Provider>,
    )
    expect(document.body).toMatchSnapshot('DungeonAfterBattle')
  })
})
