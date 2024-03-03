import { render, screen } from '@testing-library/react'
import React from 'react'
import ChevronRightIcon from './ChevronRightIcon'

describe('ChevronRightIcon', () => {
  it('renders correctly', () => {
    render(<ChevronRightIcon />)
    expect(screen).toMatchSnapshot('ChevronRightIcon')
  })
})
