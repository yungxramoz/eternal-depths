export const BARBARIAN = Object.freeze({
  name: 'Barbarian',
  fileName: 'barbarian.png',
  stages: ['dungeon-3.png', 'dungeon-4.png', 'dungeon-5.png'],
  baseStats: {
    health: 2,
    strength: 2,
    agility: 1,
    precision: 1,
  },
  style: {
    maxWidth: '60vw',
    maxHeight: 'd60vh',
    alignSelf: 'flex-end',
  },
})

export const BAT = Object.freeze({
  name: 'Giant Bat',
  fileName: 'bat.png',
  stages: ['cave-0.png', 'cave-1.png', 'cave-2.png', 'cave-3.png'],
  baseStats: {
    health: 1,
    strength: 1,
    agility: 3,
    precision: 1,
  },
  style: {
    maxWidth: '70vw',
    maxHeight: '70dvh',
    alignSelf: 'flex-start',
  },
})

export const GOBLIN = Object.freeze({
  name: 'Goblin',
  fileName: 'goblin.png',
  stages: ['dungeon-0.png', 'dungeon-1.png', 'dungeon-2.png'],
  baseStats: {
    health: 1,
    strength: 2,
    agility: 2,
    precision: 1,
  },
  style: {
    maxWidth: '45vw',
    maxHeight: '45dvh',
    alignSelf: 'flex-end',
  },
})

export const ORC = Object.freeze({
  name: 'Orc',
  fileName: 'orc.png',
  stages: ['dungeon-3.png', 'dungeon-5.png'],
  baseStats: {
    health: 3,
    strength: 2,
    agility: 0,
    precision: 0,
  },
  style: {
    maxWidth: '70vw',
    maxHeight: '70dvh',
    alignSelf: 'flex-end',
  },
})

export const SCOUNDREL = Object.freeze({
  name: 'Scoundrel',
  fileName: 'scoundrel.png',
  stages: ['dungeon-3.png', 'dungeon-4.png', 'dungeon-5.png'],
  baseStats: {
    health: 1,
    strength: 1,
    agility: 1,
    precision: 1,
  },
  style: {
    maxWidth: '60vw',
    maxHeight: '60dvh',
    alignSelf: 'flex-end',
  },
})

export const SKELETON = Object.freeze({
  name: 'Skeleton',
  fileName: 'skeleton.png',
  stages: ['dungeon-4.png', 'dungeon-5.png'],
  baseStats: {
    health: 2,
    strength: 1,
    agility: 1,
    precision: 0,
  },
  style: {
    maxWidth: '60vw',
    maxHeight: '60dvh',
    alignSelf: 'flex-end',
  },
})

export const SNAKE = Object.freeze({
  name: 'Snake',
  fileName: 'snake.png',
  stages: ['cave-1.png', 'cave-2.png', 'cave-3.png'],
  baseStats: {
    health: 1,
    strength: 1,
    agility: 2,
    precision: 2,
  },
  style: {
    maxWidth: '40vw',
    maxHeight: '40dvh',
    alignSelf: 'flex-end',
  },
})

export const SPIDER = Object.freeze({
  name: 'Spider',
  fileName: 'spider.png',
  stages: ['cave-1.png', 'cave-2.png', 'dungeon-4.png', 'dungeon-5.png'],
  baseStats: {
    health: 1,
    strength: 1,
    agility: 2,
    precision: 1,
  },
  style: {
    maxWidth: '60vw',
    maxHeight: '60dvh',
    alignSelf: 'flex-end',
  },
})

export const THIEF = Object.freeze({
  name: 'Thief',
  fileName: 'thief.png',
  stages: ['dungeon-3.png', 'dungeon-4.png', 'dungeon-5.png'],
  baseStats: {
    health: 1,
    strength: 0,
    agility: 2,
    precision: 3,
  },
  style: {
    maxWidth: '60vw',
    maxHeight: '60dvh',
    alignSelf: 'flex-end',
  },
})

export const WOLF = Object.freeze({
  name: 'Wolf',
  fileName: 'wolf.png',
  stages: ['dungeon-3.png', 'cave-5.png'],
  baseStats: {
    health: 2,
    strength: 2,
    agility: 1,
    precision: 0,
  },
  style: {
    maxWidth: '50vw',
    maxHeight: '50dvh',
    alignSelf: 'flex-end',
  },
})

export const ENCOUNTERS = [
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
