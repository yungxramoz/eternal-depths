import { ENCOUNTERS } from '../constants/encounter'
import { ENCOUNTER_BOSS } from '../constants/encounter-boss'

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

  const points = level * 2
  const stats = { ...encounter.baseStats }
  generateStats(points, stats, level)

  const maxHp = stats.health * 4 + 10
  const hp = maxHp
  const minDamage = stats.strength * 2
  const maxDamageRange = isBoss ? 5 : 3
  const maxDamage = minDamage + maxDamageRange

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

const generateStats = (points, stats, level) => {
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
}
