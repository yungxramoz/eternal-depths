export const HELMET = Object.freeze({
  type: 'helmet',
  stats: {
    health: 0,
    precision: 0,
  },
})
export const ARMOR = Object.freeze({
  type: 'armor',
  stats: {
    health: 0,
    strength: 0,
    agility: 0,
  },
})
export const GLOVES = Object.freeze({
  type: 'gloves',
  stats: {
    strength: 0,
    agility: 0,
    precision: 0,
  },
})
export const GREAVES = Object.freeze({
  type: 'greaves',
  stats: {
    agility: 0,
    precision: 0,
  },
})

const ARMOR_TYPE = {
  HELMET,
  ARMOR,
  GLOVES,
  GREAVES,
}

export const ARMOR_TYPES = Object.values(ARMOR_TYPE)

export default ARMOR_TYPE
