import ARMOR_TYPE from '../constants/armor-type'
import RARITY from '../constants/rarity'
import WEAPON_TYPE from '../constants/weapon-type'

const items = [
  ARMOR_TYPE.HELMET,
  ARMOR_TYPE.ARMOR,
  ARMOR_TYPE.GLOVES,
  ARMOR_TYPE.GREAVES,
  WEAPON_TYPE.SWORD,
  WEAPON_TYPE.SHIELD,
]

export const generateItem = (name, item, rarity) => {
  item = item ? { ...item } : null
  if (!item) {
    item = { ...items[Math.floor(Math.random() * items.length)] }
  }
  if (!name) {
    name = item.type.charAt(0).toUpperCase() + item.type.slice(1)
  }
  if (!rarity) {
    const randomRarity = Math.random()
    if (randomRarity <= 0.65) {
      rarity = RARITY.COMMON
    } else if (randomRarity <= 0.85) {
      rarity = RARITY.RARE
    } else if (randomRarity <= 0.95) {
      rarity = RARITY.EPIC
    } else {
      rarity = RARITY.LEGENDARY
    }
  }

  const stats = { ...item.stats }
  generateStats(item.type, stats, rarity)
  item.stats = stats

  //TODO currently only swords are weapons
  item.type = item.type === 'sword' ? 'weapon' : item.type

  return { ...item, rarity, name }
}

const generateStats = (type, stats, rarity) => {
  let statIncrease
  switch (rarity) {
    case RARITY.COMMON:
      statIncrease = 1
      break
    case RARITY.RARE:
      statIncrease = 3
      break
    case RARITY.EPIC:
      statIncrease = 5
      break
    case RARITY.LEGENDARY:
      statIncrease = 8
      break
    default:
      break
  }

  if (type === 'weapon') {
    statIncrease = Math.floor(Math.random() * (statIncrease * 2)) + statIncrease
    stats.minDamage += Math.floor(Math.random() * statIncrease)
    stats.maxDamage += statIncrease - stats.minDamage
  } else {
    for (let i = 0; i < statIncrease; i++) {
      stats[randomStat(stats)] += 1
    }
  }
}

const randomStat = (stats) => {
  const statKeys = Object.keys(stats)
  return statKeys[Math.floor(Math.random() * statKeys.length)]
}
