import reducer, {
  assignAttributePoint,
  equipItem,
  getCalculatedStats,
  setLook,
  setName,
} from './characterSlice'

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
      reducer(initialState, assignAttributePoint({ health: 1, strength: 1 })),
    ).toEqual({
      ...initialState,
      current: {
        ...initialState.current,
        stats: {
          health: 2,
          strength: 2,
          agility: 1,
          precision: 1,
        },
      },
      availableAttributePoints: 0,
    })
  })
  it('getCalculatedStats returns the correct stats', () => {
    expect(reducer(initialState, getCalculatedStats())).toEqual({
      ...initialState.current.stats,
    })
  })
  it('equipItem equips an item to the character', () => {
    const item = {
      name: 'Iron Helmet',
      stats: {
        health: 1,
        strength: 1,
        agility: 1,
        precision: 1,
      },
    }
    expect(reducer(initialState, equipItem({ slot: 'helmet', item }))).toEqual({
      ...initialState,
      current: {
        ...initialState.current,
        items: {
          ...initialState.current.items,
          helmet: item,
        },
      },
    })
  })
})
