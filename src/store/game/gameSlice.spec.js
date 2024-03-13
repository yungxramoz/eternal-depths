import { ANIMATION_STATE } from '../../constants/animation-state'
import GAME_CYCLE_STATE from '../../constants/game-cycle-state'
import GAME_STATE from '../../constants/game-state'
import gameReducer, {
  animateAttack,
  animateDamage,
  animateIdle,
  attack,
  battleDefeat,
  battleStart,
  battleVictory,
  damageEncounter,
  gameOver,
  gameStart,
  gameWon,
  nextStage,
  resetGame,
} from './gameSlice'

let initialState

describe('gameSlice', () => {
  beforeEach(() => {
    initialState = {
      gameState: GAME_STATE.IDLE,
      gameCycleState: null,
      stage: 0,
      encounter: null,
      encounterAnimation: '',
      stageFileName: null,
      encounterTurn: false,
    }
  })

  it('returns initial state', () => {
    expect(gameReducer(undefined, {})).toEqual(initialState)
  })

  it('startGame starts the game', () => {
    expect(gameReducer(initialState, gameStart())).toEqual({
      ...initialState,
      gameState: GAME_STATE.PLAYING,
      stage: 1,
      encounter: expect.any(Object),
      gameCycleState: GAME_CYCLE_STATE.ENCOUNTER,
      encounterAnimation: expect.any(String),
      stageFileName: expect.any(String),
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
      gameCycleState: null,
    })
  })

  it('nextStage advances to the next stage', () => {
    expect(gameReducer(initialState, nextStage())).toEqual({
      ...initialState,
      stage: 1,
      encounter: expect.any(Object),
      encounterAnimation: expect.any(String),
      gameCycleState: GAME_CYCLE_STATE.ENCOUNTER,
      stageFileName: expect.any(String),
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
      encounterAnimation: ANIMATION_STATE.DAMAGING,
      encounterTurn: true,
    })
  })

  it('battleStart starts the battle with encounter turn', () => {
    const stateWithEncounter = {
      ...initialState,
      encounter: { stats: { agility: 5 } },
    }
    expect(gameReducer(stateWithEncounter, battleStart(10))).toEqual({
      ...stateWithEncounter,
      gameCycleState: GAME_CYCLE_STATE.BATTLE,
      encounterTurn: false,
    })
  })

  it('battleStart starts the battle with player turn', () => {
    const stateWithEncounter = {
      ...initialState,
      encounter: { stats: { agility: 10 } },
    }
    expect(gameReducer(stateWithEncounter, battleStart(5))).toEqual({
      ...stateWithEncounter,
      gameCycleState: GAME_CYCLE_STATE.BATTLE,
      encounterTurn: true,
    })
  })

  it('battleVictory wins the battle', () => {
    expect(gameReducer(initialState, battleVictory())).toEqual({
      ...initialState,
      gameCycleState: GAME_CYCLE_STATE.BATTLE_VICTORY,
    })
  })

  it('battleDefeat loses the battle', () => {
    expect(gameReducer(initialState, battleDefeat())).toEqual({
      ...initialState,
      gameCycleState: GAME_CYCLE_STATE.BATTLE_DEFEAT,
    })
  })

  it('attack attacks the encounter', () => {
    expect(gameReducer(initialState, attack())).toEqual({
      ...initialState,
      encounterTurn: false,
      encounterAnimation: ANIMATION_STATE.ATTACKING,
    })
  })

  it('animateAttack animates the attack', () => {
    expect(gameReducer(initialState, animateAttack())).toEqual({
      ...initialState,
      encounterAnimation: ANIMATION_STATE.ATTACKING,
    })
  })

  it('animateDamage animates the damage', () => {
    expect(gameReducer(initialState, animateDamage())).toEqual({
      ...initialState,
      encounterAnimation: ANIMATION_STATE.DAMAGING,
    })
  })

  it('animateIdle animates the idle', () => {
    const stateWithEncounter = {
      ...initialState,
      encounter: { idleAnimation: ANIMATION_STATE.IDLE_STANDING },
    }
    expect(gameReducer(stateWithEncounter, animateIdle())).toEqual({
      ...stateWithEncounter,
      encounterAnimation: ANIMATION_STATE.IDLE_STANDING,
    })
  })
})
