import { ANIMATION_STATE } from './animation-state'

export const FIRE_DRAGON = Object.freeze({
  name: 'Fire Dragon',
  fileName: 'fire-dragon.png',
  stages: ['cave-5.png', 'dungeon-1.png'],
  idleAnimation: ANIMATION_STATE.IDLE_STANDING,
  baseStats: {
    health: 3,
    strength: 3,
    agility: 2,
    precision: 2,
  },
  style: {
    maxWidth: '90vw',
    maxHeight: '90dvh',
    alignSelf: 'flex-end',
  },
})

export const LICH = Object.freeze({
  name: 'Lich',
  fileName: 'lich.png',
  stages: ['cave-1.png', 'dungeon-1.png'],
  idleAnimation: ANIMATION_STATE.IDLE_STANDING,
  baseStats: {
    health: 2,
    strength: 2,
    agility: 3,
    precision: 3,
  },
  style: {
    maxWidth: '70vw',
    maxHeight: '70dvh',
    alignSelf: 'flex-end',
  },
})

export const MAD_MAGE = Object.freeze({
  name: 'Mad Mage',
  fileName: 'mad-mage.png',
  stages: ['dungeon-0.png', 'dungeon-2.png'],
  idleAnimation: ANIMATION_STATE.IDLE_STANDING,
  baseStats: {
    health: 2,
    strength: 3,
    agility: 2,
    precision: 3,
  },
  style: {
    maxWidth: '70vw',
    maxHeight: '70dvh',
    alignSelf: 'flex-end',
  },
})

export const SHADOW_DRAGON = Object.freeze({
  name: 'Shadow Dragon',
  fileName: 'shadow-dragon.png',
  stages: ['cave-0.png', 'cave-1.png'],
  idleAnimation: ANIMATION_STATE.IDLE_FLYING,
  baseStats: {
    health: 2,
    strength: 4,
    agility: 2,
    precision: 2,
  },
  style: {
    maxWidth: '90vw',
    maxHeight: '90dvh',
    alignSelf: 'flex-start',
  },
})

export const VAMPIRE_LORD = Object.freeze({
  name: 'Vampire Lord',
  fileName: 'vampire-lord.png',
  stages: ['dungeon-0.png', 'dungeon-2.png'],
  idleAnimation: ANIMATION_STATE.IDLE_STANDING,
  baseStats: {
    health: 3,
    strength: 2,
    agility: 3,
    precision: 3,
  },
  style: {
    maxWidth: '70vw',
    maxHeight: '70dvh',
    alignSelf: 'flex-end',
  },
})

export const ENCOUNTER_BOSS = [
  FIRE_DRAGON,
  LICH,
  MAD_MAGE,
  SHADOW_DRAGON,
  VAMPIRE_LORD,
]
