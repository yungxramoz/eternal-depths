//eg attack
// const DEATH_BLOW = Object.freeze({
//     name: 'Death Blow',
//     description: 'Deal massive damage to the enemy.',
//     type: 'normal',
//     selfHealAmount: 0,
//     selfInflictedAmount: 0,
//     hitCount: 1,
//     damageIncrease: 50,
//     criticalChance: 0,
//     cooldown: 5,
//   })

import { ATTACK } from '../constants/attack-type'

const getRandomAttack = () => {
  const attacks = Object.values(ATTACK)
  return attacks[Math.floor(Math.random() * attacks.length)]
}

export const generateAttack = (attack) => {
  if (!attack) {
    attack = getRandomAttack()
  }
  return attack
}

export const calculateDamage = (
  attack,
  characterStats,
  minDamage,
  maxDamage,
) => {
  let damage = 0
  const { precision, strength } = characterStats

  for (let i = 0; i < attack.hitCount; i++) {
    let hitDamage =
      Math.floor(Math.random() * (maxDamage - minDamage + 1)) +
      minDamage +
      strength +
      attack.damageIncrease

    const criticalHit = Math.random() < precision / 100 + attack.criticalChance
    if (criticalHit) {
      hitDamage *= 2
      console.log('Critical hit!')
    }
    damage += hitDamage
  }

  return damage
}
