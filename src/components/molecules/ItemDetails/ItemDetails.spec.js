import { render, screen } from '@testing-library/react'
import React from 'react'
import ItemDetails from './ItemDetails'

describe('ItemDetails', () => {
  it('renders correctly', () => {
    render(
      <ItemDetails
        title="test-title"
        subtitle="test-subtitle"
        description="test-description"
        icon="test-icon"
      />,
    )
    expect(document.body).toMatchSnapshot('ItemDetails')
  })

  it('does not render RpgIcon if icon prop is not provided', () => {
    render(
      <ItemDetails
        title="test-title"
        subtitle="test-subtitle"
        description="test-description"
      />,
    )
    expect(screen.queryByTestId('rpg-icon')).toBeNull()
  })
})
