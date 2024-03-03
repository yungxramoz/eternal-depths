import { render, screen } from '@testing-library/react'
import React from 'react'
import XpProgressBar from './XpProgressBar'

describe('XpProgressBar', () => {
  it('renders correctly', () => {
    render(<XpProgressBar maxXp={100} currentXp={50} />)
    expect(screen).toMatchSnapshot('XpProgressBar')
  })

  it('displays correct XP values', () => {
    render(<XpProgressBar maxXp={100} currentXp={50} />)
    expect(screen.getByText('XP 50/100')).toBeInTheDocument()
  })
})
