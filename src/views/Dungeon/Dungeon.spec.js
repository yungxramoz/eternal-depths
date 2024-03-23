import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import gameReducer, {
  battleReward,
  battleStart,
  battleVictory,
  characterLevelUp,
  gameStart,
} from '../../store/game/gameSlice'
import Dungeon from './Dungeon'

const store = configureStore({
  reducer: {
    game: gameReducer,
  },
})

jest.mock('./DungeonAfterBattle/DungeonAfterBattle', () => () => (
  <div>DungeonAfterBattle</div>
))
jest.mock('./DungeonBeforeBattle/DungeonBeforeBattle', () => () => (
  <div>DungeonBeforeBattle</div>
))
jest.mock('./DungeonInBattle/DungeonInBattle', () => () => (
  <div>DungeonInBattle</div>
))
jest.mock('./DungeonLevelUp/DungeonLevelUp', () => () => (
  <div>DungeonLevelUp</div>
))
jest.mock('./DungeonReward/DungeonReward', () => () => <div>DungeonReward</div>)
jest.mock(
  '../../components/organisms/CharacterHeader/CharacterHeader',
  () => () => <div>CharacterHeader</div>,
)

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

  it('renders DungeonLevelUp component on level up state', () => {
    store.dispatch(characterLevelUp())
    render(
      <Provider store={store}>
        <Dungeon />
      </Provider>,
    )
    expect(document.body).toMatchSnapshot('DungeonLevelUp')
  })
  it('renders DungeonReward component on reward state', () => {
    store.dispatch(battleReward())
    render(
      <Provider store={store}>
        <Dungeon />
      </Provider>,
    )
    expect(document.body).toMatchSnapshot('DungeonReward')
  })
})
