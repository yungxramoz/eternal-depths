import { Weapon } from './Item'

export class Character {
  constructor() {
    this.look = 1
    this.name = ''
    this.level = 1
    this.xp = 0
    this.stats = {
      health: 1,
      strength: 1,
      agility: 1,
      precision: 1,
    }
    this.items = {
      helmet: null,
      armor: null,
      weapon: new Weapon('common'),
      shield: null,
      greaves: null,
    }
  }

  increaseAttributes({ health = 0, strength = 0, agility = 0, precision = 0 }) {
    this.stats.health += health
    this.stats.strength += strength
    this.stats.agility += agility
    this.stats.precision += precision
  }

  calculatedStats() {
    const stats = {
      health: this.stats.health,
      strength: this.stats.strength,
      agility: this.stats.agility,
      precision: this.stats.precision,
    }
    const items = [
      this.items.helmet,
      this.items.armor,
      this.items.weapon,
      this.items.shield,
      this.items.greaves,
    ]
    for (const item of items) {
      if (item) {
        for (const stat in item.stats) {
          stats[stat] += item.stats[stat]
        }
      }
    }
    return stats
  }
}

export default Character
