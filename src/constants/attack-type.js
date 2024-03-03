const NORMAL = 'normal'

export const ATTACK_TYPE = {
  NORMAL,
}

export const BASE_ATTACK = Object.freeze({
  name: 'Base Attack',
  description: 'A basic attack that deals damage to the enemy.',
  type: 'normal',
  selfHealAmount: 0,
  selfInflictedAmount: 0,
  hitCount: 1,
  damageIncrease: 0,
  damageDecrease: 0,
  criticalChance: 0,
  cooldown: 0,
})

const DRAIN = Object.freeze({
  name: 'Drain',
  description: 'Steal health from the enemy.',
  type: 'normal',
  selfHealAmount: 'auto',
  selfInflictedAmount: 0,
  hitCount: 1,
  damageIncrease: 0,
  criticalChance: 0,
  cooldown: 1,
})

const DANCE_OF_THE_DEAD = Object.freeze({
  name: 'Dance of the Dead',
  description: 'Attack the enemy multiple times.',
  type: 'normal',
  selfHealAmount: 0,
  selfInflictedAmount: 0,
  hitCount: 3,
  damageIncrease: 0,
  criticalChance: 0,
  cooldown: 2,
})

const BLOODLUST = Object.freeze({
  name: 'Bloodlust',
  description: 'Increase damage and critical chance.',
  type: 'normal',
  selfHealAmount: 0,
  selfInflictedAmount: 0,
  hitCount: 1,
  damageIncrease: 2,
  criticalChance: 0.2,
  cooldown: 2,
})

const BERSERK_STRIKE = Object.freeze({
  name: 'Berserk Strike',
  description: 'Deal massive damage to the enemy and inflicts damage to self.',
  type: 'normal',
  selfHealAmount: 0,
  selfInflictedAmount: 6,
  hitCount: 1,
  damageIncrease: 20,
  criticalChance: 0,
  cooldown: 3,
})

const DOUBLE_STRIKE = Object.freeze({
  name: 'Double Strike',
  description: 'Attack the enemy twice.',
  type: 'normal',
  selfHealAmount: 0,
  selfInflictedAmount: 0,
  hitCount: 2,
  damageIncrease: 0,
  criticalChance: 0,
  cooldown: 1,
})

const DEATH_BLOW = Object.freeze({
  name: 'Death Blow',
  description: 'Deal massive damage to the enemy.',
  type: 'normal',
  selfHealAmount: 0,
  selfInflictedAmount: 0,
  hitCount: 1,
  damageIncrease: 50,
  criticalChance: 0,
  cooldown: 5,
})

export const ATTACK = {
  DRAIN,
  DANCE_OF_THE_DEAD,
  BLOODLUST,
  BERSERK_STRIKE,
  DOUBLE_STRIKE,
  DEATH_BLOW,
}
