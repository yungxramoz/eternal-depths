import { ANIMATION_STATE } from '../../constants/animation-state'
import { BASE_ATTACK } from '../../constants/attack-type'
import GAME_CYCLE_STATE from '../../constants/game-cycle-state'
import GAME_STATE from '../../constants/game-state'
import gameReducer, {
  battleDefeat,
  battleStart,
  battleVictory,
  calculatedHpReward,
  characterAssignAttributePoint,
  characterAttackEffects,
  characterDamage,
  characterEquipItem,
  characterRecoverHp,
  characterSetHpToMax,
  characterSetLook,
  characterSetName,
  damageEncounter,
  encounterAnimateAttack,
  encounterAnimateDamage,
  encounterAnimateIdle,
  encounterAttack,
  encounterDamage,
  gameOver,
  gameReset,
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
      isEncounterTurn: false,
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
  })

  it('returns initial state', () => {
    expect(gameReducer(undefined, {})).toEqual(initialState)
  })

  it('startGame starts the game', () => {
    expect(gameReducer(initialState, gameStart())).toEqual({
      ...initialState,
      gameState: GAME_STATE.PLAYING,
      stage: 1,
      gameCycleState: GAME_CYCLE_STATE.ENCOUNTER,
      isEncounterTurn: expect.any(Boolean),
      encounter: {
        current: expect.any(Object),
        animation: expect.any(String),
        stageFileName: expect.any(String),
      },
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
    expect(gameReducer(initialState, gameReset())).toEqual({
      ...initialState,
      gameState: GAME_STATE.IDLE,
      gameCycleState: null,
    })
  })

  it('nextStage advances to the next stage', () => {
    expect(gameReducer(initialState, nextStage())).toEqual({
      ...initialState,
      gameCycleState: GAME_CYCLE_STATE.ENCOUNTER,
      stage: 1,
      encounter: {
        current: expect.any(Object),
        animation: expect.any(String),
        stageFileName: expect.any(String),
      },
    })
  })

  it('damageEncounter damages the encounter', () => {
    const stateWithEncounter = {
      ...initialState,
      encounter: {
        ...initialState.encounter,
        current: { hp: 10 },
      },
    }
    expect(gameReducer(stateWithEncounter, encounterDamage(5))).toEqual({
      ...stateWithEncounter,
      encounter: {
        ...stateWithEncounter.encounter,
        current: { hp: 5 },
        animation: ANIMATION_STATE.DAMAGING,
      },
      isEncounterTurn: true,
    })
  })

  it('battleStart starts the battle with encounter turn', () => {
    const stateWithEncounter = {
      ...initialState,
      encounter: {
        ...initialState.encounter,
        current: { stats: { agility: 5 } },
      },
    }
    expect(gameReducer(stateWithEncounter, battleStart(10))).toEqual({
      ...stateWithEncounter,
      gameCycleState: GAME_CYCLE_STATE.BATTLE,
      isEncounterTurn: false,
    })
  })

  it('battleStart starts the battle with player turn', () => {
    const stateWithEncounter = {
      ...initialState,
      encounter: {
        ...initialState.encounter,
        current: { stats: { agility: 10 } },
      },
    }
    expect(gameReducer(stateWithEncounter, battleStart(5))).toEqual({
      ...stateWithEncounter,
      gameCycleState: GAME_CYCLE_STATE.BATTLE,
      isEncounterTurn: true,
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
    const stateWithEncounter = {
      ...initialState,
      encounter: {
        ...initialState.encounter,
        current: { hp: 50 },
      },
    }
    expect(gameReducer(stateWithEncounter, encounterAttack())).toEqual({
      ...initialState,
      isEncounterTurn: false,
      encounter: {
        ...initialState.encounter,
        animation: ANIMATION_STATE.ATTACKING,
        current: expect.any(Object),
      },
    })
  })

  it('animateAttack animates the attack', () => {
    expect(gameReducer(initialState, encounterAnimateAttack())).toEqual({
      ...initialState,
      encounter: {
        ...initialState.encounter,
        animation: ANIMATION_STATE.ATTACKING,
      },
    })
  })

  it('animateDamage animates the damage', () => {
    expect(gameReducer(initialState, encounterAnimateDamage())).toEqual({
      ...initialState,
      encounter: {
        ...initialState.encounter,
        animation: ANIMATION_STATE.DAMAGING,
      },
    })
  })

  it('animateIdle animates the idle', () => {
    const stateWithEncounter = {
      ...initialState,
      encounter: {
        ...initialState.encounter,
        current: { idleAnimation: ANIMATION_STATE.IDLE_STANDING },
      },
    }
    expect(gameReducer(stateWithEncounter, encounterAnimateIdle())).toEqual({
      ...stateWithEncounter,
      encounter: {
        ...stateWithEncounter.encounter,
        animation: ANIMATION_STATE.IDLE_STANDING,
      },
    })
  })
  it('setName sets the name of the character', () => {
    expect(
      gameReducer(initialState, characterSetName('Test Character')),
    ).toEqual({
      ...initialState,
      character: {
        ...initialState.character,
        current: {
          ...initialState.character.current,
          name: 'Test Character',
        },
      },
    })
  })
  it('setLook sets the look of the character', () => {
    expect(gameReducer(initialState, characterSetLook(2))).toEqual({
      ...initialState,
      character: {
        ...initialState.character,
        current: {
          ...initialState.character.current,
          look: 2,
        },
      },
    })
  })
  it('assignAttributePoint assigns points to the character', () => {
    expect(
      gameReducer(
        initialState,
        characterAssignAttributePoint({ strength: 1, agility: 1 }),
      ),
    ).toEqual({
      ...initialState,
      character: {
        ...initialState.character,
        current: {
          ...initialState.character.current,
          hp: 100,
          stats: {
            health: 1,
            strength: 2,
            agility: 2,
            precision: 1,
          },
        },
        availableAttributePoints: 0,
      },
    })
  })
  it('equips an item to the character', () => {
    const item = {
      type: 'helmet',
      stats: {
        health: 1,
      },
    }
    expect(gameReducer(initialState, characterEquipItem(item))).toEqual({
      ...initialState,
      character: {
        ...initialState.character,
        current: {
          ...initialState.character.current,
          items: {
            ...initialState.character.current.items,
            helmet: item,
          },
        },
      },
    })
  })
  it('setHpToMax sets the HP to max', () => {
    const state = {
      ...initialState,
      character: {
        ...initialState.character,
        current: {
          ...initialState.character.current,
          stats: {
            ...initialState.character.current.stats,
            health: 11,
          },
        },
      },
    }
    expect(gameReducer(state, characterSetHpToMax())).toEqual({
      ...state,
      character: {
        ...state.character,
        current: {
          ...state.character.current,
          hp: 200,
        },
      },
    })
  })

  it('recoverHp recovers HP', () => {
    const state = {
      ...initialState,
      character: {
        ...initialState.character,
        current: {
          ...initialState.character.current,
          hp: 50,
        },
      },
    }
    expect(gameReducer(state, characterRecoverHp(25))).toEqual({
      ...state,
      character: {
        ...state.character,
        current: {
          ...state.character.current,
          hp: 75,
        },
      },
    })
  })
  it('damageCharacter damages the character', () => {
    const state = {
      ...initialState,
      encounter: {
        ...initialState.encounter,
        current: { hp: 50 },
      },
      character: {
        ...initialState.character,
        current: {
          ...initialState.character.current,
          hp: 50,
        },
      },
    }
    expect(gameReducer(state, characterDamage(25))).toEqual({
      ...state,
      character: {
        ...state.character,
        current: {
          ...state.character.current,
          hp: 25,
        },
      },
    })
  })
  it('damageCharacter does not go below 0', () => {
    const state = {
      ...initialState,
      encounter: {
        ...initialState.encounter,
        current: { hp: 50 },
      },
      character: {
        ...initialState.character,
        current: {
          ...initialState.character.current,
          hp: 5,
        },
      },
    }
    expect(gameReducer(state, characterDamage(10))).toEqual({
      ...state,
      gameCycleState: GAME_CYCLE_STATE.BATTLE_DEFEAT,
      character: {
        ...state.character,
        current: {
          ...state.character.current,
          hp: 0,
        },
      },
    })
  })
  it('attackEffects applies self heal auto', () => {
    const state = {
      ...initialState,
      encounter: {
        ...initialState.encounter,
        current: { hp: 50 },
      },
      character: {
        ...initialState.character,
        current: {
          ...initialState.character.current,
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
      },
    }
    const attack = {
      id: 1,
      selfHealAmount: 'auto',
      selfInflictedAmount: 0,
      cooldown: 2,
    }
    const dealtDamage = 10
    expect(
      gameReducer(state, characterAttackEffects({ attack, dealtDamage })),
    ).toEqual({
      ...state,
      character: {
        ...state.character,
        current: {
          ...state.character.current,
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
      },
    })
  })
  it('attackEffects applies self heal fixed', () => {
    const state = {
      ...initialState,
      encounter: {
        ...initialState.encounter,
        current: { hp: 50 },
      },
      character: {
        ...initialState.character,
        current: {
          ...initialState.character.current,
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
      },
    }
    const attack = {
      id: 1,
      selfHealAmount: 5,
      selfInflictedAmount: 0,
      cooldown: 2,
    }
    const dealtDamage = 10
    expect(
      gameReducer(state, characterAttackEffects({ attack, dealtDamage })),
    ).toEqual({
      ...state,
      character: {
        ...state.character,
        current: {
          ...state.character.current,
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
      },
    })
  })
  it('attackEffects applies self inflicted damage', () => {
    const state = {
      ...initialState,
      encounter: {
        ...initialState.encounter,
        current: { hp: 50 },
      },
      character: {
        ...initialState.character,
        current: {
          ...initialState.character.current,
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
      },
    }
    const attack = {
      id: 1,
      selfHealAmount: 0,
      selfInflictedAmount: 5,
      cooldown: 2,
    }
    const dealtDamage = 10
    expect(
      gameReducer(state, characterAttackEffects({ attack, dealtDamage })),
    ).toEqual({
      ...state,
      character: {
        ...state.character,
        current: {
          ...state.character.current,
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
      },
    })
  })
  it('attackEffects applies self inflicted damage does not go below 0', () => {
    const state = {
      ...initialState,
      encounter: {
        ...initialState.encounter,
        current: { hp: 50 },
      },
      character: {
        ...initialState.character,
        current: {
          ...initialState.character.current,
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
      },
    }
    const attack = {
      id: 1,
      selfHealAmount: 0,
      selfInflictedAmount: 5,
      cooldown: 2,
    }
    const dealtDamage = 10
    expect(
      gameReducer(state, characterAttackEffects({ attack, dealtDamage })),
    ).toEqual({
      ...state,
      gameCycleState: GAME_CYCLE_STATE.BATTLE_DEFEAT,
      character: {
        ...state.character,
        current: {
          ...state.character.current,
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
      },
    })
  })
  it('attackEffects heal does not overheal', () => {
    const state = {
      ...initialState,
      encounter: {
        ...initialState.encounter,
        current: { hp: 50 },
      },
      character: {
        ...initialState.character,
        current: {
          ...initialState.character.current,
          hp: 90,
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
      },
    }
    const attack = {
      id: 1,
      selfHealAmount: 20,
      selfInflictedAmount: 0,
      cooldown: 2,
    }
    const dealtDamage = 10
    expect(
      gameReducer(state, characterAttackEffects({ attack, dealtDamage })),
    ).toEqual({
      ...state,
      character: {
        ...state.character,
        current: {
          ...state.character.current,
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
      },
    })
  })
  it('attackEffects applies correct cooldown', () => {
    const state = {
      ...initialState,
      encounter: {
        ...initialState.encounter,
        current: { hp: 50 },
      },
      character: {
        ...initialState.character,
        current: {
          ...initialState.character.current,
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
      },
    }
    const attack = {
      id: 1,
      selfHealAmount: 0,
      selfInflictedAmount: 0,
      cooldown: 2,
    }
    const dealtDamage = 10
    expect(
      gameReducer(state, characterAttackEffects({ attack, dealtDamage })),
    ).toEqual({
      ...state,
      character: {
        ...state.character,
        current: {
          ...state.character.current,
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
      },
    })
  })
  describe('selectors', () => {
    it('calculatedHpReward returns the correct HP reward based on the stage', () => {
      const state = { game: { stage: 10 } }
      expect(calculatedHpReward(state)).toBe(25)
    })

    it('calculatedHpReward returns 50 if the stage is high enough', () => {
      const state = { game: { stage: 100 } }
      expect(calculatedHpReward(state)).toBe(50)
    })
  })
})
