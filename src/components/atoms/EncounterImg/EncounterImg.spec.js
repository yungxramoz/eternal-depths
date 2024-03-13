import React from 'react'
import { render, screen } from '@testing-library/react'
import EncounterImg from './EncounterImg'

describe('EncounterImg', () => {
  const encounter = {
    name: 'Test Encounter',
    fileName: 'test_encounter.png',
    style: { width: '100px', height: '100px' },
  }

  const encounterAnimationState = 'test-animation-state'

  it('renders correctly', () => {
    render(
      <EncounterImg
        encounter={encounter}
        encounterAnimationState={encounterAnimationState}
      />,
    )
    expect(document.body).toMatchSnapshot('EncounterImg')
  })
})
