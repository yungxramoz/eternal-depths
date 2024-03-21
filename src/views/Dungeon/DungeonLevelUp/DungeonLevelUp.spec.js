import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import gameReducer from '../../../store/game/gameSlice'
import { generateAttack } from '../../../utils/attack'
import DungeonLevelUp from './DungeonLevelUp'

jest.mock('../../../utils/attack', () => ({
  generateAttack: jest.fn(),
}))

describe('DungeonLevelUp', () => {
  let store
  let attack

  beforeEach(() => {
    store = configureStore({ reducer: { game: gameReducer } })
    attack = {
      name: 'Test Attack',
      cooldown: 1,
      description: 'Test Description',
    }
    generateAttack.mockReturnValue(attack)
  })

  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <DungeonLevelUp />
      </Provider>,
    )
    expect(document.body).toMatchSnapshot('DungeonLevelUp')
  })

  it('renders attribute selection when points are available', () => {
    render(
      <Provider store={store}>
        <DungeonLevelUp />
      </Provider>,
    )
    fireEvent.click(screen.getByText('Attribute'))
    expect(document.body).toMatchSnapshot('DungeonLevelUp Attribute Selection')
  })

  it('sets attribute points on attribute reward selection', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    render(
      <Provider store={store}>
        <DungeonLevelUp />
      </Provider>,
    )
    fireEvent.click(screen.getByText('Attribute'))
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'game/characterSetAssignablePoints',
        payload: 2,
      }),
    )
  })

  it('sets assigned points on attribute assign', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    render(
      <Provider store={store}>
        <DungeonLevelUp />
      </Provider>,
    )
    fireEvent.click(screen.getByText('Attribute'))
    fireEvent.click(screen.getAllByRole('button')[1])
    fireEvent.click(screen.getAllByRole('button')[1])
    fireEvent.click(screen.getByText('Assign'))

    expect(screen.getByText('Available points: 0')).toBeTruthy()
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'game/characterAssignAttributePoint',
        payload: expect.objectContaining({
          health: 2,
        }),
      }),
    )
  })

  it('learns new attack on attack reward selection', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    render(
      <Provider store={store}>
        <DungeonLevelUp />
      </Provider>,
    )
    fireEvent.click(screen.getByText('Test Attack'))
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'game/characterLearnAttack',
        payload: attack,
      }),
    )
  })
})
