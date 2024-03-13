import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import AttackButton from './AttackButton'

describe('AttackButton', () => {
  const attack = {
    name: 'Test Attack',
    fileName: 'test_attack.png',
    currentCooldown: 0,
    cooldown: 10,
  }

  it('renders correctly', () => {
    render(<AttackButton attack={attack} />)
    expect(document.body).toMatchSnapshot('AttackButton')
  })

  it('calls onClick prop when clicked', () => {
    const onClick = jest.fn()
    render(<AttackButton attack={attack} onClick={onClick} />)
    fireEvent.click(screen.getByAltText(attack.name))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<AttackButton attack={attack} disabled />)
    expect(document.body).toMatchSnapshot('AttackButton disabled')
  })

  it('shows cooldown container when currentCooldown is not 0', () => {
    render(<AttackButton attack={{ ...attack, currentCooldown: 5 }} />)
    expect(document.body).toMatchSnapshot('AttackButton with cooldown')
  })

  it('hides cooldown container when currentCooldown is 0', () => {
    render(<AttackButton attack={attack} />)
    expect(document.body).toMatchSnapshot('AttackButton no cooldown')
  })
})
