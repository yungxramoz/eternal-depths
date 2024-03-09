import { render, screen } from '@testing-library/react'
import React from 'react'
import HpProgressBar from './HpProgressBar'

describe('HpProgressBar', () => {
  it('renders correctly', () => {
    render(<HpProgressBar maxHp={100} currentHp={100} />)
    expect(document.body).toMatchSnapshot('HpProgressBar')
  })

  it('displays correct HP values', () => {
    render(<HpProgressBar maxHp={100} currentHp={50} />)
    expect(screen.getByText('HP 50/100')).toBeInTheDocument()
  })
})
