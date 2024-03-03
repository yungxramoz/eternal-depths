export const SWORD = Object.freeze({
  type: 'sword',
  stats: {
    minDamage: 2,
    maxDamage: 5,
  },
})
export const SHIELD = Object.freeze({
  type: 'shield',
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
