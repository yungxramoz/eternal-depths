import ATTACK_RESULT from '../constants/attack-result'
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
  damage = Math.max(damage + attack.additionalDamage, 1) // additional damage can be negative
  if (!attack.safeHit) {
    const isHit = determineHit(sourceStats, targetStats)
    if (!isHit) {
      return {
        result: ATTACK_RESULT.MISSED,
        damage: 0,
      }
    }

    const isEvaded = determineEvade(targetStats)
    if (isEvaded) {
      return {
        result: ATTACK_RESULT.EVADED,
        damage: 0,
      }
    }

    const isCritical = determineCritical(sourceStats)
    if (isCritical) {
      return {
        result: ATTACK_RESULT.CRITICAL,
        damage: Math.floor(damage * 1.5),
      }
    }
  }

  return {
    result: ATTACK_RESULT.HIT,
    damage,
  }
}

const determineDamage = (sourceStats, isEncounter) => {
  const damageModifier = damagePoints(1, sourceStats.strength, isEncounter)
  const minDamage = sourceStats.minDamage + damageModifier
  const maxDamage = sourceStats.maxDamage + damageModifier

  const damage = Math.floor(Math.random() * (maxDamage - minDamage)) + minDamage

  return damage
}

const determineHit = (sourceStats, targetStats) =>
  Math.random() < toHitChance(sourceStats.precision, targetStats.agility)

const determineEvade = (targetStats) =>
  Math.random() < evasionChance(targetStats.agility)

const determineCritical = (sourceStats) =>
  Math.random() < criticalChance(sourceStats.precision)
