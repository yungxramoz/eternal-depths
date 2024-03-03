import { render, screen } from '@testing-library/react'
import React from 'react'
import RpgProgressBar from './RpgProgressBar'

describe('RpgProgressBar', () => {
  it('renders correctly', () => {
    render(<RpgProgressBar max={100} current={100} type="hp" />)
    expect(screen).toMatchSnapshot('Progress bar at 100%')
  })

  it('calculates progress correctly', () => {
    render(<RpgProgressBar max={100} current={50} />)
    expect(screen).toMatchSnapshot('Progress bar at 50%')
  })

  it('sets color correctly based on type', () => {
    render(<RpgProgressBar max={100} current={50} type="hp" />)
    expect(screen).toMatchSnapshot('HP progress bar')

    render(<RpgProgressBar max={100} current={50} type="xp" />)
    expect(screen).toMatchSnapshot('XP progress bar')
  })
})
