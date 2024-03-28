import React from 'react'
import { render } from '@testing-library/react'
import Modal from './Modal'

describe('Modal', () => {
  it('renders correctly', () => {
    render(
      <Modal
        title="Test Title"
        content={<div>Test Content</div>}
        footerContent={<div>Test Footer</div>}
      />,
    )
    expect(document.body).toMatchSnapshot('Modal')
  })
})
