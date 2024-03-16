import reducer, {
  assignAttributePoint,
  attackEffects,
  damageCharacter,
  equipItem,
  recoverHp,
  setHpToMax,
  setLook,
  setName,
} from './characterSlice'

import { BASE_ATTACK } from '../../constants/attack-type'

let initialState

describe('characterSlice', () => {
  beforeEach(() => {
    initialState = {
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
  })
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })
  it('setName sets the name of the character', () => {
    expect(reducer(initialState, setName('Test Character'))).toEqual({
      ...initialState,
      current: {
        ...initialState.current,
        name: 'Test Character',
      },
    })
  })
  it('setLook sets the look of the character', () => {
    expect(reducer(initialState, setLook(2))).toEqual({
      ...initialState,
      current: {
        ...initialState.current,
        look: 2,
      },
    })
  })
  it('assignAttributePoint assigns points to the character', () => {
    expect(
      reducer(initialState, assignAttributePoint({ strength: 1, agility: 1 })),
    ).toEqual({
      ...initialState,
      current: {
        ...initialState.current,
        hp: 100,
        maxHp: 100,
        stats: {
          health: 1,
          strength: 2,
          agility: 2,
          precision: 1,
        },
      },
      availableAttributePoints: 0,
    })
  })
  it('equipItem equips an item to the character that updates hp', () => {
    const item = {
      type: 'helmet',
      stats: {
        health: 1,
      },
    }
    expect(reducer(initialState, equipItem(item))).toEqual({
      ...initialState,
      current: {
        ...initialState.current,
        maxHp: 110,
        items: {
          ...initialState.current.items,
          helmet: item,
        },
      },
    })
  })
  it('setHpToMax sets the HP to max', () => {
    const state = {
      ...initialState,
      current: {
        ...initialState.current,
        stats: {
          ...initialState.current.stats,
          health: 11,
        },
      },
    }
    expect(reducer(state, setHpToMax())).toEqual({
      ...state,
      current: {
        ...state.current,
        maxHp: 200,
        hp: 200,
      },
    })
  })

  it('recoverHp recovers HP', () => {
    const state = {
      ...initialState,
      current: {
        ...initialState.current,
        hp: 50,
        maxHp: 100,
      },
    }
    expect(reducer(state, recoverHp(25))).toEqual({
      ...state,
      current: {
        ...state.current,
        hp: 75,
      },
    })
  })
  it('damageCharacter damages the character', () => {
    const state = {
      ...initialState,
      current: {
        ...initialState.current,
        hp: 50,
      },
    }
    expect(reducer(state, damageCharacter(25))).toEqual({
      ...state,
      current: {
        ...state.current,
        hp: 25,
      },
    })
  })
  it('damageCharacter does not go below 0', () => {
    const state = {
      ...initialState,
      current: {
        ...initialState.current,
        hp: 5,
      },
    }
    expect(reducer(state, damageCharacter(10))).toEqual({
      ...state,
      current: {
        ...state.current,
        hp: 0,
      },
    })
  })
  it('attackEffects applies self heal auto', () => {
    const state = {
      ...initialState,
      current: {
        ...initialState.current,
        hp: 50,
        attacks: [
          {
            id: 1,
            currentCooldown: 0,
          },
          {
            id: 2,
            currentCooldown: 0,
          },
        ],
      },
    }
    const attack = {
      id: 1,
      selfHealAmount: 'auto',
      selfInflictedAmount: 0,
      cooldown: 2,
    }
    const dealtDamage = 10
    expect(reducer(state, attackEffects({ attack, dealtDamage }))).toEqual({
      ...state,
      current: {
        ...state.current,
        hp: 60,
        attacks: [
          {
            id: 1,
            currentCooldown: 2,
          },
          {
            id: 2,
            currentCooldown: 0,
          },
        ],
      },
    })
  })
  it('attackEffects applies self heal fixed', () => {
    const state = {
      ...initialState,
      current: {
        ...initialState.current,
        hp: 50,
        attacks: [
          {
            id: 1,
            currentCooldown: 0,
          },
          {
            id: 2,
            currentCooldown: 0,
          },
        ],
      },
    }
    const attack = {
      id: 1,
      selfHealAmount: 5,
      selfInflictedAmount: 0,
      cooldown: 2,
    }
    const dealtDamage = 10
    expect(reducer(state, attackEffects({ attack, dealtDamage }))).toEqual({
      ...state,
      current: {
        ...state.current,
        hp: 55,
        attacks: [
          {
            id: 1,
            currentCooldown: 2,
          },
          {
            id: 2,
            currentCooldown: 0,
          },
        ],
      },
    })
  })
  it('attackEffects applies self inflicted damage', () => {
    const state = {
      ...initialState,
      current: {
        ...initialState.current,
        hp: 50,
        attacks: [
          {
            id: 1,
            currentCooldown: 0,
          },
          {
            id: 2,
            currentCooldown: 0,
          },
        ],
      },
    }
    const attack = {
      id: 1,
      selfHealAmount: 0,
      selfInflictedAmount: 5,
      cooldown: 2,
    }
    const dealtDamage = 10
    expect(reducer(state, attackEffects({ attack, dealtDamage }))).toEqual({
      ...state,
      current: {
        ...state.current,
        hp: 45,
        attacks: [
          {
            id: 1,
            currentCooldown: 2,
          },
          {
            id: 2,
            currentCooldown: 0,
          },
        ],
      },
    })
  })
  it('attackEffects applies self inflicted damage does not go below 0', () => {
    const state = {
      ...initialState,
      current: {
        ...initialState.current,
        hp: 3,
        attacks: [
          {
            id: 1,
            currentCooldown: 0,
          },
          {
            id: 2,
            currentCooldown: 0,
          },
        ],
      },
    }
    const attack = {
      id: 1,
      selfHealAmount: 0,
      selfInflictedAmount: 5,
      cooldown: 2,
    }
    const dealtDamage = 10
    expect(reducer(state, attackEffects({ attack, dealtDamage }))).toEqual({
      ...state,
      current: {
        ...state.current,
        hp: 0,
        attacks: [
          {
            id: 1,
            currentCooldown: 2,
          },
          {
            id: 2,
            currentCooldown: 0,
          },
        ],
      },
    })
  })
  it('attackEffects heal does not overheal', () => {
    const state = {
      ...initialState,
      current: {
        ...initialState.current,
        hp: 90,
        maxHp: 100,
        attacks: [
          {
            id: 1,
            currentCooldown: 0,
          },
          {
            id: 2,
            currentCooldown: 0,
          },
        ],
      },
    }
    const attack = {
      id: 1,
      selfHealAmount: 20,
      selfInflictedAmount: 0,
      cooldown: 2,
    }
    const dealtDamage = 10
    expect(reducer(state, attackEffects({ attack, dealtDamage }))).toEqual({
      ...state,
      current: {
        ...state.current,
        hp: 100,
        attacks: [
          {
            id: 1,
            currentCooldown: 2,
          },
          {
            id: 2,
            currentCooldown: 0,
          },
        ],
      },
    })
  })
  it('attackEffects applies correct cooldown', () => {
    const state = {
      ...initialState,
      current: {
        ...initialState.current,
        hp: 50,
        attacks: [
          {
            id: 1,
            currentCooldown: 1,
          },
          {
            id: 2,
            currentCooldown: 1,
          },
        ],
      },
    }
    const attack = {
      id: 1,
      selfHealAmount: 0,
      selfInflictedAmount: 0,
      cooldown: 2,
    }
    const dealtDamage = 10
    expect(reducer(state, attackEffects({ attack, dealtDamage }))).toEqual({
      ...state,
      current: {
        ...state.current,
        hp: 50,
        attacks: [
          {
            id: 1,
            currentCooldown: 2,
          },
          {
            id: 2,
            currentCooldown: 0,
          },
        ],
      },
    })
  })
})
