import { ENCOUNTERS } from '../constants/encounter'
import { ENCOUNTER_BOSS } from '../constants/encounter-boss'
import { damagePoints, healthPoints } from './stats'

export const generateEncounter = (
  level,
  isBoss = false,
  random = true,
  encounter = null,
) => {
  if (random) {
    const encounters = isBoss ? ENCOUNTER_BOSS : ENCOUNTERS
    const randomIndex = Math.floor(Math.random() * encounters.length)
    const randomEncounter = encounters[randomIndex]
    encounter = randomEncounter
  }

  const name = encounter.name
  const fileName = encounter.fileName
  const idleAnimation = encounter.idleAnimation
  const stages = encounter.stages
  const style = encounter.style

  const stats = generateStats(encounter.baseStats, level)
  const maxHp = healthPoints(stats.health, true)
  const hp = maxHp
  const minDamage = damagePoints(level, stats.strength, true)
  const maxDamageRange = isBoss ? 5 : 3
  const maxDamage =
    minDamage + damagePoints(maxDamageRange, stats.strength, true)

  return {
    level,
    isBoss,
    name,
    fileName,
    idleAnimation,
    stages,
    style,
    stats,
    maxHp,
    hp,
    minDamage,
    maxDamage,
  }
}

export const encounterLevel = (stage) => {
  return Math.floor((stage - 1) / 5) + 1
}

const generateStats = (baseStats, level) => {
  const stats = { ...baseStats }
  const points = level * 2
  const levelModification = level - 1
  stats.health += levelModification
  stats.strength += levelModification
  stats.agility += levelModification
  stats.precision += levelModification
  for (let i = 0; i < points; i++) {
    const randomStat = Math.floor(Math.random() * 4)
    switch (randomStat) {
      case 0:
        stats.health += 1
        break
      case 1:
        stats.strength += 1
        break
      case 2:
        stats.agility += 1
        break
      case 3:
        stats.precision += 1
        break
      default:
        break
    }
  }

  return stats
}
