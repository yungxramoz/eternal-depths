import { render, screen } from '@testing-library/react'
import React from 'react'
import ArrowLeftIcon from './ArrowLeftIcon'

describe('ArrowLeftIcon', () => {
  it('renders correctly', () => {
    render(<ArrowLeftIcon />)
    expect(screen).toMatchSnapshot('ArrowLeftIcon')
  })
})
