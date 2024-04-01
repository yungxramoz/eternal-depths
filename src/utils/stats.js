const HEALTH_BASE_POINTS = 90
const HIT_BASE_CHANCE = 0.6

const HP_PER_HEALTH_POINT = 10
const DAMAGE_MODIFIER_PER_STRENGTH_POINT = 1
const EVADE_CHANCE_PER_AGILITY_POINT = 0.02
const CRIT_CHANCE_PER_PRECISION_POINT = 0.02
const HIT_CHANCE_PER_PRECISION_POINT = 0.05

const MAX_EVADE_CHANCE = 0.6
const MAX_CRIT_CHANCE = 0.6
const MIN_HIT_CHANCE = 0.4
const MAX_HIT_CHANCE = 0.9

const ENCOUNTER_STAT_MODIFIER = 0.3

export const healthPoints = (heaPoints, isEncounter = false) =>
  (HEALTH_BASE_POINTS + heaPoints * HP_PER_HEALTH_POINT) * modifier(isEncounter)

export const strengthPoints = (strPoints, isEncounter) =>
  strPoints * DAMAGE_MODIFIER_PER_STRENGTH_POINT * modifier(isEncounter)

//TODO this is probably not needed anymore
export const damagePoints = (dmg, strPoints, isEncounter = false) =>
  strengthPoints(strPoints, isEncounter)

export const evasionChance = (agiPoints) =>
  Math.min(MAX_EVADE_CHANCE, agiPoints * EVADE_CHANCE_PER_AGILITY_POINT)

export const criticalChance = (prePoints) =>
  Math.min(MAX_CRIT_CHANCE, prePoints * CRIT_CHANCE_PER_PRECISION_POINT)

export const toHitChance = (prePoints, targetAgiPoints) =>
  Math.min(
    MAX_HIT_CHANCE,
    Math.max(
      HIT_BASE_CHANCE +
        (prePoints - targetAgiPoints) * HIT_CHANCE_PER_PRECISION_POINT,
      MIN_HIT_CHANCE,
    ),
  )

const modifier = (isEncounter) => (isEncounter ? ENCOUNTER_STAT_MODIFIER : 1)
