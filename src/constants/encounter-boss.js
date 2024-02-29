export const FIRE_DRAGON = Object.freeze({
  name: 'Fire Dragon',
  fileName: 'fire-dragon.png',
  baseStats: {
    health: 3,
    strength: 3,
    agility: 2,
    precision: 2,
  },
  style: {
    maxWidth: '95vw',
    maxHeight: '95vh',
    alignSelf: 'flex-end',
  },
})

export const LICH = Object.freeze({
  name: 'Lich',
  fileName: 'lich.png',
  baseStats: {
    health: 2,
    strength: 2,
    agility: 3,
    precision: 3,
  },
  style: {
    maxWidth: '70vw',
    maxHeight: '70vh',
    alignSelf: 'flex-end',
  },
})

export const MAD_MAGE = Object.freeze({
  name: 'Mad Mage',
  fileName: 'mad-mage.png',
  baseStats: {
    health: 2,
    strength: 3,
    agility: 2,
    precision: 3,
  },
  style: {
    maxWidth: '70vw',
    maxHeight: '70vh',
    alignSelf: 'flex-end',
  },
})

export const SHADOW_DRAGON = Object.freeze({
  name: 'Shadow Dragon',
  fileName: 'shadow-dragon.png',
  baseStats: {
    health: 2,
    strength: 4,
    agility: 2,
    precision: 2,
  },
  style: {
    maxWidth: '95vw',
    maxHeight: '95vh',
    alignSelf: 'flex-start',
  },
})

export const VAMPIRE_LORD = Object.freeze({
  name: 'Vampire Lord',
  fileName: 'vampire-lord.png',
  baseStats: {
    health: 3,
    strength: 2,
    agility: 3,
    precision: 3,
  },
  style: {
    maxWidth: '70vw',
    maxHeight: '70vh',
    alignSelf: 'flex-end',
  },
})

export const BossEncounters = [
  FIRE_DRAGON,
  LICH,
  MAD_MAGE,
  SHADOW_DRAGON,
  VAMPIRE_LORD,
]
