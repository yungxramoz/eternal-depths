import React from 'react'
import RpgButton from './RpgButton'
import { render, screen } from '@testing-library/react'

describe('RpgButton', () => {
  it('renders correctly', () => {
    render(<RpgButton />)
    expect(screen).toMatchSnapshot('RpgButton')
  })
  it('has correct text', () => {
    render(<RpgButton text="Test" onClick={() => {}} />)
    const button = screen.getByRole('button')
    expect(button.textContent).toBe('Test')
  })

  it('calls onClick when clicked', () => {
    const mockOnClick = jest.fn()
    render(<RpgButton text="Test" onClick={mockOnClick} />)
    const button = screen.getByRole('button')
    button.click()
    expect(mockOnClick).toHaveBeenCalled()
  })

  it('has golden class when golden prop is true', () => {
    render(<RpgButton text="Test" onClick={() => {}} golden />)
    const button = screen.getByRole('button')
    expect(button.classList).toContain('golden')
  })
})
