import { render, screen } from '@testing-library/react'
import React from 'react'
import IconButton from './IconButton'

describe('IconButton', () => {
  it('renders IconButton component', () => {
    render(<IconButton icon="plus" />)
    expect(screen).toMatchSnapshot('IconButton')
  })

  it('renders the correct size class based on the size prop', () => {
    render(<IconButton icon="plus" size="large" />)
    expect(screen).toMatchSnapshot('IconButton Large')
  })

  it('disables the button when the disabled prop is true', () => {
    render(<IconButton icon="plus" disabled />)
    expect(screen).toMatchSnapshot('IconButton Disabled')
  })
})
