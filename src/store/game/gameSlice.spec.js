import GAME_STATE from '../../constants/game-state'
import gameReducer, {
  damageEncounter,
  gameOver,
  gameWon,
  nextStage,
  resetGame,
  startGame,
} from './gameSlice'

let initialState

describe('gameSlice', () => {
  beforeEach(() => {
    initialState = {
      gameState: GAME_STATE.IDLE,
      stage: 0,
      encounter: null,
    }
  })

  it('returns initial state', () => {
    expect(gameReducer(undefined, {})).toEqual(initialState)
  })

  it('startGame starts the game', () => {
    expect(gameReducer(initialState, startGame())).toEqual({
      ...initialState,
      gameState: GAME_STATE.PLAYING,
      stage: 1,
      encounter: expect.any(Object),
    })
  })

  it('gameOver ends the game with a loss', () => {
    expect(gameReducer(initialState, gameOver())).toEqual({
      ...initialState,
      gameState: GAME_STATE.OVER,
    })
  })

  it('gameWon ends the game with a win', () => {
    expect(gameReducer(initialState, gameWon())).toEqual({
      ...initialState,
      gameState: GAME_STATE.WON,
    })
  })

  it('resetGame resets the game to initial state', () => {
    expect(gameReducer(initialState, resetGame())).toEqual({
      ...initialState,
      gameState: GAME_STATE.IDLE,
    })
  })

  it('nextStage advances to the next stage', () => {
    expect(gameReducer(initialState, nextStage())).toEqual({
      ...initialState,
      stage: 1,
      encounter: expect.any(Object),
    })
  })

  it('damageEncounter damages the encounter', () => {
    const stateWithEncounter = {
      ...initialState,
      encounter: { hp: 10 },
    }
    expect(gameReducer(stateWithEncounter, damageEncounter(5))).toEqual({
      ...stateWithEncounter,
      encounter: { hp: 5 },
    })
  })
})
