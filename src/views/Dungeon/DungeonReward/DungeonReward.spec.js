import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import gameReducer from '../../../store/game/gameSlice'
import DungeonReward from './DungeonReward'

jest.mock('../../../utils/item-generator', () => ({
  generateItem: () => ({
    icon: 'test-icon',
    name: 'Test Item',
    rarity: 'Common',
    stats: { strength: 10 },
  }),
}))

describe('RewardModal', () => {
  let store
  beforeEach(() => {
    store = configureStore({
      reducer: {
        game: gameReducer,
      },
    })
  })

  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <DungeonReward />
      </Provider>,
    )
    expect(document.body).toMatchSnapshot('RewardModal')
  })

  it('dispatches equipItem action when gear reward button is clicked', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    render(
      <Provider store={store}>
        <DungeonReward />
      </Provider>,
    )
    fireEvent.click(screen.getByText('Test Item'))
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'game/characterEquipItem' }),
    )
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'game/battleVictory' }),
    )
  })

  it('dispatches recoverHp action when HP reward button is clicked', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    render(
      <Provider store={store}>
        <DungeonReward />
      </Provider>,
    )
    fireEvent.click(screen.getByText('Food'))
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'game/characterRecoverHp' }),
    )
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'game/battleVictory' }),
    )
  })
})
