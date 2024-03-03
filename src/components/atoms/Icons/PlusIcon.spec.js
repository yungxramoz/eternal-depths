import { render, screen } from '@testing-library/react'
import React from 'react'
import PlusIcon from './PlusIcon'

describe('PlusIcon', () => {
  it('renders correctly', () => {
    render(<PlusIcon />)
    expect(screen).toMatchSnapshot('PlusIcon')
  })
})
