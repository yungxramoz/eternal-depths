import { render } from '@testing-library/react'
import React from 'react'
import ModalHeader from './ModalHeader'

describe('ModalHeader', () => {
  it('renders correctly', () => {
    render(<ModalHeader />)
    expect(document.body).toMatchSnapshot('ModalBody')
  })
})
