export const BARBARIAN = Object.freeze({
  name: 'Barbarian',
  fileName: 'barbarian.png',
  baseStats: {
    health: 2,
    strength: 2,
    agility: 1,
    precision: 1,
  },
  style: {
    maxWidth: '60vw',
    maxHeight: '60vh',
    alignSelf: 'flex-end',
  },
})

export const BAT = Object.freeze({
  name: 'Giant Bat',
  fileName: 'bat.png',
  baseStats: {
    health: 1,
    strength: 1,
    agility: 3,
    precision: 1,
  },
  style: {
    maxWidth: '70vw',
    maxHeight: '70vh',
    alignSelf: 'flex-start',
  },
})

export const GOBLIN = Object.freeze({
  name: 'Goblin',
  fileName: 'goblin.png',
  baseStats: {
    health: 1,
    strength: 2,
    agility: 2,
    precision: 1,
  },
  style: {
    maxWidth: '45vw',
    maxHeight: '45vh',
    alignSelf: 'flex-end',
  },
})

export const ORC = Object.freeze({
  name: 'Orc',
  fileName: 'orc.png',
  baseStats: {
    health: 3,
    strength: 2,
    agility: 0,
    precision: 0,
  },
  style: {
    maxWidth: '70vw',
    maxHeight: '70vh',
    alignSelf: 'flex-end',
  },
})

export const SCOUNDREL = Object.freeze({
  name: 'Scoundrel',
  fileName: 'scoundrel.png',
  baseStats: {
    health: 1,
    strength: 1,
    agility: 1,
    precision: 1,
  },
  style: {
    maxWidth: '60vw',
    maxHeight: '60vh',
    alignSelf: 'flex-end',
  },
})

export const SKELETON = Object.freeze({
  name: 'Skeleton',
  fileName: 'skeleton.png',
  baseStats: {
    health: 2,
    strength: 1,
    agility: 1,
    precision: 0,
  },
  style: {
    maxWidth: '60vw',
    maxHeight: '60vh',
    alignSelf: 'flex-end',
  },
})

export const SNAKE = Object.freeze({
  name: 'Snake',
  fileName: 'snake.png',
  baseStats: {
    health: 1,
    strength: 1,
    agility: 2,
    precision: 2,
  },
  style: {
    maxWidth: '40vw',
    maxHeight: '40vh',
    alignSelf: 'flex-end',
  },
})

export const SPIDER = Object.freeze({
  name: 'Spider',
  fileName: 'spider.png',
  baseStats: {
    health: 1,
    strength: 1,
    agility: 2,
    precision: 1,
  },
  style: {
    maxWidth: '60vw',
    maxHeight: '60vh',
    alignSelf: 'flex-end',
  },
})

export const THIEF = Object.freeze({
  name: 'Thief',
  fileName: 'thief.png',
  baseStats: {
    health: 1,
    strength: 0,
    agility: 2,
    precision: 3,
  },
  style: {
    maxWidth: '60vw',
    maxHeight: '60vh',
    alignSelf: 'flex-end',
  },
})

export const WOLF = Object.freeze({
  name: 'Wolf',
  fileName: 'wolf.png',
  baseStats: {
    health: 2,
    strength: 2,
    agility: 1,
    precision: 0,
  },
  style: {
    maxWidth: '50vw',
    maxHeight: '50vh',
    alignSelf: 'flex-end',
  },
})

export const Encounters = [
  BARBARIAN,
  BAT,
  GOBLIN,
  ORC,
  SCOUNDREL,
  SKELETON,
  SNAKE,
  SPIDER,
  THIEF,
  WOLF,
]
