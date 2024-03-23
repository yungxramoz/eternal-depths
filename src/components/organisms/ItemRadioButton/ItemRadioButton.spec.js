import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import ItemRadioButton from './ItemRadioButton'

describe('ItemRadioButton', () => {
  it('renders correctly', () => {
    render(
      <ItemRadioButton
        onChange={() => {}}
        disabled={false}
        icon="test-icon"
        title="test-title"
        subtitle="test-subtitle"
        description="test-description"
        id="test-id"
        checked={false}
      />,
    )
    expect(document.body).toMatchSnapshot('ItemRadioButton')
  })

  it('calls onChange prop when clicked', () => {
    const onChange = jest.fn()
    render(
      <ItemRadioButton
        onChange={onChange}
        disabled={false}
        icon="test-icon"
        title="test-title"
        subtitle="test-subtitle"
        description="test-description"
        id="test-id"
        checked={false}
      />,
    )
    fireEvent.click(screen.getByRole('radio'))
    expect(onChange).toHaveBeenCalled()
  })
})
