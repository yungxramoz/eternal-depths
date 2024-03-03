import { render, screen } from '@testing-library/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import GoBackButton from './GoBackButton'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

describe('GoBackButton', () => {
  it('renders correctly according to snapshot', () => {
    render(<GoBackButton />)
    expect(screen).toMatchSnapshot('GoBackButton')
  })

  it('calls navigate with -1 when clicked', () => {
    const navigate = jest.fn()
    useNavigate.mockReturnValue(navigate)

    render(<GoBackButton />)
    const button = screen.getByRole('button')
    button.click()
    expect(navigate).toHaveBeenCalledWith(-1)
  })
})
