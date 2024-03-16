import React from 'react'
import { render } from '@testing-library/react'
import ModalBody from './ModalBody'

describe('ModalBody', () => {
  it('renders correctly', () => {
    render(<ModalBody />)
    expect(document.body).toMatchSnapshot('ModalBody')
  })
})
