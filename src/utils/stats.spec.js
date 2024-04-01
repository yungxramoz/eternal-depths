import {
  criticalChance,
  damagePoints,
  evasionChance,
  healthPoints,
  strengthPoints,
  toHitChance,
} from './stats'

describe('stats', () => {
  it('healthPoints returns correct health points', () => {
    expect(healthPoints(10, false)).toBe(190)
    expect(healthPoints(10, true)).toBe(57)
  })

  it('strengthPoints returns correct strength points', () => {
    expect(strengthPoints(10, false)).toBe(10)
    expect(strengthPoints(10, true)).toBe(3)
  })

  it('damagePoints returns correct damage points', () => {
    expect(damagePoints(10, 10, false)).toBe(10)
    expect(damagePoints(10, 10, true)).toBe(3)
  })

  it('evasionChance returns correct evasion chance', () => {
    expect(evasionChance(10)).toBe(0.2)
    expect(evasionChance(30)).toBe(0.6)
  })

  it('criticalChance returns correct critical chance', () => {
    expect(criticalChance(10)).toBe(0.2)
    expect(criticalChance(30)).toBe(0.6)
  })

  it('toHitChance returns correct to hit chance', () => {
    expect(toHitChance(10, 10)).toBe(0.6)
    expect(toHitChance(20, 10)).toBe(0.9)
    expect(toHitChance(10, 20)).toBe(0.4)
  })
})
