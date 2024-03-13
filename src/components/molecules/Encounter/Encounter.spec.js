import React from 'react'
import { render } from '@testing-library/react'
import Encounter from './Encounter'

jest.mock('../../atoms/EncounterImg/EncounterImg')
describe('Encounter', () => {
  const encounter = {
    name: 'Test Encounter',
    level: 1,
    hp: 50,
    maxHp: 100,
  }

  it('renders correctly', () => {
    render(<Encounter encounter={encounter} />)
    expect(document.body).toMatchSnapshot('Encounter')
  })
  it('renders correctly with showHp', () => {
    render(<Encounter encounter={encounter} showHp />)
    expect(document.body).toMatchSnapshot('Encounter with showHp')
  })
})
