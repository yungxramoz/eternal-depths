import { ANIMATION_STATE } from '../../constants/animation-state'
import { ATTACK, BASE_ATTACK } from '../../constants/attack-type'
import GAME_CYCLE_STATE from '../../constants/game-cycle-state'
import GAME_STATE from '../../constants/game-state'
import { RPGUI_ICON } from '../../constants/rpgui-icon'
import STAT from '../../constants/stat'
import gameReducer, {
  battleDefeat,
  battleReward,
  battleStart,
  battleVictory,
  calculatedCharacterStats,
  calculatedHpReward,
  characterAnimateIdle,
  characterAssignAttributePoint,
  characterAttackEffects,
  characterDamage,
  characterEquipItem,
  characterLearnAttack,
  characterRecoverHp,
  characterSetHpToMax,
  characterSetLook,
  characterSetName,
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
  updateGameCycleState,
} from './gameSlice'

let initialState

describe('gameSlice', () => {
  beforeEach(() => {
    initialState = {
      gameState: GAME_STATE.IDLE,
      gameCycleState: null,
      stage: 0,
      isEncounterTurn: false,
      turnCounter: 0,
      encounter: {
        current: null,
        animation: '',
        stageFileName: null,
        initiative: 0,
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
              icon: RPGUI_ICON.RUSTY_SWORD,
              stats: {
                minDamage: 3,
                maxDamage: 9,
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
        animation: '',
        initiative: 0,
        buffs: [],
        availableAttributePoints: 2,
      },
    }
  })

  it('returns initial state', () => {
    expect(gameReducer(undefined, {})).toEqual(initialState)
  })

  describe('startGame', () => {
    it('starts the game', () => {
      expect(gameReducer(initialState, gameStart())).toEqual(
        expect.objectContaining({
          gameState: GAME_STATE.PLAYING,
          stage: 1,
          gameCycleState: GAME_CYCLE_STATE.ENCOUNTER,
          encounter: expect.objectContaining({
            current: expect.any(Object),
            animation: expect.any(String),
            stageFileName: expect.any(String),
          }),
        }),
      )
    })
  })

  describe('gameOver', () => {
    it('ends the game with a loss', () => {
      expect(gameReducer(initialState, gameOver())).toEqual(
        expect.objectContaining({
          gameState: GAME_STATE.OVER,
        }),
      )
    })
  })

  describe('gameWon', () => {
    it('ends the game with a win', () => {
      expect(gameReducer(initialState, gameWon())).toEqual(
        expect.objectContaining({
          gameState: GAME_STATE.WON,
        }),
      )
    })
  })

  describe('resetGame', () => {
    it('resets the game to initial state', () => {
      expect(gameReducer(initialState, gameReset())).toEqual(initialState)
    })
  })

  describe('nextStage', () => {
    it('advances to the next stage', () => {
      expect(gameReducer(initialState, nextStage())).toEqual(
        expect.objectContaining({
          gameCycleState: GAME_CYCLE_STATE.ENCOUNTER,
          stage: 1,
          encounter: expect.objectContaining({
            current: expect.any(Object),
            animation: expect.any(String),
            stageFileName: expect.any(String),
          }),
        }),
      )
    })
  })

  describe('encounterDamage', () => {
    it('damages the encounter', () => {
      const stateWithEncounter = {
        ...initialState,
        encounter: {
          ...initialState.encounter,
          current: { hp: 10 },
        },
      }
      expect(gameReducer(stateWithEncounter, encounterDamage(5))).toEqual(
        expect.objectContaining({
          encounter: expect.objectContaining({
            current: { hp: 5 },
            animation: ANIMATION_STATE.DAMAGING,
          }),
        }),
      )
    })
  })

  describe('battleStart', () => {
    it('starts the battle with encounter turn', () => {
      const stateWithEncounter = {
        ...initialState,
        encounter: {
          ...initialState.encounter,
          current: { stats: { agility: 5 } },
        },
      }
      expect(gameReducer(stateWithEncounter, battleStart())).toEqual(
        expect.objectContaining({
          gameCycleState: GAME_CYCLE_STATE.BATTLE,
          isEncounterTurn: true,
        }),
      )
    })
    it('starts the battle with player turn', () => {
      const stateWithEncounter = {
        ...initialState,
        character: {
          ...initialState.character,
          current: {
            ...initialState.character.current,
            stats: { agility: 5 },
          },
        },
        encounter: {
          ...initialState.encounter,
          current: { stats: { agility: 1 } },
        },
      }
      expect(gameReducer(stateWithEncounter, battleStart())).toEqual(
        expect.objectContaining({
          gameCycleState: GAME_CYCLE_STATE.BATTLE,
          isEncounterTurn: false,
        }),
      )
    })
  })

  describe('battleVictory', () => {
    it('wins the battle', () => {
      expect(gameReducer(initialState, battleVictory())).toEqual(
        expect.objectContaining({
          gameCycleState: GAME_CYCLE_STATE.BATTLE_VICTORY,
        }),
      )
    })
  })

  describe('battleReward', () => {
    it('sets the reward cycle state', () => {
      expect(gameReducer(initialState, battleReward())).toEqual(
        expect.objectContaining({
          gameCycleState: GAME_CYCLE_STATE.REWARD,
        }),
      )
    })
  })

  describe('battleDefeat', () => {
    it('loses the battle', () => {
      expect(gameReducer(initialState, battleDefeat())).toEqual(
        expect.objectContaining({
          gameCycleState: GAME_CYCLE_STATE.BATTLE_DEFEAT,
        }),
      )
    })
  })

  describe('encounterAttack', () => {
    it('applies attack effects passes turn', () => {
      const stateWithEncounter = {
        ...initialState,
        encounter: {
          ...initialState.encounter,
          current: {
            stats: { hp: 50, agility: 1 },
          },
          initiative: 1,
        },
      }
      expect(gameReducer(stateWithEncounter, encounterAttack())).toEqual(
        expect.objectContaining({
          isEncounterTurn: false,
          turnCounter: 1,
          encounter: expect.objectContaining({
            animation: ANIMATION_STATE.ATTACKING,
            initiative: -3,
          }),
        }),
      )
    })

    it('applies attack effects does not pass turn', () => {
      const stateWithEncounter = {
        ...initialState,
        isEncounterTurn: true,
        encounter: {
          ...initialState.encounter,
          current: {
            stats: { hp: 50, agility: 6 },
          },
          initiative: 6,
        },
      }
      expect(gameReducer(stateWithEncounter, encounterAttack())).toEqual(
        expect.objectContaining({
          isEncounterTurn: true,
          turnCounter: 1,
          encounter: expect.objectContaining({
            animation: ANIMATION_STATE.ATTACKING,
            initiative: 1,
          }),
        }),
      )
    })
  })

  describe('encounterAnimateAttack', () => {
    it('animates the attack', () => {
      expect(gameReducer(initialState, encounterAnimateAttack())).toEqual(
        expect.objectContaining({
          encounter: expect.objectContaining({
            animation: ANIMATION_STATE.ATTACKING,
          }),
        }),
      )
    })
  })

  describe('encounterAnimateDamage', () => {
    it('animates the damage', () => {
      expect(gameReducer(initialState, encounterAnimateDamage())).toEqual(
        expect.objectContaining({
          encounter: expect.objectContaining({
            animation: ANIMATION_STATE.DAMAGING,
          }),
        }),
      )
    })
  })

  describe('encounterAnimateIdle', () => {
    it('animates the idle', () => {
      const stateWithEncounter = {
        ...initialState,
        encounter: {
          ...initialState.encounter,
          current: { idleAnimation: ANIMATION_STATE.IDLE_STANDING },
        },
      }
      expect(gameReducer(stateWithEncounter, encounterAnimateIdle())).toEqual(
        expect.objectContaining({
          encounter: expect.objectContaining({
            animation: ANIMATION_STATE.IDLE_STANDING,
          }),
        }),
      )
    })
  })

  describe('characterSetName', () => {
    it('sets the name of the character', () => {
      expect(
        gameReducer(initialState, characterSetName('Test Character')),
      ).toEqual(
        expect.objectContaining({
          character: expect.objectContaining({
            current: expect.objectContaining({
              name: 'Test Character',
            }),
          }),
        }),
      )
    })
  })

  describe('characterSetLook', () => {
    it('sets the look of the character', () => {
      expect(gameReducer(initialState, characterSetLook(2))).toEqual(
        expect.objectContaining({
          character: expect.objectContaining({
            current: expect.objectContaining({
              look: 2,
            }),
          }),
        }),
      )
    })
  })

  describe('characterAssignAttributePoint', () => {
    it('assigns points to the character', () => {
      expect(
        gameReducer(
          initialState,
          characterAssignAttributePoint({ strength: 1, agility: 1 }),
        ),
      ).toEqual(
        expect.objectContaining({
          character: expect.objectContaining({
            current: expect.objectContaining({
              hp: 100,
              stats: {
                health: 1,
                strength: 2,
                agility: 2,
                precision: 1,
              },
            }),
            availableAttributePoints: 0,
          }),
        }),
      )
    })
  })

  describe('characterEquipItem', () => {
    it('equips an item to the character', () => {
      const item = {
        type: 'helmet',
        stats: {
          health: 1,
        },
      }
      expect(gameReducer(initialState, characterEquipItem(item))).toEqual(
        expect.objectContaining({
          character: expect.objectContaining({
            current: expect.objectContaining({
              items: expect.objectContaining({
                helmet: item,
              }),
            }),
          }),
        }),
      )
    })
  })

  describe('characterSetHpToMax', () => {
    it('sets the HP to max', () => {
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
      expect(gameReducer(state, characterSetHpToMax())).toEqual(
        expect.objectContaining({
          character: expect.objectContaining({
            current: expect.objectContaining({
              hp: 200,
            }),
          }),
        }),
      )
    })
  })

  describe('characterRecoverHp', () => {
    it('recovers HP', () => {
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
      expect(gameReducer(state, characterRecoverHp(25))).toEqual(
        expect.objectContaining({
          character: expect.objectContaining({
            current: expect.objectContaining({
              hp: 75,
            }),
          }),
        }),
      )
    })
  })

  describe('characterDamage', () => {
    it('damages the character', () => {
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
      expect(gameReducer(state, characterDamage(25))).toEqual(
        expect.objectContaining({
          character: expect.objectContaining({
            animation: ANIMATION_STATE.DAMAGING,
            current: expect.objectContaining({
              hp: 25,
            }),
          }),
        }),
      )
    })
    it('sets no animation if damage is 0', () => {
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
      expect(gameReducer(state, characterDamage(0))).toEqual(
        expect.objectContaining({
          character: expect.objectContaining({
            animation: '',
          }),
        }),
      )
    })
    it('does not go below 0', () => {
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
      expect(gameReducer(state, characterDamage(10))).toEqual(
        expect.objectContaining({
          character: expect.objectContaining({
            current: expect.objectContaining({
              hp: 0,
            }),
          }),
        }),
      )
    })
  })

  describe('characterAttackEffects', () => {
    it('applies self heal auto', () => {
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
      ).toEqual(
        expect.objectContaining({
          character: expect.objectContaining({
            current: expect.objectContaining({
              hp: 60,
            }),
          }),
        }),
      )
    })
    it('applies self heal fixed', () => {
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
      ).toEqual(
        expect.objectContaining({
          character: expect.objectContaining({
            current: expect.objectContaining({
              hp: 55,
            }),
          }),
        }),
      )
    })
    it('applies self inflicted damage', () => {
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
      ).toEqual(
        expect.objectContaining({
          character: expect.objectContaining({
            current: expect.objectContaining({
              hp: 45,
            }),
          }),
        }),
      )
    })
    it('applies self inflicted damage does not go below 0', () => {
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
      ).toEqual(
        expect.objectContaining({
          character: expect.objectContaining({
            current: expect.objectContaining({
              hp: 0,
            }),
          }),
        }),
      )
    })
    it('does not overheal', () => {
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
      ).toEqual(
        expect.objectContaining({
          character: expect.objectContaining({
            current: expect.objectContaining({
              hp: 100,
            }),
          }),
        }),
      )
    })
    it('applies correct cooldown', () => {
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
      ).toEqual(
        expect.objectContaining({
          character: expect.objectContaining({
            current: expect.objectContaining({
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
            }),
          }),
        }),
      )
    })
    it('decreases buff duration', () => {
      const state = {
        ...initialState,
        character: {
          ...initialState.character,
          buffs: [
            {
              stat: STAT.STRENGTH,
              value: 5,
              duration: 2,
            },
            {
              stat: STAT.PRECISION,
              value: 5,
              duration: 1,
            },
          ],
        },
      }
      const attack = {
        id: 1,
        selfHealAmount: 0,
        selfInflictedAmount: 0,
        cooldown: 2,
        buffs: [],
      }
      const dealtDamage = 10
      expect(
        gameReducer(state, characterAttackEffects({ attack, dealtDamage })),
      ).toEqual(
        expect.objectContaining({
          character: expect.objectContaining({
            buffs: [
              {
                stat: STAT.STRENGTH,
                value: 5,
                duration: 1,
              },
            ],
          }),
        }),
      )
    })
    it('adds new buffs', () => {
      const attack = {
        id: 1,
        selfHealAmount: 0,
        selfInflictedAmount: 0,
        cooldown: 2,
        buffs: [
          {
            stat: STAT.AGILITY,
            value: 5,
            duration: 1,
          },
        ],
      }
      const dealtDamage = 10
      expect(
        gameReducer(
          initialState,
          characterAttackEffects({ attack, dealtDamage }),
        ),
      ).toEqual(
        expect.objectContaining({
          character: expect.objectContaining({
            buffs: [
              {
                stat: STAT.AGILITY,
                value: 5,
                duration: 1,
              },
            ],
          }),
        }),
      )
    })
  })

  describe('characterLearnAttack', () => {
    it('learns a new attack', () => {
      expect(
        gameReducer(initialState, characterLearnAttack(ATTACK.BERSERK_STRIKE)),
      ).toEqual(
        expect.objectContaining({
          character: expect.objectContaining({
            current: expect.objectContaining({
              attacks: [
                {
                  ...BASE_ATTACK,
                  id: 1,
                  currentCooldown: 0,
                },
                {
                  ...ATTACK.BERSERK_STRIKE,
                  id: 2,
                  currentCooldown: ATTACK.BERSERK_STRIKE.cooldown,
                },
              ],
            }),
          }),
        }),
      )
    })
  })

  describe('updateGameCycleState', () => {
    it('sets gameCycleState to BATTLE_DEFEAT if character HP is 0 or less', () => {
      initialState.character.current.hp = 0
      initialState.encounter.current = { hp: 1 }
      expect(gameReducer(initialState, updateGameCycleState())).toEqual(
        expect.objectContaining({
          gameCycleState: GAME_CYCLE_STATE.BATTLE_DEFEAT,
        }),
      )
    })
    it('sets gameCycleState to BATTLE_REWARD if encounter HP is 0 or less and character XP is less than max XP', () => {
      initialState.encounter.current = { hp: 0 }
      expect(gameReducer(initialState, updateGameCycleState())).toEqual(
        expect.objectContaining({
          gameCycleState: GAME_CYCLE_STATE.REWARD,
        }),
      )
    })
    it('should set gameCycleState to LEVEL_UP if encounter HP is 0 or less and character XP is equal to or more than max XP', () => {
      initialState.encounter.current = { level: 1, hp: 0 }
      initialState.character.current.xp = 100
      expect(gameReducer(initialState, updateGameCycleState())).toEqual(
        expect.objectContaining({
          gameCycleState: GAME_CYCLE_STATE.LEVEL_UP,
        }),
      )
    })
  })

  describe('characterAnimateIdle', () => {
    it('animates the character', () => {
      initialState.character.animation = ANIMATION_STATE.DAMAGING
      expect(gameReducer(initialState, characterAnimateIdle())).toEqual(
        expect.objectContaining({
          character: expect.objectContaining({
            animation: '',
          }),
        }),
      )
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
    it('calculatedCharacterStats returns the correct stats based on the level', () => {
      const state = {
        game: {
          character: {
            current: {
              stats: {
                health: 1,
                strength: 1,
                agility: 1,
                precision: 1,
              },
              items: {
                helmet: {
                  stats: {
                    health: 1,
                    strength: 2,
                    agility: 3,
                    precision: 4,
                  },
                },
                weapon: {
                  stats: {
                    minDamage: 2,
                    maxDamage: 4,
                  },
                },
              },
            },

            buffs: [
              {
                stat: STAT.HEALTH,
                value: 1,
                duration: 1,
              },
              {
                stat: STAT.STRENGTH,
                value: 2,
                duration: 1,
              },
              {
                stat: STAT.AGILITY,
                value: 3,
                duration: 1,
              },
              {
                stat: STAT.PRECISION,
                value: 4,
                duration: 1,
              },
            ],
          },
        },
      }
      expect(calculatedCharacterStats(state)).toEqual({
        health: 3,
        strength: 5,
        agility: 7,
        precision: 9,
        minDamage: 2,
        maxDamage: 4,
      })
    })
  })
})
