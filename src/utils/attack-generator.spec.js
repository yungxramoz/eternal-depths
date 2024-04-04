import { ATTACK } from '../constants/attack-type'
import { generateAttack } from './attack-generator'

describe('attack-generator', () => {
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
})
