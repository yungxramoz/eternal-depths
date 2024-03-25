import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import gameReducer from '../../../../store/game/gameSlice'
import ItemReplaceModal from './ItemReplaceModal'

describe('ItemReplaceModal', () => {
  let store
  let onRewardSelected
  const item = {
    type: 'helmet',
    icon: 'test-icon',
    name: 'Test Item',
    rarity: 'Common',
    stats: { strength: 10 },
  }
  const preloadedState = {
    game: {
      character: {
        current: {
          items: {
            helmet: item,
          },
        },
      },
    },
  }

  beforeEach(() => {
    store = configureStore({ reducer: { game: gameReducer }, preloadedState })
    onRewardSelected = jest.fn()
  })

  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <ItemReplaceModal
          newItem={item}
          onClose={() => {}}
          onRewardSelected={onRewardSelected}
        />
      </Provider>,
    )
    expect(document.body).toMatchSnapshot('ItemReplaceModal')
  })

  it('dispatches characterEquipItem action and calls onRewardSelected when Replace button is clicked', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    render(
      <Provider store={store}>
        <ItemReplaceModal
          newItem={item}
          onClose={() => {}}
          onRewardSelected={onRewardSelected}
        />
      </Provider>,
    )
    fireEvent.click(screen.getByText('Replace'))
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'game/characterEquipItem' }),
    )
    expect(onRewardSelected).toHaveBeenCalled()
  })
})
