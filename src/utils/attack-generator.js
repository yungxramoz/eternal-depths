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
