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
    const preloadedState = {
      game: {
        character: {
          current: {
            attacks: [
              {
                id: 1,
                name: 'Test Attack 1',
                cooldown: 1,
                description: 'Test Description 1',
              },
              {
                id: 2,
                name: 'Test Attack 2',
                cooldown: 1,
                description: 'Test Description 2',
              },
              {
                id: 3,
                name: 'Test Attack 3',
                cooldown: 1,
                description: 'Test Description 3',
              },
            ],
          },
        },
      },
    }
    store = configureStore({ reducer: { game: gameReducer }, preloadedState })
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
    const newAttack = {
      name: 'Test Attack',
      cooldown: 1,
      description: 'Test Description',
    }
    render(
      <Provider store={store}>
        <AttackReplaceModal
          newAttack={newAttack}
          onRewardSelected={onRewardSelected}
        />
      </Provider>,
    )
    fireEvent.click(screen.getByText('Replace'))
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'game/characterReplaceAttack',
        payload: expect.objectContaining({ newAttack, attackId: 2 }),
      }),
    )
    expect(onRewardSelected).toHaveBeenCalled()
  })
})
