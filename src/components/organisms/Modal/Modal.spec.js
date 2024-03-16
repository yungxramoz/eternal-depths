import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import Modal from './Modal'

describe('Modal', () => {
  it('renders correctly', () => {
    render(
      <Modal title="Test Title" onClose={() => {}}>
        <div>Test Content</div>
      </Modal>,
    )
    expect(document.body).toMatchSnapshot('Modal')
  })

  it('calls onClose prop when "Close" button is clicked', () => {
    const onClose = jest.fn()
    render(<Modal title="Test Title" onClose={onClose} />)
    fireEvent.click(screen.getByText('Close'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not render "Close" button when dismissable prop is false', () => {
    render(<Modal title="Test Title" onClose={() => {}} dismissable={false} />)
    expect(screen.queryByText('Close')).not.toBeInTheDocument()
  })
})
