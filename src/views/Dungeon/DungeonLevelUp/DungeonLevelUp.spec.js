import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import gameReducer from '../../../store/game/gameSlice'
import DungeonLevelUp from './DungeonLevelUp'

jest.mock('./Modal/LevelUpModal', () => {
  return ({ isOpen, setIsOpen }) => (
    <div onClick={setIsOpen}>LevelUpModal, isOpen: {isOpen.toString()}</div>
  )
})

describe('DungeonLevelUp', () => {
  let store

  beforeEach(() => {
    store = configureStore({ reducer: { game: gameReducer } })
  })

  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <DungeonLevelUp />
      </Provider>,
    )
    expect(screen.getByText('LevelUpModal, isOpen: true')).toBeInTheDocument()
  })

  it('dispatches battleVictory action and hides LevelUpModal when reward is selected', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    render(
      <Provider store={store}>
        <DungeonLevelUp />
      </Provider>,
    )
    fireEvent.click(screen.getByText('LevelUpModal, isOpen: true'))
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'game/battleVictory' }),
    )
    expect(screen.getByText('LevelUpModal, isOpen: false')).toBeInTheDocument()
  })
})
