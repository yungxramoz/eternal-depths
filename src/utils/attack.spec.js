import ATTACK_RESULT from '../constants/attack-result'
import { calculateDamage } from './attack'
import {
  criticalChance,
  damagePoints,
  evasionChance,
  toHitChance,
} from './stats'

jest.mock('./stats', () => ({
  criticalChance: jest.fn(),
  damagePoints: jest.fn(),
  evasionChance: jest.fn(),
  toHitChance: jest.fn(),
}))

describe('attack', () => {
  let attack
  const sourceStats = {
    minDamage: 1,
    maxDamage: 3,
    health: 1,
    strength: 1,
    precision: 1,
    agility: 1,
  }
  const targetStats = { agility: 1 }

  const defineMocks = (critChance, damage, evadeChance, hitChance, random) => {
    criticalChance.mockReturnValue(critChance)
    damagePoints.mockReturnValue(damage)
    evasionChance.mockReturnValue(evadeChance)
    toHitChance.mockReturnValue(hitChance)
    jest.spyOn(global.Math, 'random').mockImplementation(() => random)
  }

  beforeEach(() => {
    attack = {
      additionalDamage: 5,
      safeHit: false,
    }
    defineMocks(0.5, 2, 0.5, 0.5, 0.4)
  })

  afterEach(() => {
    global.Math.random.mockRestore()
  })

  describe('calculateDamage', () => {
    it('returns normal hit result', () => {
      defineMocks(0, 2, 0, 1.1, 1)
      const result = calculateDamage(attack, sourceStats, targetStats, false)
      expect(result).toEqual({ result: ATTACK_RESULT.HIT, damage: 10 })
    })
    it('returns critical hit result', () => {
      defineMocks(1.1, 2, 0, 1.1, 1)
      const result = calculateDamage(attack, sourceStats, targetStats, false)
      expect(result).toEqual({ result: ATTACK_RESULT.CRITICAL, damage: 15 })
    })
    it('returns missed result', () => {
      defineMocks(0, 2, 0, 0, 1)
      const result = calculateDamage(attack, sourceStats, targetStats, false)
      expect(result).toEqual({ result: ATTACK_RESULT.MISSED, damage: 0 })
    })
    it('returns evaded result', () => {
      defineMocks(0, 2, 1.1, 1.1, 1)
      const result = calculateDamage(attack, sourceStats, targetStats, false)
      expect(result).toEqual({ result: ATTACK_RESULT.EVADED, damage: 0 })
    })
    it('normal hits on safe hit attack', () => {
      attack.safeHit = true
      defineMocks(1.1, 2, 1.1, 1.1, 1)
      const result = calculateDamage(attack, sourceStats, targetStats, false)
      expect(result).toEqual({ result: ATTACK_RESULT.HIT, damage: 10 })
    })
  })
})
