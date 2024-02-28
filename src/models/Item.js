class Item {
  constructor(name, type, rarity) {
    if(!rarity){
        const randomRarity = Math.random()
        if (randomRarity < 0.65) {
            rarity = 'common'
        } else if (randomRarity < 0.85) {
            rarity = 'rare'
        } else if (randomRarity < 0.95) {
            rarity = 'epic'
        } else {
            rarity = 'legendary'
        }
    }

    this.name = name
    this.type = type
    this.rarity = rarity
  }

  generateStats(stats) {
    switch (this.rarity) {
        case 'common':
            this.stats[this.randomStat()] += 1
            break
        case 'rare':
            for (let i = 0; i < 2; i++) {
                this.stats[this.randomStat()] += 1
            }
            break
        case 'epic':
            for (let i = 0; i < 3; i++) {
                this.stats[this.randomStat()] += 1
            }
            break
        case 'legendary':
            for (let i = 0; i < 5; i++) {
                this.stats[this.randomStat()] += 1
            }
            break
        default:
            break
    }
  }
}

class Armor extends Item {
  constructor(rarity, name = 'Armor') {
    super(name, 'armor', rarity)
    this.stats = {
      health: 0,
      strength: 0,
      agility: 0,
    }
    super.generateStats(this.stats)
  }
}

class Helmet extends Item {
  constructor(rarity, name = 'Helmet') {
    super(name, 'helmet', rarity)
    this.stats = {
      health: 0,
      precision: 0,
    }
    super.generateStats(this.stats)
  }
}

class Greaves extends Item {
  constructor(rarity, name = 'Greaves') {
    super(name, 'greaves', rarity)
    this.stats = {
        agility: 0,
      precision: 0,
    }
    super.generateStats(this.stats)
  }
}

class Weapon extends Item {
  constructor(rarity, name = 'Weapon') {
    super(name, 'weapon', rarity)
    this.stats = {
      strength: 0,
      precision: 0,
    }
  }
}

class Shield extends Item {
  constructor(rarity, name = 'Shield') {
    super(name, 'shield', rarity)
    this.stats = {
      health: 0,
    }
  }
}

module.exports = {
  Item,
  Armor,
  Helmet,
  Greaves,
  Weapon,
  Shield,
}
