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

jest.mock('./Modal/AttackReplaceModal', () => () => (
  <div>AttackReplaceModal</div>
))

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
    fireEvent.click(
      screen.getByRole('button', {
        name: 'Test Attack Cooldown: 1 Test Description',
      }),
    )
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'game/characterLearnAttack',
        payload: attack,
      }),
    )
  })
  it('opens attack replace modal on attack reward selection', () => {
    store = configureStore({
      reducer: {
        game: gameReducer,
      },
      preloadedState: {
        game: {
          ...store.getState().game,
          character: {
            ...store.getState().game.character,
            current: {
              ...store.getState().game.character.current,

              attacks: [
                {
                  id: 1,
                  name: 'Attack 1',
                  currentCooldown: 0,
                },
                {
                  id: 2,
                  name: 'Attack 2',
                  currentCooldown: 0,
                },
                {
                  id: 3,
                  name: 'Attack 3',
                  currentCooldown: 0,
                },
              ],
            },
          },
        },
      },
    })
    render(
      <Provider store={store}>
        <DungeonLevelUp />
      </Provider>,
    )
    fireEvent.click(
      screen.getByRole('button', {
        name: 'Test Attack Cooldown: 1 Test Description',
      }),
    )
    expect(screen.getByText('AttackReplaceModal')).toBeTruthy()
  })
})
