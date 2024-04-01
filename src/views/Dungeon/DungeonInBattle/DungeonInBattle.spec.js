import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import GAME_CYCLE_STATE from '../../../constants/game-cycle-state'
import GAME_STATE from '../../../constants/game-state'
import gameReducer from '../../../store/game/gameSlice'
import { BASE_ATTACK } from '../../../constants/attack-type'
import DungeonInBattle from './DungeonInBattle'

jest.mock('../../../components/molecules/Encounter/Encounter', () => () => (
  <div>Encounter</div>
))
jest.mock(
  '../../../components/atoms/DamageIndicator/DamageIndicator',
  () => () => <div>DamageIndicator</div>,
)

describe('DungeonInBattle', () => {
  let store
  let preloadedState

  beforeEach(() => {
    preloadedState = {
      game: {
        gameState: GAME_STATE.PLAYING,
        gameCycleState: GAME_CYCLE_STATE.BATTLE,
        isEncounterTurn: false,
        stage: 0,
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
          buffs: [],
          current: {
            hp: 100,
            attacks: [
              {
                ...BASE_ATTACK,
                id: 1,
              },
            ],
            stats: { health: 1, strength: 1, agility: 1, precision: 1 },
            items: {
              helmet: null,
              armor: null,
              weapon: {
                name: 'Mock Swort',
                icon: 'mockWeapon',
                stats: {
                  minDamage: 3,
                  maxDamage: 9,
                },
              },
              shield: null,
              greaves: null,
            },
          },
        },
      },
    }
    store = configureStore({
      reducer: {
        game: gameReducer,
      },
      preloadedState,
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

  it('dispatches encounterDamage and characterAttackEffects actions when an attack button is clicked', async () => {
    jest.useFakeTimers()
    store.dispatch = jest.fn()
    render(
      <Provider store={store}>
        <DungeonInBattle />
      </Provider>,
    )
    fireEvent.click(screen.getByRole('button'))
    jest.runAllTimers()

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'game/encounterDamage',
          payload: expect.any(Number),
        }),
      )
    })

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'game/encounterAnimateIdle',
        }),
      )
    })

    await waitFor(() => {
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
  })

  it('dispatches encounterAttack and characterDamage actions when isEncounterTurn is true', async () => {
    preloadedState.game.isEncounterTurn = true
    store = configureStore({
      reducer: {
        game: gameReducer,
      },
      preloadedState,
    })
    jest.useFakeTimers()
    store.dispatch = jest.fn()
    render(
      <Provider store={store}>
        <DungeonInBattle />
      </Provider>,
    )

    jest.runAllTimers()
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
