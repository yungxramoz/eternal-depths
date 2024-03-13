import { ATTACK } from '../constants/attack-type'
import { calculateDamage, generateAttack } from './attack'

describe('attack', () => {
  describe('generateAttack', () => {
    it('returns a random attack if no attack is provided', () => {
      const attack = generateAttack()
      expect(Object.values(ATTACK)).toContainEqual(attack)
    })

    it('returns the provided attack', () => {
      const attack = ATTACK.DEATH_BLOW
      expect(generateAttack(attack)).toBe(attack)
    })
  })

  describe('calculateDamage', () => {
    const attack = ATTACK.DEATH_BLOW
    const sourceStats = { strength: 1, precision: 0 }
    const minDamage = 1
    const maxDamage = 10
    const targetStats = { agility: 0 }

    it('returns the correct damage', () => {
      const damage = calculateDamage(
        attack,
        sourceStats,
        minDamage,
        maxDamage,
        targetStats,
      )
      expect(damage).toBeGreaterThanOrEqual(minDamage)
      expect(damage).toBeLessThanOrEqual(
        maxDamage + sourceStats.strength + attack.damageIncrease,
      )
    })

    it('returns 0 if the target evades the attack', () => {
      jest
        .spyOn(global.Math, 'random')
        .mockReturnValueOnce(0) // Attack hit
        .mockReturnValueOnce(0) // Evade
      const damage = calculateDamage(
        attack,
        sourceStats,
        minDamage,
        maxDamage,
        { ...targetStats, agility: 1 },
      )
      expect(damage).toBe(0)
      jest.spyOn(global.Math, 'random').mockRestore()
    })

    it('returns double damage if it is a critical hit', () => {
      jest
        .spyOn(global.Math, 'random')
        .mockReturnValueOnce(0) // attack hit
        .mockReturnValueOnce(1) // Not evade
        .mockReturnValueOnce(0) // Critical hit
      const damage = calculateDamage(
        attack,
        { ...sourceStats, precision: 1 },
        minDamage,
        maxDamage,
        targetStats,
      )
      expect(damage).toBeGreaterThanOrEqual(
        2 * (minDamage + sourceStats.strength + attack.damageIncrease),
      )
      expect(damage).toBeLessThanOrEqual(
        2 * (maxDamage + sourceStats.strength + attack.damageIncrease),
      )
      jest.spyOn(global.Math, 'random').mockRestore()
    })
  })
})
