const { Weapon } = require('./Item')

class Character {
  constructor(name, look = 1) {
    this.look = look
    this.name = name
    this.level = 1
    this.xp = 0
    this.currentHp = 100
    this.health = 1
    this.strength = 1
    this.speed = 1
    this.precision = 1
    this.helmet = null
    this.armor = null
    this.weapon = new Weapon('common')
    this.shield = null
    this.greaves = null
  }

  increaseAttributes({ health = 0, strength = 0, speed = 0, precision = 0 }) {
    this.health += health
    this.strength += strength
    this.speed += speed
    this.precision += precision
  }

  calculatedStats() {
    const stats = {
      health: this.health,
      strength: this.strength,
      speed: this.speed,
      precision: this.precision,
    }
    const items = [
      this.helmet,
      this.armor,
      this.weapon,
      this.shield,
      this.greaves,
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

module.exports = Character
