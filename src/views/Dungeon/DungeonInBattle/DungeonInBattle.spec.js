import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import gameReducer, { damageEncounter } from '../../../store/game/gameSlice'
import DungeonInBattle from './DungeonInBattle'
import { BASE_ATTACK } from '../../../constants/attack-type'

describe('DungeonInBattle', () => {
  const initialState = {
    current: {
      look: 1,
      name: '',
      level: 1,
      xp: 0,
      stats: {
        health: 1,
        strength: 1,
        agility: 1,
        precision: 1,
      },
      items: {
        helmet: null,
        armor: null,
        weapon: {
          name: 'Rusty Sword',
          stats: {
            minDamage: 1,
            maxDamage: 3,
          },
        },
        shield: null,
        greaves: null,
      },
      attacks: [
        {
          ...BASE_ATTACK,
          id: 1,
          currentCooldown: 0,
        },
      ],
    },
    availableAttributePoints: 2,
  }
  let store
  beforeEach(() => {
    store = configureStore({
      reducer: {
        game: gameReducer,
      },
      preloadedState: {
        character: {
          ...initialState,
          current: {
            ...initialState.current,
            hp: 100,
            maxHp: 100,
            attacks: [
              {
                id: 1,
                name: 'Attack 1',
                currentCooldown: 0,
                fileName: 'mockAttack.png',
              },
            ],
            stats: { health: 1, strength: 1, agility: 1, precision: 1 },
          },
        },
        game: {
          isEncounterTurn: false,
          encounter: {
            hp: 100,
            maxHp: 100,
            minDamage: 1,
            maxDamage: 3,
            stats: { health: 1, strength: 1, agility: 1, precision: 1 },
          },
        },
      },
    })
  })
  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <DungeonInBattle />
      </Provider>,
    )
    expect(document.body).toMatchSnapshot('DungeonInBattle')
  })
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('dispatches damageEncounter and attackEffects actions when an attack button is clicked', () => {
    store.dispatch = jest.fn()
    render(
      <Provider store={store}>
        <DungeonInBattle />
      </Provider>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Attack 1' }))
    expect(store.dispatch).toHaveBeenCalledTimes(2)
    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'game/damageEncounter',
        payload: expect.any(Number),
      }),
    )
    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'character/attackEffects',
        payload: {
          attack: expect.any(Object),
          dealtDamage: expect.any(Number),
        },
      }),
    )
  })
  it('dispatches animateIdle action when isEncounterTurn is false', async () => {
    jest.useFakeTimers()
    store.dispatch = jest.fn()
    render(
      <Provider store={store}>
        <DungeonInBattle />
      </Provider>,
    )
    jest.runAllTimers()
    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'game/animateIdle' }),
    )
  })
  it('dispatches attack and damageCharacter actions when isEncounterTurn is true', async () => {
    store.dispatch(damageEncounter(1))

    jest.useFakeTimers()
    store.dispatch = jest.fn()
    render(
      <Provider store={store}>
        <DungeonInBattle />
      </Provider>,
    )

    jest.runAllTimers()
    expect(store.dispatch).toHaveBeenCalledTimes(2)
    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'game/attack' }),
    )
    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'character/damageCharacter',
        payload: expect.any(Number),
      }),
    )
  })
})
