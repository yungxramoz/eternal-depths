import { render, screen } from '@testing-library/react'
import React from 'react'
import ChevronLeftIcon from './ChevronLeftIcon'

describe('ChevronLeftIcon', () => {
  it('renders correctly', () => {
    render(<ChevronLeftIcon />)
    expect(screen).toMatchSnapshot('ChevronLeftIcon')
  })
})
