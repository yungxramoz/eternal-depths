import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { BASE_ATTACK } from '../../../constants/attack-type'
import gameReducer, { encounterDamage } from '../../../store/game/gameSlice'
import DungeonInBattle from './DungeonInBattle'
import GAME_STATE from '../../../constants/game-state'
import GAME_CYCLE_STATE from '../../../constants/game-cycle-state'

jest.mock('../../../components/molecules/Encounter/Encounter', () => () => (
  <div>Encounter</div>
))

describe('DungeonInBattle', () => {
  const initialState = {
    gameState: GAME_STATE.PLAYING,
    gameCycleState: GAME_CYCLE_STATE.BATTLE,
    isEncounterTurn: false,
    stage: 0,
    encounter: {
      current: null,
      animation: '',
      stageFileName: null,
    },
    character: {
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
    },
  }
  let store
  beforeEach(() => {
    store = configureStore({
      reducer: {
        game: gameReducer,
      },
      preloadedState: {
        game: {
          ...initialState,
          isEncounterTurn: false,
          encounter: {
            current: {
              hp: 100,
              maxHp: 100,
              minDamage: 1,
              maxDamage: 3,
              stats: { health: 1, strength: 1, agility: 1, precision: 1 },
            },
          },
          character: {
            ...initialState.character,
            current: {
              ...initialState.character.current,
              hp: 100,
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
    fireEvent.click(screen.getByRole('button'))
    expect(store.dispatch).toHaveBeenCalledTimes(2)
    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'game/encounterDamage',
        payload: expect.any(Number),
      }),
    )
    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'game/characterAttackEffects',
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
      expect.objectContaining({ type: 'game/encounterAnimateIdle' }),
    )
  })
  it('dispatches attack and damageCharacter actions when isEncounterTurn is true', async () => {
    store.dispatch(encounterDamage(1))

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
      expect.objectContaining({ type: 'game/encounterAttack' }),
    )
    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'game/characterDamage',
        payload: expect.any(Number),
      }),
    )
  })
})
