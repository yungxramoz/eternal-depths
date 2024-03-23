import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import gameReducer from '../../../../store/game/gameSlice'
import AttackReplaceModal from './AttackReplaceModal'

describe('AttackReplaceModal', () => {
  let store
  let onRewardSelected

  beforeEach(() => {
    store = configureStore({ reducer: { game: gameReducer } })
    onRewardSelected = jest.fn()
  })

  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <AttackReplaceModal
          newAttack={{}}
          onRewardSelected={onRewardSelected}
        />
      </Provider>,
    )
    expect(document.body).toMatchSnapshot('AttackReplaceModal')
  })

  it('dispatches characterReplaceAttack action and calls onRewardSelected when Replace button is clicked', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    render(
      <Provider store={store}>
        <AttackReplaceModal
          newAttack={{}}
          onRewardSelected={onRewardSelected}
        />
      </Provider>,
    )
    fireEvent.click(screen.getByText('Replace'))
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'game/characterReplaceAttack' }),
    )
    expect(onRewardSelected).toHaveBeenCalled()
  })
})
