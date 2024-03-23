import { render } from '@testing-library/react'
import React from 'react'
import ModalFooter from './ModalFooter'

describe('ModalFooter', () => {
  it('renders correctly', () => {
    render(<ModalFooter>Test Content</ModalFooter>)
    expect(document.body).toMatchSnapshot('ModalFooter')
  })
})
