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

export const generateItem = ({ name, item, rarity, level = 1 } = {}) => {
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

  //TODO currently only swords are weapons
  item.type = item.type === 'sword' ? 'weapon' : item.type

  const stats = { ...item.stats }
  generateStats(item.type, stats, rarity, level)
  item.stats = stats

  return { ...item, rarity, name }
}

const generateStats = (type, stats, rarity, level) => {
  const rarityBasePoints = {
    [RARITY.COMMON]: 1,
    [RARITY.RARE]: 3,
    [RARITY.EPIC]: 5,
    [RARITY.LEGENDARY]: 8,
  }

  let statIncrease = rarityBasePoints[rarity] + (level - 1)

  if (type === 'weapon') {
    statIncrease = statIncrease * 2 + 5
    const distributionFactor = Math.random()
    let minDamage = Math.max(Math.floor(statIncrease * distributionFactor), 1)
    let maxDamage = Math.floor(statIncrease - minDamage)

    // Swap min and max damage if min damage is greater than max damage
    if (maxDamage < minDamage) {
      [minDamage, maxDamage] = [maxDamage, minDamage]
    }

    stats.minDamage = minDamage
    stats.maxDamage = maxDamage
  } else {
    for (let i = 0; i < statIncrease; i++) {
      stats[randomStat(stats)] += 1
    }
  }
}

export const getItemStats = (item) => {
  return Object.entries(item.stats)
    .filter(([_, value]) => value > 0)
    .map(([key, value]) => `${key.slice(0, 3).toUpperCase()}:${value}`)
    .join(', ')
}

const randomStat = (stats) => {
  const statKeys = Object.keys(stats)
  return statKeys[Math.floor(Math.random() * statKeys.length)]
}
