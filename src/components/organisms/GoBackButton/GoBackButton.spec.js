import React from 'react'
import TestRenderer from 'react-test-renderer'
import { useNavigate } from 'react-router-dom'
import GoBackButton from './GoBackButton'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

describe('GoBackButton', () => {
  it('renders correctly according to snapshot', () => {
    const testRenderer = TestRenderer.create(<GoBackButton />)
    expect(testRenderer.toJSON()).toMatchSnapshot()
  })

  it('calls navigate with -1 when clicked', () => {
    const navigate = jest.fn()
    useNavigate.mockReturnValue(navigate)

    const testRenderer = TestRenderer.create(<GoBackButton />)
    const testInstance = testRenderer.root

    const button = testInstance.findByType('button')
    button.props.onClick()

    expect(navigate).toHaveBeenCalledWith(-1)
  })
})