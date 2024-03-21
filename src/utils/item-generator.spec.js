import ARMOR_TYPE from '../constants/armor-type'
import RARITY from '../constants/rarity'
import WEAPON_TYPE from '../constants/weapon-type'
import { generateItem } from './item-generator'

describe('item-generator', () => {
  it('generateItem creates an item with the correct properties', () => {
    const item = generateItem({
      name: 'Test Item',
      item: ARMOR_TYPE.HELMET,
      rarity: RARITY.COMMON,
    })
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
  it('increases the stats of a COMMON item by 1', () => {
    const item = {
      type: ARMOR_TYPE.HELMET.type,
      stats: { strength: 0 },
    }
    const generatedItem = generateItem({
      name: 'Test Item',
      item,
      rarity: RARITY.COMMON,
    })
    expect(generatedItem.stats.strength).toBe(1)
  })
  it('increases the stats of a RARE item by 3', () => {
    const item = {
      type: ARMOR_TYPE.HELMET.type,
      stats: { strength: 0 },
    }
    const generatedItem = generateItem({
      name: 'Test Item',
      item,
      rarity: RARITY.RARE,
    })
    expect(generatedItem.stats.strength).toBe(3)
  })
  it('increases the stats of an EPIC item by 5', () => {
    const item = {
      type: ARMOR_TYPE.HELMET.type,
      stats: { strength: 0 },
    }
    const generatedItem = generateItem({
      name: 'Test Item',
      item,
      rarity: RARITY.EPIC,
    })
    expect(generatedItem.stats.strength).toBe(5)
  })
  it('increases the stats of a LEGENDARY item by 8', () => {
    const item = {
      type: ARMOR_TYPE.HELMET.type,
      stats: { strength: 0 },
    }
    const generatedItem = generateItem({
      name: 'Test Item',
      item,
      rarity: RARITY.LEGENDARY,
    })
    expect(generatedItem.stats.strength).toBe(8)
  })
  it('increases the max and min stat of a weapon item', () => {
    const item = {
      type: WEAPON_TYPE.SWORD.type,
      stats: { minDamage: 0, maxDamage: 0 },
    }
    const generatedItem = generateItem({
      name: 'Test Item',
      item,
      rarity: RARITY.LEGENDARY,
    })
    expect(generatedItem.stats.minDamage).toBeGreaterThan(0)
    expect(generatedItem.stats.maxDamage).toBeGreaterThan(0)
  })
  it('increases stat by level', () => {
    const item = {
      type: ARMOR_TYPE.HELMET.type,
      stats: { strength: 0 },
    }
    const generatedItem = generateItem({
      name: 'Test Item',
      item,
      rarity: RARITY.COMMON,
      level: 5,
    })
    expect(generatedItem.stats.strength).toBe(5)
  })
  it('generates common item by 65% chance', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.65)
    let item = generateItem()
    expect(item.rarity).toBe(RARITY.COMMON)
  })
  it('generates rare item by 20% chance', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.66)
    let item = generateItem()
    expect(item.rarity).toBe(RARITY.RARE)
    jest.spyOn(global.Math, 'random').mockReturnValue(0.85)
    item = generateItem()
    expect(item.rarity).toBe(RARITY.RARE)
  })
  it('generates epic item by 10% chance', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.86)
    let item = generateItem()
    expect(item.rarity).toBe(RARITY.EPIC)
    jest.spyOn(global.Math, 'random').mockReturnValue(0.95)
    item = generateItem()
    expect(item.rarity).toBe(RARITY.EPIC)
  })
  it('generates legendary item by 5% chance', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.96)
    const item = generateItem()
    expect(item.rarity).toBe(RARITY.LEGENDARY)
  })
})
