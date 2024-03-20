import { render, screen } from '@testing-library/react'
import React from 'react'
import HpLightProgressBar from './HpLightProgressBar'

describe('HpLightProgressBar', () => {
  it('renders correctly', () => {
    render(<HpLightProgressBar currentHp={50} maxHp={100} />)
    expect(screen.getByText('HP (50/100)')).toBeInTheDocument()
  })

  it('handles negative currentHp correctly', () => {
    render(<HpLightProgressBar currentHp={-10} maxHp={100} />)
    expect(screen.getByText('HP (0/100)')).toBeInTheDocument()
  })
})
