import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import ModalFooter from './ModalFooter'

describe('ModalFooter', () => {
  it('renders correctly', () => {
    render(<ModalFooter onClose={() => {}} />)
    expect(screen.getByText('Close')).toBeInTheDocument()
  })

  it('calls onClose prop when "Close" button is clicked', () => {
    const onClose = jest.fn()
    render(<ModalFooter onClose={onClose} />)
    fireEvent.click(screen.getByText('Close'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not render "Close" button when dismissable prop is false', () => {
    render(<ModalFooter onClose={() => {}} dismissable={false} />)
    expect(screen.queryByText('Close')).not.toBeInTheDocument()
  })
})
