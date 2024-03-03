import { generateEncounter, encounterLevel } from './encounter-generator'

describe('encounter-generator', () => {
  it('generateEncounter creates an encounter with the correct properties', () => {
    const encounter = generateEncounter(1)
    expect(encounter).toHaveProperty('level', 1)
    expect(encounter).toHaveProperty('isBoss', false)
    expect(encounter).toHaveProperty('name')
    expect(encounter).toHaveProperty('fileName')
    expect(encounter).toHaveProperty('style')
    expect(encounter).toHaveProperty('stats')
    expect(encounter).toHaveProperty('maxHp')
    expect(encounter).toHaveProperty('hp')
    expect(encounter).toHaveProperty('minDamage')
    expect(encounter).toHaveProperty('maxDamage')
  })

  it('generateEncounter creates a boss encounter if isBoss is true', () => {
    const encounter = generateEncounter(1, true)
    expect(encounter.isBoss).toBe(true)
  })

  it('encounterLevel calculates the correct level based on the stage', () => {
    expect(encounterLevel(1)).toBe(1)
    expect(encounterLevel(5)).toBe(1)
    expect(encounterLevel(6)).toBe(2)
    expect(encounterLevel(10)).toBe(2)
    expect(encounterLevel(11)).toBe(3)
  })
})
