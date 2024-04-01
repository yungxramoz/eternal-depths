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

const COMMON_STAT_POINTS = 1
const RARE_STAT_POINTS = 3
const EPIC_STAT_POINTS = 5
const LEGENDARY_STAT_POINTS = 8

const WEAPON_STAT_BASE_MODIFIER = 2
const WEAPON_STAT_BASE_ADDITION = 12

const COMMON_RARITY = 0.65
const RARE_RARITY = 0.85
const EPIC_RARITY = 0.95

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
    if (randomRarity <= COMMON_RARITY) {
      rarity = RARITY.COMMON
    } else if (randomRarity <= RARE_RARITY) {
      rarity = RARITY.RARE
    } else if (randomRarity <= EPIC_RARITY) {
      rarity = RARITY.EPIC
    } else {
      rarity = RARITY.LEGENDARY
    }
  }

  //TODO currently only swords are weapons
  item.type = item.type === 'sword' ? 'weapon' : item.type
  item.stats = generateStats(item.type, item.stats, rarity, level)

  return { ...item, rarity, name }
}

const generateStats = (type, stats, rarity, level) => {
  const newStats = { ...stats }
  const rarityBasePoints = {
    [RARITY.COMMON]: COMMON_STAT_POINTS,
    [RARITY.RARE]: RARE_STAT_POINTS,
    [RARITY.EPIC]: EPIC_STAT_POINTS,
    [RARITY.LEGENDARY]: LEGENDARY_STAT_POINTS,
  }

  let statIncrease = rarityBasePoints[rarity] + (level - 1)

  if (type === 'weapon') {
    statIncrease =
      statIncrease * WEAPON_STAT_BASE_MODIFIER + WEAPON_STAT_BASE_ADDITION
    const distributionFactor = Math.random()
    let minDamage = Math.max(Math.floor(statIncrease * distributionFactor), 1)
    let maxDamage = Math.floor(statIncrease - minDamage)

    // Swap min and max damage if min damage is greater than max damage
    if (maxDamage < minDamage) {
      const temp = maxDamage
      maxDamage = minDamage
      minDamage = temp
    }

    newStats.minDamage = minDamage
    newStats.maxDamage = maxDamage
  } else {
    for (let i = 0; i < statIncrease; i++) {
      newStats[randomStat(stats)] += 1
    }
  }
  return newStats
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
