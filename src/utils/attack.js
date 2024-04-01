import {
  criticalChance,
  damagePoints,
  evasionChance,
  toHitChance,
} from './stats'

export const calculateDamage = (
  attack,
  sourceStats,
  targetStats,
  isEncounter = false,
) => {
  let damage = determineDamage(sourceStats, isEncounter)
  damage += attack.additionalDamage
  const isHit = determineHit(sourceStats, targetStats, isEncounter)
  if (!isHit) {
    return {
      result: 'missed',
      damage: 0,
    }
  }

  const isEvaded = determineEvade(targetStats, isEncounter)
  if (isEvaded) {
    return {
      result: 'evaded',
      damage: 0,
    }
  }

  const isCritical = determineCritical(sourceStats, isEncounter)
  if (isCritical) {
    return {
      result: 'critical',
      damage: damage * 2,
    }
  }

  return {
    result: 'hit',
    damage,
  }
}

const determineDamage = (sourceStats, isEncounter) => {
  const damageModifier = damagePoints(1, sourceStats.strength, isEncounter)
  const minDamage = sourceStats.minDamage + damageModifier
  const maxDamage = sourceStats.maxDamage + damageModifier

  const damage = Math.floor(Math.random() * (maxDamage - minDamage) + minDamage)
  return damage
}

const determineHit = (sourceStats, targetStats, isEncounter) =>
  Math.random() <
  toHitChance(sourceStats.precision, targetStats.agility, isEncounter)

const determineEvade = (targetStats, isEncounter) =>
  Math.random() < evasionChance(targetStats.agility, isEncounter)

const determineCritical = (sourceStats, isEncounter) =>
  Math.random() < criticalChance(sourceStats.precision, isEncounter)
