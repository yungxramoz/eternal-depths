import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import RewardButton from './RewardButton'

describe('RewardButton', () => {
  const props = {
    onClick: jest.fn(),
    disabled: false,
    icon: 'test-icon',
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    description: 'Test Description',
  }

  it('renders correctly', () => {
    render(<RewardButton {...props} />)
    expect(document.body).toMatchSnapshot('RewardButton')
  })

  it('renders correctly when disabled', () => {
    render(<RewardButton {...props} disabled />)
    expect(document.body).toMatchSnapshot('RewardButton disabled')
  })

  it('calls onClick prop when clicked', () => {
    render(<RewardButton {...props} />)
    fireEvent.click(screen.getByText(props.title))
    expect(props.onClick).toHaveBeenCalledTimes(1)
  })
})
