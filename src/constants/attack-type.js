import STAT from './stat'

const NORMAL = 'normal'

export const ATTACK_TYPE = {
  NORMAL,
}

export const EMPTY_ATTACK = Object.freeze({
  name: 'Empty Attack',
  description: 'An empty attack.',
  icon: 'attack-empty',
  type: 'normal',
  selfHealAmount: 0,
  selfInflictedAmount: 0,
  hitCount: 1,
  additionalDamage: 0,
  damageDecrease: 0,
  safeHit: false,
  cooldown: 0,
  buffs: [],
})

export const BASE_ATTACK = Object.freeze({
  name: 'Base Attack',
  description: 'A basic attack that deals damage to the enemy.',
  icon: 'attack-base',
  type: 'normal',
  selfHealAmount: 0,
  selfInflictedAmount: 0,
  hitCount: 1,
  additionalDamage: 0,
  damageDecrease: 0,
  safeHit: false,
  cooldown: 0,
  buffs: [],
})

const DRAIN = Object.freeze({
  name: 'Drain',
  description: 'Steal health from the enemy.',
  icon: 'attack-drain',
  type: 'normal',
  selfHealAmount: 'auto',
  selfInflictedAmount: 0,
  hitCount: 1,
  additionalDamage: 0,
  safeHit: false,
  cooldown: 2,
  buffs: [],
})

const DANCE_OF_THE_DEAD = Object.freeze({
  name: 'Dance of the Dead',
  description:
    'Attack the enemy 3 times, dealing reduced damage, and increase agility by 5 for 1 turn',
  icon: 'attack-dance-of-the-dead',
  type: 'normal',
  selfHealAmount: 0,
  selfInflictedAmount: 0,
  hitCount: 3,
  additionalDamage: -4,
  safeHit: false,
  cooldown: 2,
  buffs: [
    {
      stat: STAT.AGILITY,
      value: 5,
      duration: 1,
    },
  ],
})

const BLOODLUST = Object.freeze({
  name: 'Bloodlust',
  description: 'Increase strength and precision by 5 for 1 turn.',
  icon: 'attack-bloodlust',
  type: 'normal',
  selfHealAmount: 0,
  selfInflictedAmount: 0,
  hitCount: 1,
  cooldown: 2,
  additionalDamage: 0,
  buffs: [
    {
      stat: STAT.STRENGTH,
      value: 5,
      duration: 1,
    },
    {
      stat: STAT.PRECISION,
      value: 5,
      duration: 1,
    },
  ],
})

const BERSERK_STRIKE = Object.freeze({
  name: 'Berserk Strike',
  description:
    'Deal guaranteed massive damage to the enemy and inflict 6 damage to self. This attack also increases strength by 7 for 2 turns.',
  icon: 'attack-berserk-strike',
  type: 'normal',
  selfHealAmount: 0,
  selfInflictedAmount: 6,
  hitCount: 1,
  additionalDamage: 20,
  safeHit: true,
  cooldown: 4,
  buffs: [
    {
      stat: STAT.STRENGTH,
      value: 7,
      duration: 2,
    },
  ],
})

const DOUBLE_STRIKE = Object.freeze({
  name: 'Double Strike',
  description: 'Attack the enemy twice, dealing slightly reduced damage.',
  icon: 'attack-double-strike',
  type: 'normal',
  selfHealAmount: 0,
  selfInflictedAmount: 0,
  hitCount: 2,
  additionalDamage: -3,
  safeHit: false,
  cooldown: 1,
  buffs: [],
})

const DEATH_BLOW = Object.freeze({
  name: 'Death Blow',
  description: 'Deal guaranteed massive damage to the enemy.',
  icon: 'attack-death-blow',
  type: 'normal',
  selfHealAmount: 0,
  selfInflictedAmount: 0,
  hitCount: 1,
  additionalDamage: 100,
  safeHit: true,
  cooldown: 10,
  buffs: [],
})

export const ATTACK = {
  DRAIN,
  DANCE_OF_THE_DEAD,
  BLOODLUST,
  BERSERK_STRIKE,
  DOUBLE_STRIKE,
  DEATH_BLOW,
}
