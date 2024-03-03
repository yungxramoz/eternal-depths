import { generateItem } from './item-generator'
import ARMOR_TYPE from '../constants/armor-type'
import RARITY from '../constants/rarity'
import WEAPON_TYPE from '../constants/weapon-type'

describe('item-generator', () => {
  it('generateItem creates an item with the correct properties', () => {
    const item = generateItem('Test Item', ARMOR_TYPE.HELMET, RARITY.COMMON)
    expect(item).toHaveProperty('name', 'Test Item')
    expect(item).toHaveProperty('type', ARMOR_TYPE.HELMET.type)
    expect(item).toHaveProperty('rarity', RARITY.COMMON)
    expect(item).toHaveProperty('stats')
  })

  it('generateItem creates an item with random properties if none are provided', () => {
    const item = generateItem()
    expect(item).toHaveProperty('name')
    expect(item).toHaveProperty('type')
    expect(item).toHaveProperty('rarity')
    expect(item).toHaveProperty('stats')
  })

  it('generateStats increases the stats of an item based on its rarity', () => {
    const item = {
      type: WEAPON_TYPE.SWORD.type,
      stats: { minDamage: 0, maxDamage: 0 },
    }
    generateItem('Test Item', item, RARITY.LEGENDARY)
    expect(item.stats.minDamage).toBeGreaterThan(0)
    expect(item.stats.maxDamage).toBeGreaterThan(0)
  })
})
