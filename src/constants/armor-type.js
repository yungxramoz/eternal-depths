import { RPGUI_ICON } from './rpgui-icon'

export const HELMET = Object.freeze({
  type: 'helmet',
  icon: RPGUI_ICON.HELMET,
  stats: {
    health: 0,
    precision: 0,
  },
})
export const ARMOR = Object.freeze({
  type: 'armor',
  icon: RPGUI_ICON.ARMOR,
  stats: {
    health: 0,
    strength: 0,
    agility: 0,
  },
})
export const GLOVES = Object.freeze({
  type: 'gloves',
  icon: RPGUI_ICON.GLOVES,
  stats: {
    strength: 0,
    agility: 0,
    precision: 0,
  },
})
export const GREAVES = Object.freeze({
  type: 'greaves',
  icon: RPGUI_ICON.SHOES,
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
