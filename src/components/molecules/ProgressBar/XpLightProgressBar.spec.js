import { render, screen } from '@testing-library/react'
import React from 'react'
import XpLightProgressBar from './XpLightProgressBar'

describe('XpLightProgressBar', () => {
  it('renders correctly', () => {
    render(<XpLightProgressBar currentLvl={1} currentXp={50} maxXp={100} />)
    expect(screen.getByText('Level 1 (50/100)')).toBeInTheDocument()
  })

  it('handles negative currentXp correctly', () => {
    render(<XpLightProgressBar currentLvl={2} currentXp={-10} maxXp={100} />)
    expect(screen.getByText('Level 2 (0/100)')).toBeInTheDocument()
  })
})
