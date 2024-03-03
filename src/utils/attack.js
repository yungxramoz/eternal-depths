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
