import { RPGUI_ICON } from './rpgui-icon'

export const SWORD = Object.freeze({
  type: 'sword',
  icon: RPGUI_ICON.SWORD,
  stats: {
    minDamage: 2,
    maxDamage: 5,
  },
})
export const SHIELD = Object.freeze({
  type: 'shield',
  icon: RPGUI_ICON.SHIELD,
  stats: {
    health: 0,
  },
})

const WEAPON_TYPE = {
  SWORD,
  SHIELD,
}

export const WEAPON_TYPES = Object.values(WEAPON_TYPE)

export default WEAPON_TYPE
