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
  sourceStats,
  minDamage,
  maxDamage,
  targetStats,
) => {
  let damage = 0

  for (let i = 0; i < attack.hitCount; i++) {
    let hitDamage =
      Math.floor(Math.random() * (maxDamage - minDamage + 1)) +
      minDamage +
      sourceStats.strength +
      attack.damageIncrease

    const evade = Math.random() < targetStats.agility / 50
    if (evade) {
      console.log('Evade!')
      continue
    }

    const criticalHit =
      Math.random() < sourceStats.precision / 50 + attack.criticalChance
    if (criticalHit) {
      hitDamage *= 2
      console.log('Critical hit!')
    }
    damage += hitDamage
  }

  return damage
}
