import { render, screen } from '@testing-library/react'
import React from 'react'
import GoldenButton from './GoldenButton'

describe('GoldenButton', () => {
  it('renders correctly', () => {
    render(
      <GoldenButton className="mock-class">
        <span>Test</span>
      </GoldenButton>,
    )
    expect(document.body).toMatchSnapshot('GoldenButton')
  })
  it('renders correctly when disabled', () => {
    render(
      <GoldenButton disabled>
        <span>Test</span>
      </GoldenButton>,
    )
    expect(document.body).toMatchSnapshot('GoldenButton disabled')
  })
  it('triggers onClick', () => {
    const onClick = jest.fn()
    render(
      <GoldenButton onClick={onClick}>
        <span>Test</span>
      </GoldenButton>,
    )
    screen.getByText('Test').click()
    expect(onClick).toHaveBeenCalled()
  })
})
