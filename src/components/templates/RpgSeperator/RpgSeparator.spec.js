import { render, screen } from '@testing-library/react'
import React from 'react'
import RpgSeparator from './RpgSeparator'

describe('RpgSeparator', () => {
  it('renders correctly', () => {
    render(<RpgSeparator />)
    expect(screen).toMatchSnapshot('RpgSeparator')
  })

  it('does not apply golden class when golden prop is false', () => {
    render(<RpgSeparator golden />)
    expect(screen).toMatchSnapshot('RpgSeparator not golden')
  })
})
