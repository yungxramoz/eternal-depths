import { ENCOUNTERS } from '../constants/encounter'
import { ENCOUNTER_BOSS } from '../constants/encounter-boss'

class Encounter {
  constructor(level, isBoss = false, randomEncounter = true, encounter = null) {
    if (randomEncounter) {
      const encounters = isBoss ? ENCOUNTER_BOSS : ENCOUNTERS
      const randomIndex = Math.floor(Math.random() * encounters.length)
      const randomEncounter = encounters[randomIndex]
      encounter = randomEncounter
    }

    this.level = level
    this.isBoss = isBoss
    this.name = encounter.name
    this.fileName = encounter.fileName
    this.style = encounter.style

    const points = level * 2
    const stats = encounter.baseStats
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
    this.stats = stats
    this.maxHp = stats.health * 3 + 10
    this.hp = this.maxHp
    this.minDamage = stats.strength * 2
    const maxDamageRange = isBoss ? 5 : 3
    this.maxDamage = this.minDamage + maxDamageRange
  }

  attack() {
    return (
      Math.floor(Math.random() * (this.maxDamage - this.minDamage)) +
      this.minDamage
    )
  }

  takeDamage(damage) {
    this.hp -= damage
  }

  isDefeated() {
    return this.hp <= 0
  }
}

export default Encounter
