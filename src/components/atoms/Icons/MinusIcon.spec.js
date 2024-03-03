import { render, screen } from '@testing-library/react'
import React from 'react'
import MinusIcon from './MinusIcon'

describe('MinusIcon', () => {
  it('renders correctly', () => {
    render(<MinusIcon />)
    expect(screen).toMatchSnapshot('MinusIcon')
  })
})
