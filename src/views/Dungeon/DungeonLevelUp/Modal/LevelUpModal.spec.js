import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import gameReducer from '../../../../store/game/gameSlice'
import { generateAttack } from '../../../../utils/attack'
import LevelUpModal from './LevelUpModal'

jest.mock('../../../../utils/attack', () => ({
  generateAttack: jest.fn(),
}))

describe('LevelUpModal', () => {
  let store
  let setIsOpen

  beforeEach(() => {
    store = configureStore({ reducer: { game: gameReducer } })
    setIsOpen = jest.fn()
    generateAttack.mockReturnValue({
      name: 'Test Attack',
      cooldown: 1,
      description: 'Test Description',
    })
  })

  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <LevelUpModal isOpen={true} setIsOpen={setIsOpen} />
      </Provider>,
    )
    expect(document.body).toMatchSnapshot('LevelUpModal Open')
  })

  it('dispatches characterLearnAttack action and hides LevelUpModal when attack reward is selected', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    render(
      <Provider store={store}>
        <LevelUpModal isOpen={true} setIsOpen={setIsOpen} />
      </Provider>,
    )
    fireEvent.click(screen.getByText('Test Attack'))
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'game/characterLearnAttack' }),
    )
    expect(setIsOpen).toHaveBeenCalledWith(false)
  })
})
